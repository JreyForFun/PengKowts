import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, Heart } from 'lucide-react';
import { getSettings, saveSettings } from '../utils/storage';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const settings = getSettings();
    setTheme(settings.theme);
    // Apply theme to document (simple data-theme for now, or just class)
    document.body.className = settings.theme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveSettings({ theme: newTheme });
    document.body.className = newTheme;
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Categories', path: '/categories' },
    { name: 'Authors', path: '/authors' },
    { name: 'My Quotes', path: '/my-quotes' },
    { name: 'About', path: '/about' },
  ];

  return (
    <div className="layout">
      <nav className="navbar" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        backgroundColor: 'var(--color-white)',
        boxShadow: 'var(--shadow-soft)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        transition: 'var(--transition-smooth)'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}>
          {/* Logo */}
          <Link to="/" style={{
            fontSize: '1.5rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            color: 'var(--color-primary)'
          }}>
            PengKowts
          </Link>

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{ display: 'none', gap: '30px', alignItems: 'center' }}>
            {navLinks.map(link => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                style={({ isActive }) => ({
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-main)',
                  fontWeight: isActive ? 600 : 400,
                  position: 'relative'
                })}
              >
                {link.name}
              </NavLink>
            ))}
            <button onClick={toggleTheme} style={{ color: 'var(--color-text-main)' }}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="mobile-toggle" style={{ display: 'flex', gap: '15px' }}>
            <button onClick={toggleTheme} style={{ color: 'var(--color-text-main)' }}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ color: 'var(--color-text-main)' }}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Dropdown */}
      {isMenuOpen && (
        <div className="mobile-menu" style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          backgroundColor: 'var(--color-white)',
          padding: '20px',
          boxShadow: 'var(--shadow-soft)',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}>
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              style={({ isActive }) => ({
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-main)',
                fontSize: '1.1rem',
                fontWeight: isActive ? 600 : 400
              })}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}

      {/* Main Content */}
      <main style={{ marginTop: '70px', minHeight: 'calc(100vh - 140px)' }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'var(--color-bg)',
        padding: '30px 20px',
        textAlign: 'center',
        marginTop: '60px',
        borderTop: '1px solid var(--color-secondary)'
      }}>
        <div className="container">
          <p style={{ color: 'var(--color-text-light)', marginBottom: '10px' }}>
            Crafted for inspiration.
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
            &copy; 2025 PengKowts. Open Source. Jrey - InnovaREV.
          </p>
        </div>
      </footer>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
          .mobile-menu { display: none !important; }
        }
        /* Simple dark mode overrides */
        body.dark {
          --color-bg: #1A1A1A;
          --color-white: #2D2D2D;
          --color-text-main: #F0F0F0;
          --color-text-light: #AAAAAA;
        }
      `}</style>
    </div>
  );
};

export default Layout;
