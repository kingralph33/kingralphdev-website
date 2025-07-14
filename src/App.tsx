import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { memo } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout/MainLayout";
import About from "./pages/About/About";

// Extract the Home component to improve readability and organization
const Home = memo(() => (
  <div className="max-w-6xl mx-auto px-4 py-8">
    {/* Profile Section */}
    <div className="flex flex-col items-center mb-12">
      <img
        src="/images/profile.webp"
        alt="Ralph King Jr an 'AI ML Engineer'"
        width="320"
        height="320"
        className="w-80 h-80 rounded-full object-cover mb-6"
        loading="eager"
        fetchPriority="high"
      />
      <h1 className="text-3xl font-bold mb-2 uppercase tracking-wider">Ralph King Jr</h1>
      <p className="text-xl text-gray-600 dark:text-gray-100 mb-6">
        AI/ML Engineer in the Baltimore/Washington DC Metro Area
      </p>
      <Link
        to="/about"
        className="bg-[oklch(0.32_0.03_270.43)] text-white px-6 py-3 rounded-md hover:opacity-90 transition-colors inline-flex items-center gap-2"
        aria-label="View Ralph King's detailed professional background and experience"
      >
        Find out more about me
        <ArrowRightIcon className="h-5 w-5" aria-hidden="true" data-testid="arrow-icon" />
      </Link>
    </div>

    {/* Divider */}
    <hr className="border-gray-200 dark:border-gray-700 mb-12" />

    <div className="col-span-full">
      <div>
        <h1 className="homepage-hero-headers">
          AI/ML Engineer & Builder
        </h1>
        <p className="homepage-hero-content">
          I design, train, and deploy machine learning models and LLM-powered systems using Python, FastAPI, and cloud platforms like Azure and AWS.
          Currently focused on applied AI, infrastructure automation, and building intelligent tools that scale.
        </p>
      </div>
    </div>
  </div>
));

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
