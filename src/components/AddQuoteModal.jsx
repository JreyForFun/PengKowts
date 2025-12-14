import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { addUserQuote } from '../utils/storage';
import { useToast } from '../utils/toast';
import { categories } from '../data/categories';
import CustomSelect from './CustomSelect';


const AddQuoteModal = ({ isOpen, onClose, onQuoteAdded }) => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    text: '',
    author: '',
    category: 'Motivation',
    tags: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.text.trim()) {
      addToast("Quote text is required", "error");
      return;
    }

    // Process tags
    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);

    const newQuote = {
      text: formData.text,
      author: formData.author || "Anonymous",
      category: formData.category,
      tags: tagsArray
    };

    addUserQuote(newQuote);
    addToast("Quote added to your collection!", "success");

    // Reset and close
    setFormData({ text: '', author: '', category: 'Motivation', tags: '' });
    if (onQuoteAdded) onQuoteAdded();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(26, 58, 82, 0.5)', // deep navy with opacity
      backdropFilter: 'blur(4px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }} onClick={onClose}>
      <div style={{
        backgroundColor: 'var(--color-bg)',
        borderRadius: '16px',
        width: '90%',
        maxWidth: '500px',
        padding: '30px',
        boxShadow: 'var(--shadow-hover)',
        position: 'relative'
      }} onClick={e => e.stopPropagation()}>

        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            color: 'var(--color-text-light)'
          }}
        >
          <X size={24} />
        </button>

        <h2 style={{ marginBottom: '24px', fontFamily: 'var(--font-display)' }}>Add New Quote</h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Quote Text *</label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleChange}
              maxLength={500}
              placeholder="Enter the wisdom..."
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid var(--color-secondary)',
                fontFamily: 'inherit',
                minHeight: '100px',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="e.g. Oscar Wilde"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid var(--color-secondary)',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            <div>
              <CustomSelect
                label="Category"
                options={categories.map(c => c.name)} // categories are objects, CustomSelect handles values
                value={formData.category}
                onChange={(val) => setFormData({ ...formData, category: val })}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="inspiration, daily, morning..."
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid var(--color-secondary)',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{
              marginTop: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Plus size={20} />
            Add to Library
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuoteModal;
