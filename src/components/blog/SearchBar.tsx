/**
 * SearchBar component
 * Provides search functionality for blog posts with debounced input and clear button
 */

import { useCallback, useEffect, useRef, memo } from 'react';
import debounce from 'lodash/debounce';
import type { DebouncedFunc } from 'lodash';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { SEARCH_DEBOUNCE_DELAY } from './constants';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = 'Search posts...' }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  // Keep latest onChange in a ref so we don't re-create handlers
  const latestOnChange = useRef(onChange);
  useEffect(() => {
    latestOnChange.current = onChange;
  }, [onChange]);

  // Initialize a stable debounced function once and store in a ref
  const debouncedRef = useRef<DebouncedFunc<(value: string) => void> | null>(null);
  useEffect(() => {
    debouncedRef.current = debounce((val: string) => {
      latestOnChange.current(val);
    }, SEARCH_DEBOUNCE_DELAY);
    return () => debouncedRef.current?.cancel();
  }, []);

  // Sync input value when external value changes (e.g., from clear button)
  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value;
    }
  }, [value]);

  // Memoized handler that calls the debounced function
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedRef.current?.(e.target.value);
  }, []);

  const handleClear = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    latestOnChange.current('');
    debouncedRef.current?.cancel();
  }, []);

  return (
    <div className="mb-6 relative">
      <div className="relative">
        <MagnifyingGlassIcon 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="text"
          defaultValue={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-lg
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     placeholder:text-gray-500 dark:placeholder:text-gray-400
                     focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-gray-200"
          aria-label="Search blog posts"
          data-testid="search-input"
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2
                       text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300
                       focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-gray-200 rounded"
            aria-label="Clear search"
            data-testid="clear-search-button"
          >
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(SearchBar);
