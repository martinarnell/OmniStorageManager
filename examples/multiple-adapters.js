// Example demonstrating multiple storage adapters

import { 
  OmniStorageManager, 
  LocalStorageAdapter, 
  SessionStorageAdapter, 
  MemoryStorageAdapter 
} from 'omni-storage-manager';

// Create storage managers with different adapters
const localStorage = new OmniStorageManager(new LocalStorageAdapter(), { namespace: 'local' });
const sessionStorage = new OmniStorageManager(new SessionStorageAdapter(), { namespace: 'session' });
const memoryStorage = new OmniStorageManager(new MemoryStorageAdapter(), { namespace: 'memory' });

// Store the same data in different storage types
localStorage.set('user', { name: 'John', id: 1 });
sessionStorage.set('user', { name: 'Jane', id: 2 });
memoryStorage.set('user', { name: 'Bob', id: 3 });

// Retrieve and display the data
console.log('Local Storage User:', localStorage.get('user'));
console.log('Session Storage User:', sessionStorage.get('user'));
console.log('Memory Storage User:', memoryStorage.get('user'));

// Memory storage is lost when the page is refreshed, but local and session persist
console.log('Memory storage is volatile and will be lost when the page is refreshed');
console.log('Local storage persists across browser sessions');
console.log('Session storage persists only for the current browser session');

// Example of using different TTLs
localStorage.set('token', 'abc123', 60 * 60 * 1000); // 1 hour
sessionStorage.set('token', 'def456', 30 * 60 * 1000); // 30 minutes
memoryStorage.set('token', 'ghi789', 5 * 60 * 1000); // 5 minutes

console.log('Local Storage Token (1 hour TTL):', localStorage.get('token'));
console.log('Session Storage Token (30 min TTL):', sessionStorage.get('token'));
console.log('Memory Storage Token (5 min TTL):', memoryStorage.get('token'));

// After 5 minutes, the memory token would expire
console.log('After 5 minutes, the memory token would expire');

// Simulating checking after 5 minutes (in a real app, this would happen naturally over time)
setTimeout(() => {
  console.log('Memory Storage Token after 5 minutes:', memoryStorage.get('token'));
  console.log('Session Storage Token after 5 minutes:', sessionStorage.get('token'));
  console.log('Local Storage Token after 5 minutes:', localStorage.get('token'));
}, 5 * 60 * 1000); // This will actually wait 5 minutes - you might want to reduce this for testing 