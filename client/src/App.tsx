import { Outlet } from "react-router";
import "./App.css";
import AppLayout from "./components/layouts/AppLayout/AppLayout";
import { ToastContainer } from "react-toastify";

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
