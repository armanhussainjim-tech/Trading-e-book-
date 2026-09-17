/**
 * Storage service for saving trading strategies progress, favorites, and reading state.
 */

export interface UserTradingState {
  favorites: number[]; // Strategy numbers marked as favorite
  completed: number[]; // Strategy numbers marked as completed / mastered
  lastReadStrategyNumber: number; // Last viewed strategy number
  notes: Record<number, string>; // Optional notes per strategy
}

const STORAGE_KEY = 'trading_master_user_state_v1';

const DEFAULT_STATE: UserTradingState = {
  favorites: [],
  completed: [],
  lastReadStrategyNumber: 1,
  notes: {},
};

export const loadUserState = (): UserTradingState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
      lastReadStrategyNumber: typeof parsed.lastReadStrategyNumber === 'number' ? parsed.lastReadStrategyNumber : 1,
      notes: typeof parsed.notes === 'object' && parsed.notes !== null ? parsed.notes : {},
    };
  } catch (error) {
    console.error('Failed to load user state from localStorage:', error);
    return DEFAULT_STATE;
  }
};

export const saveUserState = (state: UserTradingState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save user state to localStorage:', error);
  }
};

export const toggleFavoriteStrategy = (strategyNumber: number): UserTradingState => {
  const current = loadUserState();
  const exists = current.favorites.includes(strategyNumber);
  const updatedFavorites = exists
    ? current.favorites.filter((num) => num !== strategyNumber)
    : [...current.favorites, strategyNumber];

  const updated: UserTradingState = {
    ...current,
    favorites: updatedFavorites,
  };
  saveUserState(updated);
  return updated;
};

export const toggleCompletedStrategy = (strategyNumber: number): UserTradingState => {
  const current = loadUserState();
  const exists = current.completed.includes(strategyNumber);
  const updatedCompleted = exists
    ? current.completed.filter((num) => num !== strategyNumber)
    : [...current.completed, strategyNumber];

  const updated: UserTradingState = {
    ...current,
    completed: updatedCompleted,
  };
  saveUserState(updated);
  return updated;
};

export const setLastReadStrategy = (strategyNumber: number): UserTradingState => {
  const current = loadUserState();
  if (current.lastReadStrategyNumber === strategyNumber) return current;
  const updated: UserTradingState = {
    ...current,
    lastReadStrategyNumber: strategyNumber,
  };
  saveUserState(updated);
  return updated;
};
