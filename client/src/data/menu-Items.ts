export const menuItems = [
  {
    icon: "/icones-logo/icon-dashbords2.webp",
    label: "Synthèse",
    path: "/synthese",
  },
  {
    icon: "/icones-logo/Icon-cuisine3.webp",
    label: "Ma cuisine",
    path: "/ma-cuisine",
    subItems: [
      { label: "Mes recettes", path: "/ma-cuisine/recettes" },
      { label: "Frigo", path: "/ma-cuisine/frigo" },
      { label: "Liste des courses", path: "/ma-cuisine/courses" },
      { label: "Préférences", path: "/ma-cuisine/preferences" },
      { label: "Plannificateur", path: "/ma-cuisine/plannificateur" },
    ],
  },
  {
    icon: "/icones-logo/icon-recette2.webp",
    label: "Recettes",
    path: "/recettes",
  },
  {
    icon: "/icones-logo/icon-produit2.webp",
    label: "Produits",
    path: "/produits",
    subItems: [
      { label: "Légumes de saison", path: "/produits/legumes-de-saison" },
      { label: "Analyse ingrédients", path: "/produits/analyse-ingredients" },
    ],
  },
  {
    icon: "/icones-logo/icon-nutrition2.webp",
    label: "Nutrition",
    path: "/nutrition",
  },
];
