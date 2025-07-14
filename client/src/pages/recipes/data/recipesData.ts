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
      { id: "duration1", name: "< 30min", value: "00:00:00-00:30:00" },
      { id: "duration2", name: "30 min - 1h", value: "00:30:00-01:00:00" },
      { id: "duration3", name: "1h - 2h", value: "01:00:00-02:00:00" },
      { id: "duration4", name: "> 2h", value: "02:00:00-99:00:00" },
    ],
  },
  {
    id: "usersRanking",
    type: "radio",
    typeDetail: "ranking",
    filterName: "Note gourmets",
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
    filterName: "Note éco",
    content: [
      { id: "ecoRanking1", name: "> 0", value: "0" },
      { id: "ecoRanking2", name: "> 1", value: "1" },
      { id: "ecoRanking3", name: "> 2", value: "2" },
      { id: "ecoRanking4", name: "> 3", value: "3" },
      { id: "ecoRanking5", name: "> 4", value: "4" },
    ],
  },
];
