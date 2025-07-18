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
  is_vegan: 0 | 1;
  is_vegetarian: 0 | 1;
  is_glutenfree: 0 | 1;
  is_expensive: 0 | 1;
  nutrition_score?: number;
  eco_score?: number;
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
  guest_number: number;
  usersAverage?: number | string | null;
  nutritionAverage?: number | string | null;
  ecoAverage?: number | string | null;
  ingredients: RecipeIngredient[];
  instructions: RecipeInstruction[];
  userId: number | null;
  duration: string; // format "HH:MM:SS"
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
