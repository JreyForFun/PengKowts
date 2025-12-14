import React from 'react';
import { Link, useParams } from 'react-router-dom';
import QuoteCard from '../components/QuoteCard';
import { getAllQuotes } from '../utils/storage';
import { categories as categoriesList } from '../data/categories';

const CategoryView = () => {
  const { categoryId } = useParams(); // actually name

  if (!categoryId) {
    // Show Category List
    return (
      <div className="container" style={{ padding: '60px 20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2.5rem' }}>Browse Categories</h1>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '24px'
        }}>
          {categoriesList.map(cat => {
            const Icon = cat.icon;
            return (
              <Link key={cat.name} to={`/categories/${cat.name}`} style={{ textDecoration: 'none' }}>
                <div className="card" style={{
                  textAlign: 'center',
                  padding: '30px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'var(--transition-smooth)'
                }}>
                  <div style={{ color: 'var(--color-primary)' }}>
                    <Icon size={48} strokeWidth={1.5} />
                  </div>
                  <h3 style={{ margin: 0 }}>{cat.name}</h3>
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>{cat.desc}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  // Show Specific Category
  const allQuotes = getAllQuotes();
  const filtered = allQuotes.filter(q => q.category === categoryId);
  const catInfo = categoriesList.find(c => c.name === categoryId) || { name: categoryId, icon: null, desc: 'Collection' };
  const HeaderIcon = catInfo.icon || (() => null);

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span style={{ display: 'inline-block', marginBottom: '15px', color: 'var(--color-primary)' }}>
          <HeaderIcon size={64} strokeWidth={1} />
        </span>
        <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>{catInfo.name}</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)' }}>{catInfo.desc}</p>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--color-text-light)', marginTop: '40px' }}>
          No quotes found in this category yet.
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {filtered.map(quote => (
            <div key={quote.id} style={{ height: '300px' }}>
              <QuoteCard quote={quote} />
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Link to="/categories" className="btn-primary" style={{ display: 'inline-block' }}>
          View All Categories
        </Link>
      </div>
    </div>
  );
};

export default CategoryView;
