import MobileNav from "../../../components/navigation/Sidebar/mobileNav/MobileNav";
import Sidebar from "../../navigation/Sidebar/Sidebar";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import "../../navigation/Sidebar/mobileNav/mobileNav.css";
import "./appLayout.css";
import type { ChildrenProps } from "../../../types/global";

const AppLayout = ({ children }: ChildrenProps) => {
  return (
    <div className="global_layout">
      <Sidebar />

      <Header />
      <MobileNav />
      {children}
      <Footer />
    </div>
  );
};

export default AppLayout;
