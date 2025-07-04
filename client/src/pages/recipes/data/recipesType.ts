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
