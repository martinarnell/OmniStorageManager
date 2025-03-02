import { StorageAdapter } from '../types/StorageAdapter';

/**
 * Adapter for localStorage
 */
export class LocalStorageAdapter implements StorageAdapter {
  /**
   * Get a value from localStorage
   * @param key The key to retrieve
   * @returns The stored value or null if not found
   */
  get<T>(key: string): T | null {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) as T : null;
    } catch (error) {
      console.error(`Error getting item from localStorage: ${error}`);
      return null;
    }
  }

  /**
   * Set a value in localStorage
   * @param key The key to store the value under
   * @param value The value to store
   */
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item in localStorage: ${error}`);
    }
  }

  /**
   * Remove a value from localStorage
   * @param key The key to remove
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from localStorage: ${error}`);
    }
  }

  /**
   * Clear all values from localStorage
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error clearing localStorage: ${error}`);
    }
  }

  /**
   * Check if a key exists in localStorage
   * @param key The key to check
   * @returns True if the key exists, false otherwise
   */
  has(key: string): boolean {
    try {
      return localStorage.getItem(key) !== null;
    } catch (error) {
      console.error(`Error checking if key exists in localStorage: ${error}`);
      return false;
    }
  }
} 