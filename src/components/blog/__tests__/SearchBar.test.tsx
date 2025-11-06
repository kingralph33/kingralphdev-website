/**
 * SearchBar component unit tests
 * Tests search input behavior, debouncing, and clear functionality
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar Component', () => {
  let onChangeMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onChangeMock = vi.fn();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  describe('Rendering', () => {
    it('renders the search input', () => {
      render(<SearchBar value="" onChange={onChangeMock} />);
      const input = screen.getByTestId('search-input');
      expect(input).toBeInTheDocument();
    });

    it('renders with default placeholder text', () => {
      render(<SearchBar value="" onChange={onChangeMock} />);
      const input = screen.getByPlaceholderText('Search posts...');
      expect(input).toBeInTheDocument();
    });

    it('renders with custom placeholder text', () => {
      render(<SearchBar value="" onChange={onChangeMock} placeholder="Find articles..." />);
      const input = screen.getByPlaceholderText('Find articles...');
      expect(input).toBeInTheDocument();
    });

    it('renders search icon', () => {
      render(<SearchBar value="" onChange={onChangeMock} />);
      const icon = screen.getByTestId('search-input').parentElement?.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('does not render clear button when value is empty', () => {
      render(<SearchBar value="" onChange={onChangeMock} />);
      expect(screen.queryByTestId('clear-search-button')).not.toBeInTheDocument();
    });

    it('renders clear button when value is not empty', () => {
      render(<SearchBar value="test query" onChange={onChangeMock} />);
      expect(screen.getByTestId('clear-search-button')).toBeInTheDocument();
    });
  });

  describe('Input Behavior', () => {
    it('displays the current value', () => {
      render(<SearchBar value="test query" onChange={onChangeMock} />);
      const input = screen.getByTestId('search-input') as HTMLInputElement;
      expect(input.value).toBe('test query');
    });

    it('updates input value when typing', () => {
      render(<SearchBar value="" onChange={onChangeMock} />);
      const input = screen.getByTestId('search-input') as HTMLInputElement;
      
      fireEvent.change(input, { target: { value: 'new search' } });
      
      expect(input.value).toBe('new search');
    });

    it('calls onChange after debounce delay when typing', async () => {
      render(<SearchBar value="" onChange={onChangeMock} />);
      const input = screen.getByTestId('search-input');
      
      fireEvent.change(input, { target: { value: 'test' } });
      
      // Should not call immediately
      expect(onChangeMock).not.toHaveBeenCalled();
      
      // Fast-forward time past debounce delay (300ms by default)
      vi.advanceTimersByTime(300);
      
      // Should call after debounce
      expect(onChangeMock).toHaveBeenCalledWith('test');
    });

    it('debounces multiple rapid changes', () => {
      render(<SearchBar value="" onChange={onChangeMock} />);
      const input = screen.getByTestId('search-input');
      
      // Type multiple characters rapidly
      fireEvent.change(input, { target: { value: 't' } });
      fireEvent.change(input, { target: { value: 'te' } });
      fireEvent.change(input, { target: { value: 'tes' } });
      fireEvent.change(input, { target: { value: 'test' } });
      
      // Should not call yet
      expect(onChangeMock).not.toHaveBeenCalled();
      
      // Fast-forward past debounce delay
      vi.advanceTimersByTime(300);
      
      // Should only call once with final value
      expect(onChangeMock).toHaveBeenCalledTimes(1);
      expect(onChangeMock).toHaveBeenCalledWith('test');
    });

    it('syncs input value when external value changes', () => {
      const { rerender } = render(<SearchBar value="initial" onChange={onChangeMock} />);
      const input = screen.getByTestId('search-input') as HTMLInputElement;
      expect(input.value).toBe('initial');
      
      rerender(<SearchBar value="updated" onChange={onChangeMock} />);
      expect(input.value).toBe('updated');
    });
  });

  describe('Clear Button', () => {
    it('clears the input when clear button is clicked', () => {
      render(<SearchBar value="test query" onChange={onChangeMock} />);
      const input = screen.getByTestId('search-input') as HTMLInputElement;
      const clearButton = screen.getByTestId('clear-search-button');
      
      fireEvent.click(clearButton);
      
      expect(input.value).toBe('');
    });

    it('calls onChange with empty string when clear button is clicked', () => {
      render(<SearchBar value="test query" onChange={onChangeMock} />);
      const clearButton = screen.getByTestId('clear-search-button');
      
      fireEvent.click(clearButton);
      
      expect(onChangeMock).toHaveBeenCalledWith('');
    });

    it('calls onChange immediately without debounce when clearing', () => {
      render(<SearchBar value="test query" onChange={onChangeMock} />);
      const clearButton = screen.getByTestId('clear-search-button');
      
      fireEvent.click(clearButton);
      
      // Should call immediately, no need to advance timers
      expect(onChangeMock).toHaveBeenCalledWith('');
    });

    it('cancels pending debounced calls when clearing', () => {
      // Start with a non-empty value so clear button is visible
      render(<SearchBar value="initial" onChange={onChangeMock} />);
      const input = screen.getByTestId('search-input');
      
      // Type something new
      fireEvent.change(input, { target: { value: 'test' } });
      
      // Immediately clear before debounce fires
      fireEvent.click(screen.getByTestId('clear-search-button'));
      
      // Advance timers
      vi.advanceTimersByTime(300);
      
      // Should only have been called once for clear, not for the typed value
      expect(onChangeMock).toHaveBeenCalledTimes(1);
      expect(onChangeMock).toHaveBeenCalledWith('');
    });

    it('hides clear button after clearing', () => {
      const { rerender } = render(<SearchBar value="test query" onChange={onChangeMock} />);
      const clearButton = screen.getByTestId('clear-search-button');
      
      fireEvent.click(clearButton);
      
      // Rerender with empty value
      rerender(<SearchBar value="" onChange={onChangeMock} />);
      
      expect(screen.queryByTestId('clear-search-button')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper aria-label for search input', () => {
      render(<SearchBar value="" onChange={onChangeMock} />);
      const input = screen.getByLabelText('Search blog posts');
      expect(input).toBeInTheDocument();
    });

    it('has proper aria-label for clear button', () => {
      render(<SearchBar value="test" onChange={onChangeMock} />);
      const clearButton = screen.getByLabelText('Clear search');
      expect(clearButton).toBeInTheDocument();
    });

    it('search icon is decorative (aria-hidden)', () => {
      render(<SearchBar value="" onChange={onChangeMock} />);
      const icon = screen.getByTestId('search-input').parentElement?.querySelector('svg');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('clear button icon is decorative (aria-hidden)', () => {
      render(<SearchBar value="test" onChange={onChangeMock} />);
      const clearButton = screen.getByTestId('clear-search-button');
      const icon = clearButton.querySelector('svg');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('has focus styles', () => {
      render(<SearchBar value="" onChange={onChangeMock} />);
      const input = screen.getByTestId('search-input');
      expect(input).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-green-600');
    });
  });

  describe('Styling', () => {
    it('has proper CSS classes for dark mode support', () => {
      render(<SearchBar value="" onChange={onChangeMock} />);
      const input = screen.getByTestId('search-input');
      expect(input).toHaveClass('dark:bg-gray-800', 'dark:text-white', 'dark:border-gray-600');
    });

    it('has proper layout classes', () => {
      render(<SearchBar value="" onChange={onChangeMock} />);
      const input = screen.getByTestId('search-input');
      expect(input).toHaveClass('w-full', 'pl-11', 'pr-11', 'py-3', 'border-2', 'rounded-lg');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty initial value', () => {
      render(<SearchBar value="" onChange={onChangeMock} />);
      const input = screen.getByTestId('search-input') as HTMLInputElement;
      expect(input.value).toBe('');
    });

    it('handles special characters in search', () => {
      render(<SearchBar value="" onChange={onChangeMock} />);
      const input = screen.getByTestId('search-input');
      
      fireEvent.change(input, { target: { value: '!@#$%^&*()' } });
      vi.advanceTimersByTime(300);
      
      expect(onChangeMock).toHaveBeenCalledWith('!@#$%^&*()');
    });

    it('handles long search queries', () => {
      render(<SearchBar value="" onChange={onChangeMock} />);
      const input = screen.getByTestId('search-input');
      const longQuery = 'a'.repeat(1000);
      
      fireEvent.change(input, { target: { value: longQuery } });
      vi.advanceTimersByTime(300);
      
      expect(onChangeMock).toHaveBeenCalledWith(longQuery);
    });

    it('cleans up debounced function on unmount', () => {
      const { unmount } = render(<SearchBar value="" onChange={onChangeMock} />);
      const input = screen.getByTestId('search-input');
      
      // Type something
      fireEvent.change(input, { target: { value: 'test' } });
      
      // Unmount before debounce fires
      unmount();
      
      // Advance timers
      vi.advanceTimersByTime(300);
      
      // Should not call onChange after unmount
      expect(onChangeMock).not.toHaveBeenCalled();
    });
  });
});
