import { memo, Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout/MainLayout";

// Lazy load the About page for code splitting
const About = lazy(() => import("./pages/About/About"));

// Extract the Home component to improve readability and organization
const Home = memo(() => (
  <div className="max-w-6xl mx-auto px-4 py-6 lg:py-10">
    {/* Hero Section - Text Focused */}
    <div className="flex flex-col items-center justify-center text-center mb-10 lg:mb-14 max-w-3xl mx-auto">
      <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 tracking-tight text-[--color-navy-blue] dark:text-white">
        Ralph King Jr
      </h1>
      <h2 className="text-xl lg:text-2xl xl:text-3xl font-semibold mb-4 text-[--color-navy-blue] dark:text-gray-300">
        Software Engineer
      </h2>
      <p className="text-base lg:text-lg text-gray-600 dark:text-white dark:font-semibold mb-6 max-w-xl leading-relaxed">
        Building scalable solutions for government and enterprise clients with
        5+ years experience
      </p>
    </div>

    {/* Core Technologies with Expertise Levels */}
    <div className="mb-12 lg:mb-16 border-t-4 border-[--color-grinch-green] pt-8">
      <h3 className="text-xl lg:text-2xl font-bold text-center mb-6 text-[--color-navy-blue] dark:text-white">
        Technology Expertise
      </h3>
      <div className="max-w-4xl mx-auto">
        <div className="mb-5">
          <h4 className="text-base font-semibold mb-2 text-center text-[--color-navy-blue] dark:text-gray-400">
            Backend Specialization
          </h4>
          <div className="flex flex-wrap justify-center gap-2">
            {["Python", "Node.js", "PostgreSQL"].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs lg:text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-5">
          <h4 className="text-base font-semibold mb-2 text-center text-[--color-navy-blue] dark:text-gray-400">
            Cloud & DevOps
          </h4>
          <div className="flex flex-wrap justify-center gap-2">
            {["AWS", "Azure", "OpenShift", "Docker", "CI/CD"].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs lg:text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-base font-semibold mb-2 text-center text-[--color-navy-blue] dark:text-gray-400">
            Frontend & Full-Stack
          </h4>
          <div className="flex flex-wrap justify-center gap-2">
            {["JavaScript", "TypeScript", "React", "HTML/CSS"].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs lg:text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Key Projects */}
    <div className="mb-12 lg:mb-16 border-t-4 border-[--color-grinch-green] pt-8">
      <h3 className="text-xl lg:text-2xl font-bold text-center mb-8 text-[--color-navy-blue] dark:text-white">
        Recent Impact
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="p-5 border-2 border-[--color-grinch-green] rounded-lg hover:shadow-lg transition-shadow duration-200">
          <h4 className="text-lg font-bold mb-2 text-[--color-navy-blue] dark:text-white">
            Government Compliance System
          </h4>
          <p className="text-sm text-gray-600 dark:text-white dark:font-semibold mb-3">
            Replaced legacy vendor software with custom Django application,
            serving 7,500+ users with 100% compliance rate
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Python", "Django", "PostgreSQL", "OpenShift", "Azure"].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="p-5 border-2 border-[--color-grinch-green] rounded-lg hover:shadow-lg transition-shadow duration-200">
          <h4 className="text-lg font-bold mb-2 text-[--color-navy-blue] dark:text-white">
            Fleet Management Platform
          </h4>
          <p className="text-sm text-gray-600 dark:text-white dark:font-semibold mb-3">
            Built automated workflow system managing 2,000+ vehicles, reducing
            processing time by 80%
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Python", "Django", "PostgreSQL", "OpenShift", "Azure"].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
));

function App() {
  return (
    <Router>
      <MainLayout>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[200px]">
              Loading...
            </div>
          }
        >
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
