/**
 * SearchBar component
 * Provides search functionality for blog posts
 */

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = 'Search posts...' }: SearchBarProps) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
