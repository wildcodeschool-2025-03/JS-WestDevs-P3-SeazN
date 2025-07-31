import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AppLayout from "./components/layouts/AppLayout/AppLayout";

function App() {
  return (
    <>
      <AppLayout>
        <Outlet />
      </AppLayout>
      <ToastContainer />
    </>
  );
}

export default App;
