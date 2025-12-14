import React, { createContext, useContext, useState, useCallback } from 'react';
import { X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              background: 'var(--color-bg)',
              color: 'var(--color-text-main)',
              padding: '12px 20px',
              borderRadius: '8px',
              boxShadow: 'var(--shadow-hover)',
              borderLeft: `4px solid ${toast.type === 'error' ? '#ff6b6b' : 'var(--color-primary)'}`,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              minWidth: '250px',
              animation: 'slideIn 0.3s ease'
            }}
          >
            <span style={{ flex: 1 }}>{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} style={{ color: 'var(--color-text-light)' }}>
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Add CSS animation for toast manually or use separate CSS
// We can assume slideIn keyframe is globally useful, let's keep it simple here or add to index.css
