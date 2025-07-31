import type { MenuCardList } from "../../components/ui/menuCard/menuCardType";

export const productsMenuList: MenuCardList = [
  {
    id: 1,
    label: "Produits de saison",
    isAvailable: false,
    path: "/products/seasonnal",
  },
  {
    id: 2,
    label: "Analyse",
    isAvailable: false,
    path: "/products/analysis",
  },
];
