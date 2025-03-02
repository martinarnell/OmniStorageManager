import { OmniStorageManager } from './OmniStorageManager';
import { LocalStorageAdapter } from './adapters/LocalStorageAdapter';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('OmniStorageManager', () => {
  let storage: OmniStorageManager;
  
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
    storage = new OmniStorageManager();
  });
  
  describe('basic operations', () => {
    it('should store and retrieve a value', () => {
      storage.set('testKey', 'testValue');
      expect(storage.get('testKey')).toBe('testValue');
    });
    
    it('should return null for non-existent keys', () => {
      expect(storage.get('nonExistentKey')).toBeNull();
    });
    
    it('should remove a value', () => {
      storage.set('testKey', 'testValue');
      storage.remove('testKey');
      expect(storage.get('testKey')).toBeNull();
    });
    
    it('should check if a key exists', () => {
      storage.set('testKey', 'testValue');
      expect(storage.has('testKey')).toBe(true);
      expect(storage.has('nonExistentKey')).toBe(false);
    });
    
    it('should clear all values', () => {
      storage.set('testKey1', 'testValue1');
      storage.set('testKey2', 'testValue2');
      storage.clear();
      expect(storage.get('testKey1')).toBeNull();
      expect(storage.get('testKey2')).toBeNull();
    });
  });
  
  describe('namespacing', () => {
    beforeEach(() => {
      storage = new OmniStorageManager(new LocalStorageAdapter(), { namespace: 'test' });
    });
    
    it('should namespace keys', () => {
      storage.set('testKey', 'testValue');
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'test:testKey',
        expect.any(String)
      );
    });
    
    it('should retrieve namespaced keys', () => {
      storage.set('testKey', 'testValue');
      expect(storage.get('testKey')).toBe('testValue');
    });
  });
  
  describe('expiration', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      storage = new OmniStorageManager(new LocalStorageAdapter(), { defaultTTL: 1000 });
    });
    
    afterEach(() => {
      jest.useRealTimers();
    });
    
    it('should expire items after TTL', () => {
      storage.set('testKey', 'testValue');
      expect(storage.get('testKey')).toBe('testValue');
      
      // Advance time past TTL
      jest.advanceTimersByTime(1100);
      
      expect(storage.get('testKey')).toBeNull();
    });
    
    it('should override default TTL with specific TTL', () => {
      storage.set('testKey1', 'testValue1', 500);
      storage.set('testKey2', 'testValue2', 2000);
      
      // Advance time past first TTL
      jest.advanceTimersByTime(600);
      
      expect(storage.get('testKey1')).toBeNull();
      expect(storage.get('testKey2')).toBe('testValue2');
      
      // Advance time past second TTL
      jest.advanceTimersByTime(1500);
      
      expect(storage.get('testKey2')).toBeNull();
    });
    
    it('should not expire items with TTL of 0', () => {
      storage.set('testKey', 'testValue', 0);
      
      // Advance time
      jest.advanceTimersByTime(10000);
      
      expect(storage.get('testKey')).toBe('testValue');
    });
  });
  
  describe('complex data types', () => {
    it('should handle objects', () => {
      const testObject = { name: 'Test', value: 123 };
      storage.set('testObject', testObject);
      expect(storage.get('testObject')).toEqual(testObject);
    });
    
    it('should handle arrays', () => {
      const testArray = [1, 2, 3, 'test'];
      storage.set('testArray', testArray);
      expect(storage.get('testArray')).toEqual(testArray);
    });
    
    it('should handle nested structures', () => {
      const testNested = {
        name: 'Test',
        values: [1, 2, 3],
        nested: {
          a: 1,
          b: 'test'
        }
      };
      storage.set('testNested', testNested);
      expect(storage.get('testNested')).toEqual(testNested);
    });
  });
}); 