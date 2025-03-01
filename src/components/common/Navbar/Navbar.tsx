import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full border-b border-gray-200 bg-white z-10">
      <div className="max-w-screen mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-semibold font-sans">
              KingRalph.dev
            </Link>
          </div>
          <div className="flex space-x-4 items-center">
            <Link
              to="/about"
              className="text-[oklch(0.32_0.03_270.43)] hover:text-gray-900"
            >
              About
            </Link>
            <Link
              to="/resume"
              className="text-[oklch(0.32_0.03_270.43)] hover:text-gray-900"
            >
              Resume
            </Link>
            <a
              href="https://github.com/kingralph33"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[oklch(0.32_0.03_270.43)] hover:text-gray-900"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/ralphkingjr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[oklch(0.32_0.03_270.43)] hover:text-gray-900"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
