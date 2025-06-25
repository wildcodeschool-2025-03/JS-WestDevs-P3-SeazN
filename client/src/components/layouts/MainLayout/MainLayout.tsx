import Sidebar from "../Sidebar/Sidebar";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import "./mainLayout.css";
import type { ChildrenProps } from "../../../types/global";

const MainLayout = ({ children }: ChildrenProps) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-content">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
