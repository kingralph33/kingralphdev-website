import { FaExternalLinkAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { memo, useState, useEffect, useRef } from "react";

const AFFILIATE_LINKS = [
  {
    label: "Discount for systemdesignschool.io",
    url: "https://systemdesignschool.io/?linkId=lp_110319&sourceId=ralph-king&tenantId=system-design-school",
  },
  {
    label: "Discount for railway.com",
    url: "https://railway.com?referralCode=Q392J9",
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAffiliatesOpen, setIsAffiliatesOpen] = useState(false);

  // Refs to track dropdown elements for click-outside detection
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  // Click-outside handler to close dropdown when clicking outside
  useEffect(() => {
    // Only run if dropdown is open
    if (!isAffiliatesOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Check if click was outside both desktop and mobile dropdowns
      const isOutsideDesktop = desktopDropdownRef.current &&
                                !desktopDropdownRef.current.contains(target);
      const isOutsideMobile = mobileDropdownRef.current &&
                               !mobileDropdownRef.current.contains(target);

      if (isOutsideDesktop && isOutsideMobile) {
        setIsAffiliatesOpen(false);
      }
    };

    // Add listener to entire document
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup function - remove listener when component unmounts or dropdown closes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAffiliatesOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAffiliatesClick = () => {
    setIsAffiliatesOpen((prev) => !prev);
  };

  const handleAffiliateClick = (url: string) => {
    window.open(url, "_blank", "noopener noreferrer");
    setIsAffiliatesOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 z-10"
      aria-label="Main navigation"
    >
      <div className="max-w-screen mx-auto px-6 lg:px-10 xl:px-16 2xl:px-24">
        <div className="flex justify-between items-center h-16 lg:h-20 xl:h-24">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-xl lg:text-2xl xl:text-3xl font-semibold font-sans text-gray-900 dark:text-gray-100"
            >
              KingRalph.dev
            </Link>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
              onClick={toggleMenu}
            >
              <svg
                className="h-6 w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
          {/* Desktop menu */}
          <div
            className="hidden md:flex space-x-4 lg:space-x-8 xl:space-x-12 items-center"
            data-testid="desktop-menu"
          >
            <Link
              to="/about"
              className="nav-link text-base lg:text-lg xl:text-xl"
            >
              About
            </Link>
            <a
              href="https://kingralphresume.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link flex items-center text-base lg:text-lg xl:text-xl"
              aria-label="Resume, opens in new tab"
            >
              Resume
              <FaExternalLinkAlt className="ml-1" size={18} />
            </a>
            <a
              href="https://github.com/kingralph33"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
              aria-label="GitHub profile, opens in new tab"
            >
              <FaGithub size={28} />
            </a>
            <a
              href="https://www.linkedin.com/in/ralphkingjr/"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
              aria-label="LinkedIn profile, opens in new tab"
            >
              <FaLinkedin size={28} />
            </a>
            {/* Affiliates Dropdown */}
            <div className="relative" ref={desktopDropdownRef}>
              <button
                type="button"
                className="nav-link text-base lg:text-lg xl:text-xl flex items-center focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isAffiliatesOpen}
                onClick={handleAffiliatesClick}
              >
                Affiliates
                <svg
                  className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                    isAffiliatesOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isAffiliatesOpen && (
                <div
                  className="absolute right-0 mt-2 min-w-fit bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-20"
                  style={{ minWidth: 'fit-content' }}
                  role="menu"
                  aria-label="Affiliates dropdown"
                >
                  {AFFILIATE_LINKS.map((link) => (
                    <button
                      key={link.url}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-base lg:text-md xl:text-lg whitespace-nowrap cursor-pointer"
                      onClick={() => handleAffiliateClick(link.url)}
                      role="menuitem"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:hidden transition-all duration-300 ease-in-out`}
          id="mobile-menu"
          data-testid="mobile-menu"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col items-center space-y-4 pb-4 pt-2">
            <Link
              to="/about"
              className="nav-link py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <a
              href="https://kingralphresume.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link flex items-center py-2"
              aria-label="Resume, opens in new tab"
              onClick={() => setIsMenuOpen(false)}
            >
              Resume
              <FaExternalLinkAlt className="ml-1" size={14} />
            </a>
            {/* Mobile Affiliates Dropdown */}
            <div className="w-full flex flex-col items-center" ref={mobileDropdownRef}>
              <button
                type="button"
                className="nav-link py-2 flex items-center focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isAffiliatesOpen}
                onClick={handleAffiliatesClick}
              >
                Affiliates
                <svg
                  className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                    isAffiliatesOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isAffiliatesOpen && (
                <div className="w-full flex flex-col items-center space-y-2 mt-2">
                  {AFFILIATE_LINKS.map((link) => (
                    <button
                      key={link.url}
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 py-1 cursor-pointer"
                      onClick={() => handleAffiliateClick(link.url)}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-center space-x-6 py-2 w-full">
              <a
                href="https://github.com/kingralph33"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
                aria-label="GitHub profile, opens in new tab"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/ralphkingjr/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
                aria-label="LinkedIn profile, opens in new tab"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);
