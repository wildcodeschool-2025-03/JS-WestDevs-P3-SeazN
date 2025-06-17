import { Outlet } from "react-router";
import "./App.css";
import Footer from "./components/layouts/footer/Footer";
import Header from "./components/layouts/header/Header";
import DesktopNav from "./components/navigation/desktopNav/DesktopNav";
import MobileNav from "./components/navigation/mobileNav/MobileNav";

function App() {
  return (
    <>
      <MobileNav />
      <DesktopNav />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
