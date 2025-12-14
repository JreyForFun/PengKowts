import React from 'react';
import { Link, useParams } from 'react-router-dom';
import QuoteCard from '../components/QuoteCard';
import { getAllQuotes } from '../utils/storage';
import { User, Users } from 'lucide-react';

const AuthorPage = () => {
  const { authorName } = useParams();
  const allQuotes = getAllQuotes();

  if (!authorName) {
    // 1. Get unique authors and their counts
    const authorStats = allQuotes.reduce((acc, quote) => {
      const name = quote.author || "Unknown";
      if (!acc[name]) {
        acc[name] = 0;
      }
      acc[name]++;
      return acc;
    }, {});

    const sortedAuthors = Object.entries(authorStats).sort((a, b) => b[1] - a[1]); // Sort by count

    return (
      <div className="container" style={{ padding: '60px 20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2.5rem' }}>Authors</h1>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '24px'
        }}>
          {sortedAuthors.map(([name, count]) => (
            <Link key={name} to={`/authors/${encodeURIComponent(name)}`} style={{ textDecoration: 'none' }}>
              <div className="card" style={{
                textAlign: 'center',
                padding: '30px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '15px',
                transition: 'var(--transition-smooth)'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-text-main)'
                }}>
                  <User size={30} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{name}</h3>
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                    {count} {count === 1 ? 'Quote' : 'Quotes'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Show Specific Author
  const decodedName = decodeURIComponent(authorName);
  const filtered = allQuotes.filter(q => (q.author || "Unknown") === decodedName);

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-text-main)',
          margin: '0 auto 20px'
        }}>
          <Users size={40} />
        </div>
        <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>{decodedName}</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)' }}>
          Collection of {filtered.length} quotes
        </p>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--color-text-light)', marginTop: '40px' }}>
          No quotes found for this author.
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
        <Link to="/authors" className="btn-primary" style={{ display: 'inline-block' }}>
          View All Authors
        </Link>
      </div>
    </div>
  );
};

export default AuthorPage;
