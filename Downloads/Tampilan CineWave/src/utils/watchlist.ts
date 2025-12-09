import { Movie } from '../data/movies';

export type WatchListCategory = 'watching' | 'on-hold' | 'plan-to-watch' | 'dropped' | 'completed';

export interface WatchListItem {
  movie: Movie;
  category: WatchListCategory;
  addedAt: string;
}

const WATCHLIST_KEY = 'cinewave_watchlist';

// Get all watchlist items
export function getWatchList(): WatchListItem[] {
  const data = localStorage.getItem(WATCHLIST_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Get movies by category
export function getWatchListByCategory(category: WatchListCategory): Movie[] {
  const items = getWatchList();
  return items
    .filter(item => item.category === category)
    .map(item => item.movie);
}

// Check if movie is in watchlist
export function isInWatchList(movieId: number): WatchListCategory | null {
  const items = getWatchList();
  const item = items.find(item => item.movie.id === movieId);
  return item ? item.category : null;
}

// Add movie to watchlist
export function addToWatchList(movie: Movie, category: WatchListCategory): void {
  const items = getWatchList();
  
  // Remove if already exists
  const filtered = items.filter(item => item.movie.id !== movie.id);
  
  // Add new item
  filtered.push({
    movie,
    category,
    addedAt: new Date().toISOString()
  });
  
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(filtered));
}

// Update category of existing item
export function updateWatchListCategory(movieId: number, newCategory: WatchListCategory): void {
  const items = getWatchList();
  const updated = items.map(item => 
    item.movie.id === movieId 
      ? { ...item, category: newCategory }
      : item
  );
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
}

// Remove from watchlist
export function removeFromWatchList(movieId: number): void {
  const items = getWatchList();
  const filtered = items.filter(item => item.movie.id !== movieId);
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(filtered));
}

// Get category display name
export function getCategoryDisplayName(category: WatchListCategory): string {
  const names: Record<WatchListCategory, string> = {
    'watching': 'Watching',
    'on-hold': 'On-Hold',
    'plan-to-watch': 'Plan to Watch',
    'dropped': 'Dropped',
    'completed': 'Completed'
  };
  return names[category];
}

// Get category color
export function getCategoryColor(category: WatchListCategory): string {
  const colors: Record<WatchListCategory, string> = {
    'watching': 'from-blue-500 to-blue-600',
    'on-hold': 'from-yellow-500 to-yellow-600',
    'plan-to-watch': 'from-purple-500 to-purple-600',
    'dropped': 'from-red-500 to-red-600',
    'completed': 'from-green-500 to-green-600'
  };
  return colors[category];
}
