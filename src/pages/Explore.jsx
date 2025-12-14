import React, { useState, useEffect, useMemo } from 'react';
import QuoteCard from '../components/QuoteCard';
import FilterSidebar from '../components/FilterSidebar';
import SearchBar from '../components/SearchBar';
import { getAllQuotes, getLikedQuotes } from '../utils/storage';

const Explore = () => {
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('recent'); // recent, liked, random

  const [displayedCount, setDisplayedCount] = useState(12);

  useEffect(() => {
    // Load all quotes on mount
    const all = getAllQuotes();
    // Simulate randomness for initial "random" but strictly we load all first
    setQuotes(all);
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = [...quotes];

    // 1. Search
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(q =>
        q.text.toLowerCase().includes(lower) ||
        q.author.toLowerCase().includes(lower)
      );
    }

    // 2. Category
    if (category) {
      result = result.filter(q => q.category === category);
    }

    // 3. Sort
    if (sortBy === 'liked') {
      const likedIds = getLikedQuotes();
      result.sort((a, b) => {
        const aLiked = likedIds.includes(a.id) ? 1 : 0;
        const bLiked = likedIds.includes(b.id) ? 1 : 0;
        return bLiked - aLiked; // Liked first
      });
    } else if (sortBy === 'recent') {
      // Assuming higher ID = more recent (for user quotes) or original order (preserved)
      // For proper recent, we need dates, but IDs work for simple proxy
      result.sort((a, b) => b.id - a.id);
    } else if (sortBy === 'random') {
      // Fisher-Yates shuffle for true random feel
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }
    }

    setFilteredQuotes(result);
    setDisplayedCount(12); // Reset pagination on filter change
  }, [quotes, searchTerm, category, sortBy]);

  const loadMore = () => {
    setDisplayedCount(prev => prev + 12);
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Explore Collection</h1>
        <p style={{ color: 'var(--color-text-light)' }}>Discover wisdom from our extensive library.</p>
      </div>

      <div className="explore-layout" style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '30px'
      }}>
        {/* Mobile: Sidebar on top or collapsible (custom css handle) */}

        {/* Desktop: Grid layout */}
        <style>{`
          @media (min-width: 900px) {
            .explore-layout {
              grid-template-columns: 250px 1fr !important;
            }
          }
        `}</style>

        <aside>
          <FilterSidebar
            currentCategory={category}
            onCategoryChange={setCategory}
            currentSort={sortBy}
            onSortChange={setSortBy}
          />
        </aside>

        <main>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />

          {filteredQuotes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px', color: 'var(--color-text-light)' }}>
              No quotes found matching your criteria.
            </div>
          ) : (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '24px',
                marginBottom: '40px'
              }}>
                {filteredQuotes.slice(0, displayedCount).map(quote => (
                  <div key={quote.id} style={{ height: '300px' }}> {/* Fixed height for consistency */}
                    <QuoteCard quote={quote} />
                  </div>
                ))}
              </div>

              {displayedCount < filteredQuotes.length && (
                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={loadMore}
                    className="btn-primary"
                    style={{ minWidth: '200px' }}
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Explore;
