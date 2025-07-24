import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { memo, Suspense, lazy } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout/MainLayout";

// Lazy load the About page for code splitting
const About = lazy(() => import("./pages/About/About"));

// Extract the Home component to improve readability and organization
const Home = memo(() => (
  <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 xl:py-16">
    {/* Profile Section */}
    <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:items-center mb-12 lg:mb-16">
      <img
        src="/images/profile2.webp"
        alt="Ralph King Jr an 'AI ML Engineer'"
        width="320"
        height="320"
        className="w-80 h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] rounded-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      <div className="text-center md:text-left md:ml-6 lg:ml-8">
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 uppercase tracking-wider">
          Ralph King Jr
        </h1>
        <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-6 text-center dark:text-white uppercase tracking-wider">
          AI/ML Engineer & Builder
        </h2>
      </div>
    </div>
    <div>
      <p className="text-justify md:text-lg lg:text-xl xl:text-2xl leading-relaxed text-gray-700 dark:text-gray-300 max-w-5xl mx-auto mb-8 lg:mb-12">
        I design, train, and deploy machine learning models and LLM-powered
        systems using Python, FastAPI, and cloud platforms like Azure and AWS.
        Currently focused on applied AI, infrastructure automation, and building
        intelligent tools that scale.
      </p>
      <Link
        to="/about"
        className="bg-[oklch(0.32_0.03_270.43)] text-white px-6 py-3 rounded-md hover:opacity-90 transition-colors inline-flex items-center gap-2"
        aria-label="View Ralph King's detailed professional background and experience"
      >
        Find out more about me
        <ArrowRightIcon
          className="h-6 w-6 lg:h-7 lg:w-7"
          aria-hidden="true"
          data-testid="arrow-icon"
        />
      </Link>
    </div>
  </div>
));

function App() {
  return (
    <Router>
      <MainLayout>
        <Suspense fallback={<div className="flex items-center justify-center min-h-[200px]">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </Router>
  );
}

export default App;
