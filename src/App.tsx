import { memo, Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout/MainLayout";

// Lazy load the About page for code splitting
const About = lazy(() => import("./pages/About/About"));
const Blog = lazy(() => import("./pages/Blog/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost/BlogPost"));

// Extract the Home component to a focused, single-screen hero
const Home = memo(() => (
  <div className="max-w-4xl mx-auto px-4 py-16 lg:py-24 text-center">
    <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-blue-900 dark:text-white">
      Ralph King Jr
    </h1>
    <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-blue-900 dark:text-gray-300">
      Software Engineer
    </h2>
    <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
      Building cloud-native infrastructure and developer tooling for mission-critical government systems. 5+ years of experience in platform engineering.
    </p>
    <div className="flex flex-wrap justify-center gap-3">
      <a href="/about" className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-400 text-blue-900 dark:text-white hover:text-green-600 dark:hover:text-green-600 hover:shadow-sm transition" aria-label="Go to About page">
        About
      </a>
      <a href="https://kingralphresume.com/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-400 text-blue-900 dark:text-white hover:text-green-600 dark:hover:text-green-600 hover:shadow-sm transition" aria-label="Hero resume link, opens in new tab">
        Resume
      </a>
      <a href="/posts" className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-400 text-blue-900 dark:text-white hover:text-green-600 dark:hover:text-green-600 hover:shadow-sm transition" aria-label="Go to Posts page">
        Posts
      </a>
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
            <Route path="/posts" element={<Blog />} />
            <Route path="/posts/:slug" element={<BlogPost />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </Router>
  );
}

export default App;
