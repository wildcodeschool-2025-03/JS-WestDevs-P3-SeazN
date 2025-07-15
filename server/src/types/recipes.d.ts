export interface Recipes {
  name: string;
  image?: string;
  price?: number;
  is_validated: boolean;
  guest_number: number;
  nutrition_average?: number;
  eco_average?: number;
  duration?: string;
}
