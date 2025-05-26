import { useState, useEffect } from 'react';

export function useBookmarks() {
  const [bookmarkedItems, setBookmarkedItems] = useState(() => {
    const saved = localStorage.getItem('bookmarkedItems');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookmarkedItems', JSON.stringify(bookmarkedItems));
  }, [bookmarkedItems]);

  const toggleBookmark = (item) => {
    setBookmarkedItems(prev => {
      const isBookmarked = prev.some(bookmarked => bookmarked.id === item.id);
      if (isBookmarked) {
        return prev.filter(bookmarked => bookmarked.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const isBookmarked = (itemId) => {
    return bookmarkedItems.some(item => item.id === itemId);
  };

  return { bookmarkedItems, toggleBookmark, isBookmarked };
}