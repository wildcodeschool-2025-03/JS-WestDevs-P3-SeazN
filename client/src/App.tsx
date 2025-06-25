import { Outlet } from "react-router";
import "./App.css";
import AppLayout from "./components/layouts/AppLayout/AppLayout";
import MobileNav from "./components/navigation/Sidebar/mobileNav/MobileNav";

function App() {
  return (
    <>
      <AppLayout>
        <MobileNav />
        <Outlet />
      </AppLayout>
    </>
  );
}

export default App;
