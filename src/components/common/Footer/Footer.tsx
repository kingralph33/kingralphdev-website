import { memo } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-white dark:bg-gray-900 shadow-lg mt-auto border-t border-gray-200 dark:border-gray-700"
      aria-label="Footer"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 lg:py-6 xl:py-8">
        <p className="text-center text-sm lg:text-base xl:text-lg text-gray-600 dark:text-gray-100">
          &copy; 2020 - {currentYear} Ralph King. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default memo(Footer);
