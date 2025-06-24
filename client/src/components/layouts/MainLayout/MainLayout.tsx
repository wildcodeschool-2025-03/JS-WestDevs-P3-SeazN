import Sidebar from "../Sidebar/Sidebar";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import "./mainLayout.css";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <aside className="layout">
      <Sidebar />
      <div className="layout-content">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </aside>
  );
};

export default MainLayout;
