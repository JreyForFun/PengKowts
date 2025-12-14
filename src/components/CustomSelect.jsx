import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const CustomSelect = ({ options, value, onChange, placeholder = "Select...", label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Handle both array of strings and array of objects {label, value}
  const getLabel = (opt) => typeof opt === 'object' ? opt.label : opt;
  const getValue = (opt) => typeof opt === 'object' ? opt.value : opt;

  const selectedLabel = options.find(opt => getValue(opt) === value)
    ? getLabel(options.find(opt => getValue(opt) === value))
    : placeholder;

  return (
    <div className="custom-select" ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>
      {label && (
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontWeight: 600,
          fontSize: '0.9rem',
          color: 'var(--color-text-light)'
        }}>
          {label}
        </label>
      )}

      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '12px',
          border: isOpen ? '1px solid var(--color-primary)' : '1px solid var(--color-secondary)',
          backgroundColor: 'var(--color-white)',
          color: 'var(--color-text-main)',
          fontFamily: 'inherit',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.2s ease',
          boxShadow: isOpen ? '0 0 0 3px rgba(137, 207, 240, 0.2)' : 'none'
        }}
      >
        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {selectedLabel}
        </span>
        <ChevronDown
          size={18}
          color="var(--color-text-light)"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }}
        />
      </div>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          left: 0,
          right: 0,
          backgroundColor: 'var(--color-white)',
          borderRadius: '12px',
          boxShadow: 'var(--shadow-hover)',
          border: '1px solid var(--color-secondary)',
          zIndex: 1000,
          maxHeight: '250px',
          overflowY: 'auto',
          animation: 'fadeIn 0.2s ease'
        }}>
          {options.map((opt) => {
            const optVal = getValue(opt);
            const optLabel = getLabel(opt);
            const isSelected = optVal === value;

            return (
              <div
                key={optVal}
                onClick={() => handleSelect(optVal)}
                style={{
                  padding: '10px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: isSelected ? 'var(--color-bg)' : 'transparent',
                  color: isSelected ? 'var(--color-primary)' : 'var(--color-text-main)',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = '#f0f7ff';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {optLabel}
                {isSelected && <Check size={16} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
