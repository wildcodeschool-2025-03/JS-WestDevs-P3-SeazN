export interface AddRecipes {
  name: string;
  image?: string;
  price?: number;
  is_validated: boolean;
  guest_number: number;
  nutrition_average?: number;
  eco_average?: number;
  duration?: string;
  user_id: number;
  ingredients: Array<{
    ingredient_id: number;
    quantity?: number;
    unit_id?: number;
  }>;
  instructions: Array<{
    step_order: number;
    content: string;
  }>;
}
