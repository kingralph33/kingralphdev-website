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
        src="/images/profile.jpeg"
        alt="Ralph King Jr"
        className="w-80 h-80 rounded-full object-cover mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">Ralph King Jr</h1>
      <p className="text-xl text-gray-600 dark:text-gray-100 mb-6">
        Software Engineer in the Washington DC Metro Area
      </p>
      <Link
        to="/about"
        className="bg-[oklch(0.32_0.03_270.43)] text-white px-6 py-3 rounded-md hover:opacity-90 transition-colors inline-flex items-center gap-2"
        aria-label="Learn more about Ralph King"
      >
        Find out more about me
        <ArrowRightIcon className="h-5 w-5" aria-hidden="true" data-testid="arrow-icon" />
      </Link>
    </div>

    {/* Divider */}
    <hr className="border-gray-200 dark:border-gray-700 mb-12" />

    {/* Two Column Section */}
    <div className="grid md:grid-cols-2 gap-8">
      {/* Left Column */}
      <div>
        <h2 className="homepage-column-headers">
          Full-stack Engineering
        </h2>
        <p className="homepage-column-content">
          Specializing in modern JavaScript/TypeScript
          ecosystems (React, Node.js) and Python/Django frameworks. I architect and
          implement end-to-end solutions, from responsive front-end interfaces to
          scalable backend systems and databases. Strong focus on code quality,
          testing practices, and performance optimization.
        </p>
      </div>

      {/* Right Column */}
      <div>
        <h2 className="homepage-column-headers">
          Cloud Engineering
        </h2>
        <p className="homepage-column-content">
          Expertise in AWS and OpenShift platforms, focusing on
          cloud-native application architecture and deployment. Skilled in implementing
          robust CI/CD pipelines, infrastructure as code (IaC), and automated testing
          frameworks. Experience in optimizing application performance, security, and
          scalability in cloud environments.
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
