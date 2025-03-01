import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout/MainLayout";
import About from "./pages/About/About";
import Resume from "./pages/Resume/Resume";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route
            path="/"
            element={
              <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Profile Section */}
                <div className="flex flex-col items-center mb-12">
                  <img
                    src="/images/profile.jpeg"
                    alt="Ralph King Jr"
                    className="w-80 h-80 rounded-full object-cover mb-6"
                  />
                  <h1 className="text-3xl font-bold mb-2">Ralph King Jr</h1>
                  <p className="text-xl text-[oklch(0.32_0.03_270.43)] mb-6">
                    Software Engineer in the Washington DC Metro Area
                  </p>
                  <Link
                    to="/about"
                    className="bg-[oklch(0.32_0.03_270.43)] text-white px-6 py-3 rounded-md hover:opacity-90 transition-colors inline-flex items-center gap-2"
                  >
                    Find out more about me
                    <ArrowRightIcon className="h-5 w-5" />
                  </Link>
                </div>

                {/* Divider */}
                <hr className="border-gray-200 mb-12" />

                {/* Two Column Section */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4 text-left">
                      Fullstack Developer
                    </h2>
                    <p className="text-[oklch(0.32_0.03_270.43)] text-left">
                      Full-stack developer proficient in building and deploying
                      web applications using JavaScript frameworks, Node.js, and
                      Python/Django. I design and implement all aspects of an
                      application, from user interface to database, and am
                      skilled in testing, deployment, and maintenance.
                    </p>
                  </div>

                  {/* Right Column */}
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4 text-left">
                      Cloud Engineer
                    </h2>
                    <p className="text-[oklch(0.32_0.03_270.43)] text-left">
                      Proficient in designing, developing, and deploying
                      applications and infrastructure on platforms like Azure
                      and OpenShift. Expertise includes CI/CD implementation and
                      management for automated software delivery, along with
                      building and maintaining automated testing frameworks.
                    </p>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
