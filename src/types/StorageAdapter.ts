/**
 * Interface for storage adapters
 */
export interface StorageAdapter {
  /**
   * Get a value from storage
   * @param key The key to retrieve
   * @returns The stored value or null if not found
   */
  get<T>(key: string): T | null;
  
  /**
   * Set a value in storage
   * @param key The key to store the value under
   * @param value The value to store
   */
  set<T>(key: string, value: T): void;
  
  /**
   * Remove a value from storage
   * @param key The key to remove
   */
  remove(key: string): void;
  
  /**
   * Clear all values from storage
   */
  clear(): void;
  
  /**
   * Check if a key exists in storage
   * @param key The key to check
   * @returns True if the key exists, false otherwise
   */
  has(key: string): boolean;
} 