import { ReactNode, memo } from "react";
import Footer from "../../components/common/Footer/Footer";
import Navbar from "../../components/common/Navbar/Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <Navbar />
      <main className="flex-grow pt-16" role="main" aria-label="Main content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default memo(MainLayout);
