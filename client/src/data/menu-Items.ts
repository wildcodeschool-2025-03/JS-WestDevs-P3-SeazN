export const menuItems = [
  {
    icon: "/icones-logo/icon-dashbords2.webp",
    label: "Synthèse",
    path: "/dashboard",
  },
  {
    icon: "/icones-logo/Icon-cuisine3.webp",
    label: "Ma cuisine",
    path: "",
    subItems: [
      { label: "Mes recettes", path: "/kitchen/myrecipes" },
      { label: "Frigo", path: "/kitchen/fridge" },
      { label: "Liste des courses", path: "/kitchen/shoppinglist" },
      { label: "Préférences", path: "/kitchen/settings" },
      { label: "Plannificateur", path: "/kitchen/planner" },
    ],
  },
  {
    icon: "/icones-logo/icon-recette2.webp",
    label: "Recettes",
    path: "/recipes",
  },
  {
    icon: "/icones-logo/icon-produit2.webp",
    label: "Produits",
    path: "",
    subItems: [
      { label: "Légumes de saison", path: "/products/seasonal" },
      { label: "Analyse ingrédients", path: "/products/analysis" },
    ],
  },
  {
    icon: "/icones-logo/icon-nutrition2.webp",
    label: "Nutrition",
    path: "/nutrition",
  },
];
