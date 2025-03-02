# Omni Storage Manager

A flexible and extensible storage manager for browser applications. Currently supports localStorage with plans to add more storage options in the future.

## Features

- Simple API for storing and retrieving data
- Automatic serialization and deserialization of complex data types
- Namespacing to avoid key collisions
- TTL (time-to-live) support for automatic expiration
- Extensible adapter system for different storage backends

## Installation

```bash
npm install omni-storage-manager
```

## Usage

### Basic Usage

```javascript
import { OmniStorageManager } from 'omni-storage-manager';

// Create a new storage manager with default options (localStorage)
const storage = new OmniStorageManager();

// Store a value
storage.set('myKey', 'myValue');

// Retrieve a value
const value = storage.get('myKey');
console.log(value); // 'myValue'

// Check if a key exists
if (storage.has('myKey')) {
  console.log('Key exists!');
}

// Remove a value
storage.remove('myKey');

// Clear all values
storage.clear();
```

### Working with Complex Data Types

The storage manager automatically handles serialization and deserialization of complex data types:

```javascript
// Store an object
storage.set('user', { 
  id: 1, 
  name: 'John Doe', 
  roles: ['admin', 'user'] 
});

// Retrieve the object
const user = storage.get('user');
console.log(user.name); // 'John Doe'
```

### Using Namespaces

Namespaces help avoid key collisions with other applications or libraries:

```javascript
const storage = new OmniStorageManager(undefined, { 
  namespace: 'myApp' 
});

storage.set('user', { name: 'John' });
// Internally stored as 'myApp:user'
```

### Setting Expiration (TTL)

You can set items to automatically expire after a certain time:

```javascript
// Set a default TTL for all items (30 minutes)
const storage = new OmniStorageManager(undefined, { 
  defaultTTL: 30 * 60 * 1000 
});

// Set an item with a specific TTL (5 minutes)
storage.set('sessionToken', 'abc123', 5 * 60 * 1000);

// Set an item that never expires
storage.set('preferences', { theme: 'dark' }, 0);
```

## API Reference

### `OmniStorageManager`

#### Constructor

```typescript
constructor(
  adapter?: StorageAdapter,
  options?: StorageOptions
)
```

- `adapter`: The storage adapter to use (defaults to `LocalStorageAdapter`)
- `options`: Configuration options
  - `namespace`: Prefix for all keys
  - `autoSerialize`: Whether to automatically serialize/deserialize values (default: `true`)
  - `defaultTTL`: Default time-to-live in milliseconds, 0 for no expiration (default: `0`)

#### Methods

- `get<T>(key: string): T | null` - Get a value from storage
- `set<T>(key: string, value: T, ttl?: number): void` - Set a value in storage
- `remove(key: string): void` - Remove a value from storage
- `clear(): void` - Clear all values from storage
- `has(key: string): boolean` - Check if a key exists in storage

### `StorageAdapter` Interface

You can create custom storage adapters by implementing the `StorageAdapter` interface:

```typescript
interface StorageAdapter {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
  clear(): void;
  has(key: string): boolean;
}
```

## Future Plans

- Session storage adapter
- IndexedDB adapter
- Memory storage adapter
- Cookie storage adapter
- Encryption support
- Compression support
- Batch operations
- Storage events/callbacks

## License

MIT
