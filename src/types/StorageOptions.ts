/**
 * Options for configuring the storage manager
 */
export interface StorageOptions {
  /**
   * Namespace to prefix all keys with
   */
  namespace?: string;
  
  /**
   * Whether to serialize/deserialize values automatically
   * @default true
   */
  autoSerialize?: boolean;
  
  /**
   * Default TTL (time to live) in milliseconds for stored items
   * Set to 0 for no expiration
   * @default 0
   */
  defaultTTL?: number;
} 