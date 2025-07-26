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
    {/* Hero Section */}
    <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:items-center mb-12 lg:mb-16">
      <img
        src="/images/profile2.webp"
        alt="Ralph King Jr a Software Engineer"
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
        <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-6 text-center md:text-left dark:text-white uppercase tracking-wider">
          Software Engineer
        </h2>
        <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-md">
          Building scalable solutions for government and enterprise clients with
          5+ years experience
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a
            href="mailto:ralph@kingralph.dev"
            className="bg-[oklch(0.32_0.03_270.43)] text-white px-6 py-3 rounded-md hover:opacity-90 transition-colors inline-flex items-center justify-center gap-2"
          >
            Get In Touch
          </a>
          <Link
            to="/about"
            className="border-2 border-[oklch(0.32_0.03_270.43)] text-[oklch(0.32_0.03_270.43)] px-6 py-3 rounded-md hover:bg-[oklch(0.32_0.03_270.43)] hover:text-white transition-colors inline-flex items-center justify-center gap-2"
            aria-label="View Ralph King's detailed professional background and experience"
          >
            Learn More
            <ArrowRightIcon
              className="h-5 w-5"
              aria-hidden="true"
              data-testid="arrow-icon"
            />
          </Link>
        </div>
      </div>
    </div>

    {/* Impact Metrics */}
    <div className="mb-16 lg:mb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6">
          <div className="text-3xl lg:text-4xl font-bold text-[oklch(0.32_0.03_270.43)] mb-2">
            $1M+
          </div>
          <div className="text-gray-600 dark:text-gray-300">
            Annual Cost Savings
          </div>
        </div>
        <div className="p-6">
          <div className="text-3xl lg:text-4xl font-bold text-[oklch(0.32_0.03_270.43)] mb-2">
            7,500+
          </div>
          <div className="text-gray-600 dark:text-gray-300">Users Served</div>
        </div>
        <div className="p-6">
          <div className="text-3xl lg:text-4xl font-bold text-[oklch(0.32_0.03_270.43)] mb-2">
            100%
          </div>
          <div className="text-gray-600 dark:text-gray-300">
            Compliance Rate
          </div>
        </div>
      </div>
    </div>

    {/* Core Technologies with Expertise Levels */}
    <div className="mb-16 lg:mb-20">
      <h3 className="text-2xl lg:text-3xl font-bold text-center mb-8">
        Technology Expertise
      </h3>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3 text-center text-gray-700 dark:text-gray-300">
            Backend Specialization
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {["Python", "Django", "PostgreSQL", "REST APIs"].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-[oklch(0.32_0.03_270.43)] text-white rounded-full text-sm lg:text-base font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3 text-center text-gray-700 dark:text-gray-300">
            Cloud & DevOps
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {["AWS", "Azure", "OpenShift", "Docker", "CI/CD"].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm lg:text-base"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3 text-center text-gray-700 dark:text-gray-300">
            Frontend & Full-Stack
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {["JavaScript", "TypeScript", "React", "HTML/CSS"].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm lg:text-base"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Key Projects */}
    <div className="mb-16 lg:mb-20">
      <h3 className="text-2xl lg:text-3xl font-bold text-center mb-12">
        Recent Impact
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            Government Compliance System
          </h4>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Replaced legacy vendor software with custom Django application,
            serving 7,500+ users with 100% compliance rate
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-sm">
              Python
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-sm">
              Django
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-sm">
              PostgreSQL
            </span>
          </div>
        </div>
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            Fleet Management Platform
          </h4>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Built automated workflow system managing 2,000+ vehicles, reducing
            processing time by 80%
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-sm">
              Python
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-sm">
              AWS
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-sm">
              OpenShift
            </span>
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
