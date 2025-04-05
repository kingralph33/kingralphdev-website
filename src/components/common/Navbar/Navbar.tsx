import { FaExternalLinkAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { memo } from "react";

// Extract common styles to reduce duplication
const linkStyles = "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100";
const socialLinkStyles = `${linkStyles}`;

const Navbar = () => {
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
          <div className="flex space-x-4 items-center">
            <Link
              to="/about"
              className={linkStyles}
            >
              About
            </Link>
            <a
              href="https://kingralphresume.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkStyles} flex items-center`}
              aria-label="Resume, opens in new tab"
            >
              Resume
              <FaExternalLinkAlt className="ml-1" size={14} />
            </a>
            <a
              href="https://github.com/kingralph33"
              target="_blank"
              rel="noopener noreferrer"
              className={socialLinkStyles}
              aria-label="GitHub profile, opens in new tab"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/ralphkingjr/"
              target="_blank"
              rel="noopener noreferrer"
              className={socialLinkStyles}
              aria-label="LinkedIn profile, opens in new tab"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(Navbar);
