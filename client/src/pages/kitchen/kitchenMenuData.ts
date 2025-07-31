import type { MenuCardList } from "../../components/ui/menuCard/menuCardType";

export const kitchenMenuList: MenuCardList = [
  {
    id: 1,
    label: "Mes recettes",
    isAvailable: true,
    path: "/kitchen/myrecipes",
  },
  {
    id: 2,
    label: "Réfrigérateur",
    isAvailable: false,
    path: "/kitchen/fridge",
  },
  {
    id: 3,
    label: "Liste de courses",
    isAvailable: false,
    path: "/kitchen/shoppinglist",
  },
  {
    id: 4,
    label: "Paramètres",
    isAvailable: false,
    path: "/kitchen/settings",
  },
  {
    id: 5,
    label: "Calendrier",
    isAvailable: true,
    path: "/kitchen/planner",
  },
];
