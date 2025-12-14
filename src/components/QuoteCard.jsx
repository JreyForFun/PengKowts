import React, { useState, useEffect } from 'react';
import { Heart, Bookmark, Copy, Share2, Quote } from 'lucide-react';
import { toggleLike, toggleSave, getLikedQuotes, getSavedQuotes } from '../utils/storage';
import { useToast } from '../utils/toast';

const QuoteCard = ({ quote }) => {
  const { addToast } = useToast();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Check initial state
    const likedIds = getLikedQuotes();
    const savedIds = getSavedQuotes();
    setLiked(likedIds.includes(quote.id));
    setSaved(savedIds.includes(quote.id));
  }, [quote.id]);

  const handleLike = () => {
    const newState = toggleLike(quote.id);
    setLiked(newState);
    // Optional: add visual feedback or no toast to avoid spam
  };

  const handleSave = () => {
    const newState = toggleSave(quote.id);
    setSaved(newState);
    addToast(newState ? "Quote saved to personal library" : "Quote removed from library", "success");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
    addToast("Quote copied to clipboard!", "success");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'PengKowts',
          text: `"${quote.text}" - ${quote.author}`,
          url: window.location.href
        });
      } catch (err) {
        console.error('Share failed', err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="card" style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    }}>
      <Quote
        size={40}
        color="var(--color-secondary)"
        fill="var(--color-secondary)"
        style={{ opacity: 0.3, marginBottom: '10px' }}
      />

      <div style={{ flex: 1, marginBottom: '20px' }}>
        <p style={{
          fontSize: '1.25rem',
          fontFamily: 'var(--font-display)',
          color: 'var(--color-text-main)',
          marginBottom: '15px',
          lineHeight: '1.4'
        }}>
          "{quote.text}"
        </p>
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--color-text-light)',
          fontStyle: 'italic',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          — {quote.author || "Unknown"}
        </p>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto',
        borderTop: '1px solid var(--color-bg)',
        paddingTop: '15px'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{
            fontSize: '0.75rem',
            padding: '4px 10px',
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-text-main)',
            borderRadius: '12px',
            opacity: 0.7
          }}>
            {quote.category}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={handleLike} title="Like">
            <Heart
              size={20}
              color="var(--color-accent)"
              fill={liked ? "var(--color-accent)" : "none"}
            />
          </button>
          <button onClick={handleSave} title="Save">
            <Bookmark
              size={20}
              color="var(--color-primary)"
              fill={saved ? "var(--color-primary)" : "none"}
            />
          </button>
          <button onClick={handleCopy} title="Copy">
            <Copy size={20} color="var(--color-text-light)" />
          </button>
          <button onClick={handleShare} title="Share">
            <Share2 size={20} color="var(--color-text-light)" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
