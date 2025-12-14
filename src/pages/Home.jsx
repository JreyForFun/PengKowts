import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';
import FlatStar from '../components/FlatStar';
import QuoteCard from '../components/QuoteCard';
import AddQuoteModal from '../components/AddQuoteModal';
import { getQuoteOfTheDay } from '../utils/storage';

import { getCategoryIcon } from '../data/categories';

// Featured categories for the home page (Just names, getting icons dynamically)
const featuredCategories = [
  { name: 'Motivation', desc: 'Fuel your ambition' },
  { name: 'Love', desc: 'Matters of the heart' },
  { name: 'Wisdom', desc: 'Timeless knowledge' },
  { name: 'Positivity', desc: 'Brighten your day' }
];

const Home = () => {
  const [qotd, setQotd] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load Quote of the Day
    const quote = getQuoteOfTheDay();
    setQotd(quote);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section style={{
        padding: '80px 20px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, var(--color-bg) 0%, rgba(137, 207, 240, 0.1) 100%)',
      }}>
        <div className="container">
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            marginBottom: '20px',
            color: 'var(--color-primary)'
          }}>
            <span style={{ color: 'var(--color-text-main)' }}>Find peace in </span>
            PengKowts
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--color-text-light)',
            marginBottom: '40px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Your personal sanctuary for wisdom and inspiration. <br />
            A curated journey through the greatest thoughts of all time.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <Link to="/explore" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Explore Quotes <ArrowRight size={18} />
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                padding: '10px 24px',
                borderRadius: '50px',
                fontWeight: 600,
                border: '2px solid var(--color-primary)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-primary)';
              }}
            >
              <Plus size={18} /> Add Your Own
            </button>
          </div>
        </div>
      </section>

      {/* Quote of the Day */}
      {qotd && (
        <section style={{ padding: '60px 20px' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
              <FlatStar size={36} />
              <h2 style={{ fontSize: '1.8rem' }}>Quote of the Day</h2>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <QuoteCard quote={qotd} />
            </div>
          </div>
        </section>
      )}

      {/* Featured Categories */}
      <section style={{ padding: '60px 20px', backgroundColor: 'rgba(255,255,255,0.5)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2rem' }}>Curated Collections</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px'
          }}>
            {featuredCategories.map(cat => {
              const Icon = getCategoryIcon(cat.name);
              return (
                <Link to={`/categories/${cat.name}`} key={cat.name} style={{ display: 'block' }}>
                  <div className="card" style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '15px'
                  }}>
                    <div style={{ color: 'var(--color-primary)' }}>
                      <Icon size={48} strokeWidth={1.5} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem' }}>{cat.name}</h3>
                    <p style={{ color: 'var(--color-text-light)' }}>{cat.desc}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <AddQuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Home;
