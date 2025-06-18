export interface RecipeBase {
  id: number;
  name: string;
  image: string;
}

export interface RecipeDetailed {
  id: number;
  name: string;
  image: string | null;
  price: number | null;
  guestNumber: number;
  nutritionAverage: number | null;
  ecoAverage: number | null;
  userId: number | null;
  duration: number;
}

export interface RecipeCardBase {
  variant: "mini" | "preview";
  recipe: RecipeBase;
}

export interface RecipeCardDetailed {
  variant: "detailed";
  recipe: RecipeDetailed;
}

export type RecipeCardProps = RecipeCardBase | RecipeCardDetailed;
