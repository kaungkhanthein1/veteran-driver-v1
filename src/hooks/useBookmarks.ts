import { useState, useEffect } from 'react';

interface BookmarkItem {
  id: string | number;
  [key: string]: any;
}

interface UseBookmarksReturn {
  bookmarkedItems: BookmarkItem[];
  toggleBookmark: (item: BookmarkItem) => void;
  isBookmarked: (itemId: string | number) => boolean;
}

export function useBookmarks(): UseBookmarksReturn {
  const [bookmarkedItems, setBookmarkedItems] = useState<BookmarkItem[]>(() => {
    const saved = localStorage.getItem('bookmarkedItems');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookmarkedItems', JSON.stringify(bookmarkedItems));
  }, [bookmarkedItems]);

  const toggleBookmark = (item: BookmarkItem) => {
    setBookmarkedItems(prev => {
      const isBookmarked = prev.some(bookmarked => bookmarked.id === item.id);
      if (isBookmarked) {
        return prev.filter(bookmarked => bookmarked.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const isBookmarked = (itemId: string | number): boolean => {
    return bookmarkedItems.some(item => item.id === itemId);
  };

  return { bookmarkedItems, toggleBookmark, isBookmarked };
}