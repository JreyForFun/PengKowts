import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { ToastProvider } from './utils/toast';
import ScrollToTop from './components/ScrollToTop'; // We'll make this tiny helper

// Pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import MyQuotes from './pages/MyQuotes';
import CategoryView from './pages/CategoryPage';
import Settings from './pages/Settings';
import AuthorPage from './pages/AuthorPage';
import About from './pages/About';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ToastProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/my-quotes" element={<MyQuotes />} />
            <Route path="/categories" element={<CategoryView />} />
            <Route path="/categories/:categoryId" element={<CategoryView />} />
            <Route path="/authors" element={<AuthorPage />} />
            <Route path="/authors/:authorName" element={<AuthorPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </ToastProvider>
    </Router>
  );
}

export default App;
