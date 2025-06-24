import { Outlet } from "react-router";
import "./App.css";
import MainLayout from "./components/layouts/MainLayout/MainLayout";
import DesktopNav from "./components/navigation/desktopNav/DesktopNav";
import MobileNav from "./components/navigation/mobileNav/MobileNav";

function App() {
  return (
    <>
      <MainLayout>
        <MobileNav />
        <DesktopNav />
        <main>
          <Outlet />
        </main>
      </MainLayout>
    </>
  );
}

export default App;
