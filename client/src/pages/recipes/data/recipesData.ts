import type { RecipesFormFilters } from "./recipesType";

export const formFilters: RecipesFormFilters = [
  {
    id: "price",
    type: "checkbox",
    filterName: "Prix",
    content: [
      { id: "price1", name: "€", value: "1" },
      { id: "price2", name: "€€", value: "2" },
      { id: "price3", name: "€€€", value: "3" },
    ],
  },
  {
    id: "duration",
    type: "checkbox",
    filterName: "Durée",
    content: [
      { id: "duration1", name: "< 15min", value: "15" },
      { id: "duration2", name: "15min - 30min", value: "30" },
      { id: "duration3", name: "30min - 1h", value: "60" },
      { id: "duration3", name: "> 1h", value: "120" },
    ],
  },
  {
    id: "usersRanking",
    type: "radio",
    typeDetail: "ranking",
    filterName: "Évaluation utilisateurs",
    content: [
      { id: "usersRanking1", name: "> 0", value: "0" },
      { id: "usersRanking2", name: "> 1", value: "1" },
      { id: "usersRanking3", name: "> 2", value: "2" },
      { id: "usersRanking4", name: "> 3", value: "3" },
      { id: "usersRanking5", name: "> 4", value: "4" },
    ],
  },
  {
    id: "ecoRanking",
    type: "radio",
    typeDetail: "ranking",
    filterName: "Évaluation écologique",
    content: [
      { id: "ecoRanking1", name: "> 0", value: "0" },
      { id: "ecoRanking2", name: "> 1", value: "1" },
      { id: "ecoRanking3", name: "> 2", value: "2" },
      { id: "ecoRanking4", name: "> 3", value: "3" },
      { id: "ecoRanking5", name: "> 4", value: "4" },
    ],
  },
];
