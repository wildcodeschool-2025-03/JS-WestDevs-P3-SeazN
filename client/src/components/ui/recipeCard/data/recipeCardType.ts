export type MeasureUnits =
  | "g"
  | "cL"
  | "cuillère(s) à café"
  | "cuillère(s) à soupe"
  | "pièce(s)"
  | "pincée(s)"
  | "portion(s)"
  | null;

export interface RecipeBase {
  id: number;
  name: string;
  image: string;
}

export interface RecipeIngredient {
  id: number;
  name: string;
  quantity: number | null;
  unit: MeasureUnits;
  isVegan: 0 | 1;
  isVegetarian: 0 | 1;
  isGlutenFree: 0 | 1;
  isExpensive: 0 | 1;
  nutritionScore?: number;
  ecoScore?: number;
}

export interface RecipeInstruction {
  id: number;
  stepOrder: number;
  content: string;
}

export interface RecipeDetailed {
  id: number;
  name: string;
  image: string | null;
  price: number | null;
  guestNumber: number;
  duration: string;
  usersAverage?: number | null;
  nutritionAverage?: number | null;
  ecoAverage?: number | null;
  ingredients: RecipeIngredient[];
  instructions: RecipeInstruction[];
}

export interface RecipeCardBase {
  variant: "mini" | "square" | "rect";
  recipe: RecipeBase;
}

export interface RecipeCardDetailed {
  variant: "detailed";
  recipe: RecipeDetailed;
}

export type RecipeCardProps = RecipeCardBase | RecipeCardDetailed;
