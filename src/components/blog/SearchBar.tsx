/**
 * SearchBar component
 * Provides search functionality for blog posts with debounced input
 */

import { useCallback, useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = 'Search posts...' }: SearchBarProps) => {
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

  // Memoized handler that calls the debounced function
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (debouncedOnChangeRef.current) {
      debouncedOnChangeRef.current(e.target.value);
    }
  }, []);

  return (
    <div className="mb-6">
      <input
        type="text"
        defaultValue={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-gray-200"
        aria-label="Search blog posts"
      />
    </div>
  );
};

export default SearchBar;
