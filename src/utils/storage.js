import initialQuotes from '../data/quotes.json';

const KEYS = {
  LIKED: 'pengkowts_liked',
  SAVED: 'pengkowts_saved',
  USER_QUOTES: 'pengkowts_user_quotes',
  SETTINGS: 'pengkowts_settings',
  QOTD: 'pengkowts_qotd'
};

// Helper: Safely parse JSON
const safeParse = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error parsing ${key}:`, e);
    return fallback;
  }
};

// --- Quotes Management ---

export const getAllQuotes = () => {
  const userQuotes = safeParse(KEYS.USER_QUOTES, []);
  // Combine initial static quotes with user-added quotes
  // Ensure no ID collisions - user quotes should ideally have unique IDs (e.g. timestamps)
  return [...initialQuotes, ...userQuotes];
};

export const addUserQuote = (quote) => {
  const userQuotes = safeParse(KEYS.USER_QUOTES, []);
  const newQuote = {
    ...quote,
    id: Date.now(), // Simple unique ID
    dateAdded: new Date().toISOString()
  };
  const updated = [...userQuotes, newQuote];
  localStorage.setItem(KEYS.USER_QUOTES, JSON.stringify(updated));
  return newQuote;
};

export const deleteUserQuote = (id) => {
  const userQuotes = safeParse(KEYS.USER_QUOTES, []);
  if (!userQuotes.find(q => q.id === id)) return false; // Cannot delete initial quotes
  const updated = userQuotes.filter(q => q.id !== id);
  localStorage.setItem(KEYS.USER_QUOTES, JSON.stringify(updated));
  return true;
};

// --- Interactions (Likes / Saves) ---

export const getLikedQuotes = () => safeParse(KEYS.LIKED, []);
export const getSavedQuotes = () => safeParse(KEYS.SAVED, []);

export const toggleLike = (id) => {
  const liked = getLikedQuotes();
  const isLiked = liked.includes(id);
  const updated = isLiked ? liked.filter(lid => lid !== id) : [...liked, id];
  localStorage.setItem(KEYS.LIKED, JSON.stringify(updated));
  return !isLiked;
};

export const toggleSave = (id) => {
  const saved = getSavedQuotes();
  const isSaved = saved.includes(id);
  const updated = isSaved ? saved.filter(sid => sid !== id) : [...saved, id];
  localStorage.setItem(KEYS.SAVED, JSON.stringify(updated));
  return !isSaved;
};

// --- Settings ---

export const getSettings = () => safeParse(KEYS.SETTINGS, { theme: 'light', animations: true });
export const saveSettings = (newSettings) => {
  const current = getSettings();
  const updated = { ...current, ...newSettings };
  localStorage.setItem(KEYS.SETTINGS, JSON.stringify(updated));
  return updated;
};

// --- Quote of the Day ---

export const getQuoteOfTheDay = () => {
  const today = new Date().toISOString().split('T')[0];
  const stored = safeParse(KEYS.QOTD, null);
  const quotes = getAllQuotes();
  
  if (stored && stored.date === today) {
    const quote = quotes.find(q => q.id === stored.quoteId);
    if (quote) return quote;
  }
  
  // Pick new random
  const randomFunc = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };
  
  let newQ = randomFunc();
  // Ensure it's not the same if possible (not implemented deeply for simplicity)
  
  localStorage.setItem(KEYS.QOTD, JSON.stringify({ date: today, quoteId: newQ.id }));
  return newQ;
};

// --- Data Export/Import ---

export const exportData = () => {
  const data = {
    liked: getLikedQuotes(),
    saved: getSavedQuotes(),
    userQuotes: safeParse(KEYS.USER_QUOTES, []),
    settings: getSettings()
  };
  return JSON.stringify(data, null, 2);
};

export const importData = (jsonString) => {
  try {
    const data = JSON.parse(jsonString);
    if (data.liked) localStorage.setItem(KEYS.LIKED, JSON.stringify(data.liked));
    if (data.saved) localStorage.setItem(KEYS.SAVED, JSON.stringify(data.saved));
    if (data.userQuotes) localStorage.setItem(KEYS.USER_QUOTES, JSON.stringify(data.userQuotes));
    if (data.settings) localStorage.setItem(KEYS.SETTINGS, JSON.stringify(data.settings));
    return true;
  } catch (e) {
    console.error("Import failed", e);
    return false;
  }
};
