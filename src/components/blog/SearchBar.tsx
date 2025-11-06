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
  // Keep the latest onChange without forcing re-creation of debounced function
  const latestOnChange = useRef(onChange);
  useEffect(() => {
    latestOnChange.current = onChange;
  }, [onChange]);

  // Create a stable debounced function once (post-render) and keep it in a ref
  const debouncedRef = useRef<DebouncedFunc<(value: string) => void> | null>(null);
  useEffect(() => {
    debouncedRef.current = debounce((value: string) => {
      latestOnChange.current(value);
    }, SEARCH_DEBOUNCE_DELAY);
    return () => {
      debouncedRef.current?.cancel();
    };
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
    <div className="mb-8">
      <div className="relative">
        <MagnifyingGlassIcon
          className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400 pointer-events-none"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="text"
          defaultValue={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-11 pr-11 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm lg:text-base
                     placeholder:text-gray-500 dark:placeholder:text-gray-400
                     focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-400 focus:border-green-600 dark:focus:border-green-400
                     transition-colors duration-200"
          aria-label="Search blog posts"
          data-testid="search-input"
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1
                       text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-400 rounded
                       transition-colors duration-200"
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
