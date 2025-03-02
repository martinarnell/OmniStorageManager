import { StorageAdapter } from './types/StorageAdapter';
import { StorageOptions } from './types/StorageOptions';
import { LocalStorageAdapter } from './adapters/LocalStorageAdapter';

interface StoredItem<T> {
  value: T;
  expiry?: number;
}

/**
 * OmniStorageManager - A flexible storage manager for browser applications
 */
export class OmniStorageManager {
  private adapter: StorageAdapter;
  private options: Required<StorageOptions>;
  
  /**
   * Create a new OmniStorageManager instance
   * @param adapter The storage adapter to use (defaults to LocalStorageAdapter)
   * @param options Configuration options
   */
  constructor(
    adapter: StorageAdapter = new LocalStorageAdapter(),
    options: StorageOptions = {}
  ) {
    this.adapter = adapter;
    this.options = {
      namespace: options.namespace || '',
      autoSerialize: options.autoSerialize !== false,
      defaultTTL: options.defaultTTL || 0,
    };
  }

  /**
   * Get the full key with namespace
   * @param key The original key
   * @returns The namespaced key
   */
  private getNamespacedKey(key: string): string {
    return this.options.namespace ? `${this.options.namespace}:${key}` : key;
  }

  /**
   * Get a value from storage
   * @param key The key to retrieve
   * @returns The stored value or null if not found or expired
   */
  get<T>(key: string): T | null {
    const namespacedKey = this.getNamespacedKey(key);
    const data = this.adapter.get<StoredItem<T>>(namespacedKey);
    
    if (!data) {
      return null;
    }
    
    // Check if the item has expired
    if (data.expiry && data.expiry < Date.now()) {
      this.remove(key);
      return null;
    }
    
    return data.value;
  }

  /**
   * Set a value in storage
   * @param key The key to store the value under
   * @param value The value to store
   * @param ttl Time to live in milliseconds (overrides defaultTTL)
   */
  set<T>(key: string, value: T, ttl?: number): void {
    const namespacedKey = this.getNamespacedKey(key);
    const effectiveTTL = ttl !== undefined ? ttl : this.options.defaultTTL;
    
    const data: StoredItem<T> = {
      value,
    };
    
    // Add expiry if TTL is set
    if (effectiveTTL > 0) {
      data.expiry = Date.now() + effectiveTTL;
    }
    
    this.adapter.set(namespacedKey, data);
  }

  /**
   * Remove a value from storage
   * @param key The key to remove
   */
  remove(key: string): void {
    const namespacedKey = this.getNamespacedKey(key);
    this.adapter.remove(namespacedKey);
  }

  /**
   * Clear all values from storage that belong to the current namespace
   */
  clear(): void {
    // If we have a namespace, we need to selectively clear only our namespaced items
    // This is a limitation of the adapter interface, which doesn't provide a way to list keys
    // For now, we'll just clear everything, but in the future we could enhance this
    this.adapter.clear();
  }

  /**
   * Check if a key exists in storage and is not expired
   * @param key The key to check
   * @returns True if the key exists and is not expired, false otherwise
   */
  has(key: string): boolean {
    const namespacedKey = this.getNamespacedKey(key);
    const data = this.adapter.get<StoredItem<any>>(namespacedKey);
    
    if (!data) {
      return false;
    }
    
    // Check if the item has expired
    if (data.expiry && data.expiry < Date.now()) {
      this.remove(key);
      return false;
    }
    
    return true;
  }
} 