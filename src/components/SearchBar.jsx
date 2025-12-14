import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = "Search quotes..." }) => {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      marginBottom: '24px'
    }}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '16px 20px 16px 50px',
          borderRadius: '50px',
          border: 'none',
          backgroundColor: 'var(--color-white)',
          boxShadow: 'var(--shadow-soft)',
          fontSize: '1rem',
          color: 'var(--color-text-main)',
          outline: 'none',
          transition: 'box-shadow 0.3s ease'
        }}
        onFocus={(e) => e.target.style.boxShadow = 'var(--shadow-hover)'}
        onBlur={(e) => e.target.style.boxShadow = 'var(--shadow-soft)'}
      />
      <Search
        size={22}
        color="var(--color-text-light)"
        style={{
          position: 'absolute',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)'
        }}
      />
    </div>
  );
};

export default SearchBar;
