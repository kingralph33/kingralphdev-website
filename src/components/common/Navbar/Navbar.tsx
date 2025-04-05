import { FaExternalLinkAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { memo, useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 z-10"
      aria-label="Main navigation"
    >
      <div className="max-w-screen mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-xl font-semibold font-sans text-gray-900 dark:text-gray-100"
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
                className="h-6 w-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4 items-center" data-testid="desktop-menu">
            <Link
              to="/about"
              className="nav-link"
            >
              About
            </Link>
            <a
              href="https://kingralphresume.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link flex items-center"
              aria-label="Resume, opens in new tab"
            >
              Resume
              <FaExternalLinkAlt className="ml-1" size={14} />
            </a>
            <a
              href="https://github.com/kingralph33"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
              aria-label="GitHub profile, opens in new tab"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/ralphkingjr/"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
              aria-label="LinkedIn profile, opens in new tab"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div 
          className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden transition-all duration-300 ease-in-out`}
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
