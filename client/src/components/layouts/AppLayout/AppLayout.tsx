import Sidebar from "../../navigation/Sidebar/Sidebar";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import "./appLayout.css";
import type { ChildrenProps } from "../../../types/global";

const AppLayout = ({ children }: ChildrenProps) => {
  return (
    <>
      <Sidebar />
      <div className="layout-content">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default AppLayout;
