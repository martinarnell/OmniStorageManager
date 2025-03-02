import { StorageAdapter } from '../types/StorageAdapter';

/**
 * Adapter for in-memory storage
 * This adapter stores data in memory and is lost when the page is refreshed
 */
export class MemoryStorageAdapter implements StorageAdapter {
  private storage: Map<string, any> = new Map();

  /**
   * Get a value from memory storage
   * @param key The key to retrieve
   * @returns The stored value or null if not found
   */
  get<T>(key: string): T | null {
    return this.storage.has(key) ? this.storage.get(key) : null;
  }

  /**
   * Set a value in memory storage
   * @param key The key to store the value under
   * @param value The value to store
   */
  set<T>(key: string, value: T): void {
    this.storage.set(key, value);
  }

  /**
   * Remove a value from memory storage
   * @param key The key to remove
   */
  remove(key: string): void {
    this.storage.delete(key);
  }

  /**
   * Clear all values from memory storage
   */
  clear(): void {
    this.storage.clear();
  }

  /**
   * Check if a key exists in memory storage
   * @param key The key to check
   * @returns True if the key exists, false otherwise
   */
  has(key: string): boolean {
    return this.storage.has(key);
  }
} 