const Footer = () => {
  const getCurrentYear = () => new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 shadow-lg mt-auto border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <p className="text-center text-sm text-gray-600 dark:text-gray-100">
          &copy; 2020 - {getCurrentYear()} Ralph King. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
