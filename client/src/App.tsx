import { Outlet } from "react-router";
import "./App.css";
import AppLayout from "./components/layouts/AppLayout/AppLayout";

function App() {
  return (
    <>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </>
  );
}

export default App;
