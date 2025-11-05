/**
 * SearchBar component
 * Provides search functionality for blog posts with debounced input and clear button
 */

import { useCallback, useEffect, useRef, useState, memo } from 'react';
import debounce from 'lodash/debounce';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = 'Search posts...' }: SearchBarProps) => {
  const [localValue, setLocalValue] = useState(value);
  // Create a ref to store the debounced function
  const debouncedOnChangeRef = useRef<ReturnType<typeof debounce> | null>(null);

  // Update the debounced function when onChange changes
  useEffect(() => {
    // Cancel the previous debounced function if it exists
    if (debouncedOnChangeRef.current) {
      debouncedOnChangeRef.current.cancel();
    }
    // Create new debounced function with current onChange
    debouncedOnChangeRef.current = debounce((value: string) => onChange(value), 300);
    
    // Cleanup on unmount or when onChange changes
    return () => {
      if (debouncedOnChangeRef.current) {
        debouncedOnChangeRef.current.cancel();
      }
    };
  }, [onChange]);

  // Sync local value when external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Memoized handler that calls the debounced function
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    if (debouncedOnChangeRef.current) {
      debouncedOnChangeRef.current(newValue);
    }
  }, []);

  const handleClear = useCallback(() => {
    setLocalValue('');
    onChange('');
    if (debouncedOnChangeRef.current) {
      debouncedOnChangeRef.current.cancel();
    }
  }, [onChange]);

  return (
    <div className="mb-6 relative">
      <div className="relative">
        <MagnifyingGlassIcon 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500"
          aria-hidden="true"
        />
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     placeholder:text-gray-500 dark:placeholder:text-gray-400
                     focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-gray-200"
          aria-label="Search blog posts"
        />
        {localValue && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 
                       text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300
                       focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-gray-200 rounded"
            aria-label="Clear search"
          >
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(SearchBar);
