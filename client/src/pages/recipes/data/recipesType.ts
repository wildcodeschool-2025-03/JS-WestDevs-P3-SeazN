export interface FilterOption {
  id: string;
  name: string;
  value: string;
}

export interface RecipesFormFilter {
  id: string;
  type: string;
  typeDetail?: string;
  filterName: string;
  content: FilterOption[];
}

export type RecipesFormFilters = RecipesFormFilter[];

export type FormKeyName =
  | "name"
  | "price"
  | "duration"
  | "usersRanking"
  | "ecoRanking";

export type FormObjType = {
  name?: string;
  price?: string | string[];
  duration?: string | string[];
  usersRanking?: string;
  ecoRanking?: string;
};
