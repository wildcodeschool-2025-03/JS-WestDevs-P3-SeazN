import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

/* ************************************************************************* */

import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home";
import Kitchen from "./pages/kitchen/Kitchen";
import Fridge from "./pages/kitchen/fridge/Fridge";
import MyRecipes from "./pages/kitchen/myrecipes/MyRecipes";
import Planner from "./pages/kitchen/planner/Planner";
import Settings from "./pages/kitchen/settings/Settings";
import ShoppingList from "./pages/kitchen/shoppinglist/ShoppingList";
import NotFound from "./pages/notFound/NotFound";
import Nutrition from "./pages/nutrition/Nutrition";
import Products from "./pages/products/Products";
import Analysis from "./pages/products/analysis/Analysis";
import Seasonal from "./pages/products/seasonal/Seasonal";
import Recipes from "./pages/recipes/Recipes";
import Register from "./pages/register/Register";

/* ************************************************************************* */

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/connexion",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/kitchen",
        element: <Kitchen />,
      },
      {
        path: "/kitchen/myrecipes",
        element: <MyRecipes />,
      },
      {
        path: "/kitchen/fridge",
        element: <Fridge />,
      },
      {
        path: "/kitchen/shoppinglist",
        element: <ShoppingList />,
      },
      {
        path: "/kitchen/settings",
        element: <Settings />,
      },
      {
        path: "/kitchen/planner",
        element: <Planner />,
      },
      {
        path: "/recipes",
        element: <Recipes />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/seasonal",
        element: <Seasonal />,
      },
      {
        path: "/products/analysis",
        element: <Analysis />,
      },
      {
        path: "/nutrition",
        element: <Nutrition />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

/* ************************************************************************* */

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
