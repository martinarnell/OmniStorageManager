// Basic usage example for OmniStorageManager

import { OmniStorageManager } from 'omni-storage-manager';

// Create a new storage manager with default options (localStorage)
const storage = new OmniStorageManager();

// Store a simple value
storage.set('greeting', 'Hello, world!');
console.log('Stored greeting:', storage.get('greeting'));

// Store an object
const user = {
  id: 123,
  name: 'John Doe',
  email: 'john@example.com',
  preferences: {
    theme: 'dark',
    notifications: true
  }
};
storage.set('user', user);

// Retrieve the object
const retrievedUser = storage.get('user');
console.log('Retrieved user:', retrievedUser);
console.log('User theme:', retrievedUser.preferences.theme);

// Store with expiration (TTL) - 5 seconds
storage.set('temporaryToken', 'abc123', 5000);
console.log('Token (before expiration):', storage.get('temporaryToken'));

// Check if keys exist
console.log('Has greeting:', storage.has('greeting'));
console.log('Has unknown key:', storage.has('unknown'));

// Remove a key
storage.remove('greeting');
console.log('Has greeting after removal:', storage.has('greeting'));

// Using namespaced storage
const appStorage = new OmniStorageManager(undefined, { namespace: 'myApp' });
appStorage.set('config', { version: '1.0.0' });

// Both storages work independently
console.log('Default storage has config:', storage.has('config'));
console.log('App storage has config:', appStorage.has('config'));

// Demonstrate TTL expiration
setTimeout(() => {
  console.log('Token (after expiration):', storage.get('temporaryToken'));
}, 6000);

// Clear all storage
// storage.clear(); // Uncomment to clear all storage 