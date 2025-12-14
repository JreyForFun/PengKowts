import React, { useState, useEffect } from 'react';
import { Download, Upload, Trash2, BookOpen, PenTool } from 'lucide-react';
import QuoteCard from '../components/QuoteCard';
import AddQuoteModal from '../components/AddQuoteModal';
import {
  getSavedQuotes,
  getAllQuotes,
  exportData,
  importData,
  deleteUserQuote
} from '../utils/storage';
import { useToast } from '../utils/toast';

const MyQuotes = () => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('saved'); // 'saved' | 'added'
  const [savedQuotesList, setSavedQuotesList] = useState([]);
  const [userQuotesList, setUserQuotesList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Refresh data helper
  const loadData = () => {
    const all = getAllQuotes();
    const savedIds = getSavedQuotes();

    // Filter full objects
    const saved = all.filter(q => savedIds.includes(q.id));
    const added = all.filter(q => q.dateAdded); // Logic: user quotes have dateAdded timestamp

    setSavedQuotesList(saved);
    setUserQuotesList(added);
  };

  useEffect(() => {
    loadData();
    // Helper to listen to storage changes if other tabs update it?
    // For simplicity, we just load on mount. Real app might use context or storage event listener.
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, [activeTab]); // Reload when tab switches too, just in case

  const handleExport = () => {
    const dataStr = exportData();
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pengkowts_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast("Library exported successfully", "success");
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const success = importData(event.target.result);
      if (success) {
        addToast("Library imported successfully", "success");
        loadData();
      } else {
        addToast("Failed to import data. Invalid format.", "error");
      }
    };
    reader.readAsText(file);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this quote?")) {
      deleteUserQuote(id);
      loadData();
      addToast("Quote deleted", "success");
    }
  };

  const quotesToShow = activeTab === 'saved' ? savedQuotesList : userQuotesList;

  return (
    <div className="container" style={{ padding: '40px 20px' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>My Library</h1>
          <p style={{ color: 'var(--color-text-light)' }}>Manage your personal collection.</p>
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <button
            onClick={handleExport}
            className="btn-primary"
            style={{ display: 'flex', gap: '8px', alignItems: 'center', backgroundColor: 'var(--color-secondary)', color: 'var(--color-text-main)' }}
          >
            <Download size={18} /> Export
          </button>

          <label
            className="btn-primary"
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              backgroundColor: 'var(--color-white)',
              color: 'var(--color-text-main)',
              border: '1px solid var(--color-secondary)',
              cursor: 'pointer'
            }}
          >
            <Upload size={18} /> Import
            <input type="file" onChange={handleImport} accept=".json" style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--color-secondary)',
        marginBottom: '30px'
      }}>
        <button
          onClick={() => setActiveTab('saved')}
          style={{
            padding: '15px 30px',
            fontSize: '1.1rem',
            fontWeight: 600,
            borderBottom: activeTab === 'saved' ? '3px solid var(--color-primary)' : '3px solid transparent',
            color: activeTab === 'saved' ? 'var(--color-primary)' : 'var(--color-text-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s'
          }}
        >
          <BookOpen size={20} /> Saved Quotes ({savedQuotesList.length})
        </button>
        <button
          onClick={() => setActiveTab('added')}
          style={{
            padding: '15px 30px',
            fontSize: '1.1rem',
            fontWeight: 600,
            borderBottom: activeTab === 'added' ? '3px solid var(--color-primary)' : '3px solid transparent',
            color: activeTab === 'added' ? 'var(--color-primary)' : 'var(--color-text-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s'
          }}
        >
          <PenTool size={20} /> My Creations ({userQuotesList.length})
        </button>
      </div>

      {/* Content */}
      {quotesToShow.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: 'rgba(255,255,255,0.5)',
          borderRadius: '16px',
          border: '1px dashed var(--color-secondary)'
        }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)', marginBottom: '20px' }}>
            {activeTab === 'saved'
              ? "You haven't saved any quotes yet."
              : "You haven't added any personal quotes yet."}
          </p>
          {activeTab === 'added' && (
            <button onClick={() => setIsModalOpen(true)} className="btn-primary">
              Create One Now
            </button>
          )}
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {quotesToShow.map(quote => (
            <div key={quote.id} style={{ position: 'relative' }}>
              <div style={{ height: '300px' }}>
                <QuoteCard quote={quote} />
              </div>

              {/* Delete button only for user added quotes in Added tab */}
              {activeTab === 'added' && (
                <button
                  onClick={() => handleDelete(quote.id)}
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    backgroundColor: '#ff6b6b',
                    color: 'white',
                    padding: '8px',
                    borderRadius: '50%',
                    boxShadow: 'var(--shadow-soft)',
                    zIndex: 10
                  }}
                  title="Delete Quote"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <AddQuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onQuoteAdded={loadData}
      />
    </div>
  );
};

export default MyQuotes;
