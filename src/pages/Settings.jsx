import React, { useState, useEffect } from 'react';
import { RefreshCw, Trash, Moon, Sun, Download, Upload } from 'lucide-react';
import { getSettings, saveSettings } from '../utils/storage';
import { useToast } from '../utils/toast';

const Settings = () => {
  const { addToast } = useToast();
  const [settings, setSettingsData] = useState({ theme: 'light', animations: true });

  useEffect(() => {
    setSettingsData(getSettings());
  }, []);

  const handleToggleTheme = () => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    const updated = saveSettings({ theme: newTheme });
    setSettingsData(updated);
    document.body.className = newTheme;
  };

  const handleReset = () => {
    if (window.confirm("CAUTION: This will delete ALL your saved quotes, likes, and added quotes. This cannot be undone. Are you sure?")) {
      localStorage.clear();
      addToast("All data reset. Reloading...", "info");
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Settings</h1>

      <div className="card" style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', borderBottom: '1px solid var(--color-bg)', paddingBottom: '10px' }}>Params</h2>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem' }}>Appearance</h3>
            <p style={{ color: 'var(--color-text-light)' }}>Switch between Light and Dark themes</p>
          </div>
          <button
            onClick={handleToggleTheme}
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {settings.theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            {settings.theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
      </div>

      <div className="card" style={{ borderColor: '#ff6b6b' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#e03131', borderBottom: '1px solid var(--color-bg)', paddingBottom: '10px' }}>Danger Zone</h2>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem' }}>Reset Application</h3>
            <p style={{ color: 'var(--color-text-light)' }}>Clear all local data and return to initial state.</p>
          </div>
          <button
            onClick={handleReset}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1px solid #ff6b6b',
              color: '#ff6b6b',
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
            onMouseOver={e => {
              e.currentTarget.style.backgroundColor = '#ff6b6b';
              e.currentTarget.style.color = 'white';
            }}
            onMouseOut={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#ff6b6b';
            }}
          >
            <Trash size={18} /> Reset All Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
