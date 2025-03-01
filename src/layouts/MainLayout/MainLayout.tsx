import { ReactNode } from "react";
import Footer from "../../components/common/Footer/Footer";
import Navbar from "../../components/common/Navbar/Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
