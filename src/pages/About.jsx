import React from 'react';
import { Heart, Github, Feather, BookOpen, Sun } from 'lucide-react';
import FlatStar from '../components/FlatStar';

const About = () => {
  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: '800px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px', fontFamily: 'var(--font-display)' }}>About PengKowts</h1>

      <div style={{ fontSize: '1.2rem', color: 'var(--color-text-light)', marginBottom: '40px', lineHeight: '1.8' }}>
        <p style={{ marginBottom: '20px' }}>
          PengKowts is a digital sanctuary designed for contemplation and growth.
          We believe in the power of words to heal, inspire, and motivate.
        </p>
        <p>
          In a world of infinite noise, we offer a quiet space to reconnect with timeless wisdom.
          Whether you seek comfort, motivation, or a new perspective, you'll find it here.
        </p>
      </div>

      <div className="card" style={{ padding: '40px', display: 'inline-block', textAlign: 'left', width: '100%' }}>
        <h3 style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', justifyContent: 'center' }}>
          <FlatStar size={32} />
          The Values We Cherish
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
            <Feather size={24} color="var(--color-primary)" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>Timeless Wisdom</h4>
              <p style={{ color: 'var(--color-text-light)', fontSize: '0.95rem' }}>Curated thoughts from history's greatest minds and modern visionaries.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
            <Sun size={24} color="var(--color-primary)" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>Daily Inspiration</h4>
              <p style={{ color: 'var(--color-text-light)', fontSize: '0.95rem' }}>A fresh spark of insight to ignite your morning or calm your evening.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
            <BookOpen size={24} color="var(--color-primary)" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>Mindful Reading</h4>
              <p style={{ color: 'var(--color-text-light)', fontSize: '0.95rem' }}>A beautiful, distraction-free experience designed for deep reading.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
            <Heart size={24} color="var(--color-primary)" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>Personal Growth</h4>
              <p style={{ color: 'var(--color-text-light)', fontSize: '0.95rem' }}>Tools to save what resonates and build your own library of truth.</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '60px' }}>
        <p style={{ marginBottom: '20px', fontWeight: 600 }}>Contribute or Star the project</p>
        <a
          href="https://github.com/JreyForFun/PengKowts"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
        >
          <Github size={20} /> View on GitHub
        </a>
      </div>
    </div>
  );
};

export default About;
