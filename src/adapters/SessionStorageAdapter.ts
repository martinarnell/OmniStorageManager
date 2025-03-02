import { StorageAdapter } from '../types/StorageAdapter';

/**
 * Adapter for sessionStorage
 */
export class SessionStorageAdapter implements StorageAdapter {
  /**
   * Get a value from sessionStorage
   * @param key The key to retrieve
   * @returns The stored value or null if not found
   */
  get<T>(key: string): T | null {
    try {
      const value = sessionStorage.getItem(key);
      return value ? JSON.parse(value) as T : null;
    } catch (error) {
      console.error(`Error getting item from sessionStorage: ${error}`);
      return null;
    }
  }

  /**
   * Set a value in sessionStorage
   * @param key The key to store the value under
   * @param value The value to store
   */
  set<T>(key: string, value: T): void {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item in sessionStorage: ${error}`);
    }
  }

  /**
   * Remove a value from sessionStorage
   * @param key The key to remove
   */
  remove(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from sessionStorage: ${error}`);
    }
  }

  /**
   * Clear all values from sessionStorage
   */
  clear(): void {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error(`Error clearing sessionStorage: ${error}`);
    }
  }

  /**
   * Check if a key exists in sessionStorage
   * @param key The key to check
   * @returns True if the key exists, false otherwise
   */
  has(key: string): boolean {
    try {
      return sessionStorage.getItem(key) !== null;
    } catch (error) {
      console.error(`Error checking if key exists in sessionStorage: ${error}`);
      return false;
    }
  }
} 