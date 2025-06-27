import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

/* ************************************************************************* */

import App from "./App";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home";
import Fridge from "./pages/kitchen/fridge/Fridge";
import MyRecipes from "./pages/kitchen/myrecipes/MyRecipes";
import Planner from "./pages/kitchen/planner/Planner";
import Settings from "./pages/kitchen/settings/Settings";
import ShoppingList from "./pages/kitchen/shoppinglist/ShoppingList";
import NotFound from "./pages/notFound/NotFound";
import Nutrition from "./pages/nutrition/Nutrition";
import Analysis from "./pages/products/analysis/Analysis";
import Seasonal from "./pages/products/seasonal/Seasonal";
import Recipes from "./pages/recipes/Recipes";

import { AuthProvider } from "./contexts/AuthContext";
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
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/kitchen",
        children: [
          {
            path: "myrecipes",
            element: <MyRecipes />,
          },
          {
            path: "fridge",
            element: <Fridge />,
          },
          {
            path: "shoppinglist",
            element: <ShoppingList />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "planner",
            element: <Planner />,
          },
        ],
      },
      {
        path: "/recipes",
        element: <Recipes />,
      },
      {
        path: "/products",
        children: [
          {
            path: "seasonal",
            element: <Seasonal />,
          },
          {
            path: "analysis",
            element: <Analysis />,
          },
        ],
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
