import type { ChildrenProps } from "../../../types/global";
import MobileNav from "../../navigation/mobileNav/MobileNav";
import Sidebar from "../../navigation/sidebar/Sidebar";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import "./appLayout.css";

const AppLayout = ({ children }: ChildrenProps) => {
  return (
    <div className="global-layout">
      <Sidebar />

      <Header />
      <MobileNav />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
