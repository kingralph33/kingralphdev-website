import { memo } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="shadow-lg mt-auto footer-dark-gradient"
      aria-label="Footer"
    >
      <div className="px-4 py-3 lg:py-4">
        <p className="text-center text-xs lg:text-sm text-gray-700 dark:text-gray-100 dark:font-semibold">
          &copy; 2020 - {currentYear} Ralph King. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default memo(Footer);
