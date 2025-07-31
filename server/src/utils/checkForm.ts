import type { RequestHandler } from "express";
import path from "node:path";
import type {
  Ingredient,
  Instruction,
  ValidationError,
} from "../types/recipes";

const validateRecipeForm: RequestHandler = (req, res, next) => {
  const errors: ValidationError[] = [];
  const { name, guest_number, ingredients, instructions } = req.body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    errors.push({
      field: "recipeName",
      message: "Le nom de la recette est obligatoire",
    });
  } else if (name.trim().length < 5) {
    errors.push({
      field: "recipeName",
      message: "Le nom de la recette doit contenir au moins 5 caractères",
    });
  } else if (name.trim().length > 200) {
    errors.push({
      field: "recipeName",
      message: "Le nom de la recette ne peut pas dépasser 200 caractères",
    });
  }

  const guestNumber = Number(guest_number);
  if (!guest_number || Number.isNaN(guestNumber)) {
    errors.push({
      field: "guest_number",
      message: "Le nombre de personnes est obligatoire",
    });
  } else if (guestNumber < 2 || guestNumber > 12) {
    errors.push({
      field: "guest_number",
      message: "Le nombre de personnes doit être entre 2 et 12",
    });
  }

  let parsedIngredients: Ingredient[] = [];

  try {
    if (typeof ingredients === "string") {
      parsedIngredients = JSON.parse(ingredients);
    } else if (Array.isArray(ingredients)) {
      parsedIngredients = ingredients;
    }
  } catch {
    errors.push({
      field: "ingredients",
      message: "Format des ingrédients invalide",
    });
  }

  if (!Array.isArray(parsedIngredients) || parsedIngredients.length === 0) {
    errors.push({
      field: "ingredients",
      message: "Au moins un ingrédient est requis",
    });
  } else {
    parsedIngredients.forEach((ingredient, index) => {
      const quantity = Number(ingredient.quantity);

      if (!ingredient.name || ingredient.name.trim().length === 0) {
        errors.push({
          field: `ingredient_${index}_name`,
          message: `Le nom de l'ingrédient ${index + 1} est obligatoire`,
        });
      }
      if (!ingredient.quantity || Number.isNaN(quantity)) {
        errors.push({
          field: `ingredient_${index}_quantity`,
          message: `La quantité de l'ingrédient ${index + 1} doit être un nombre valide`,
        });
      } else if (quantity < 0) {
        errors.push({
          field: `ingredient_${index}_quantity`,
          message: `La quantité de l'ingrédient ${index + 1} ne peut pas être négative`,
        });
      } else if (quantity > 5000) {
        errors.push({
          field: `ingredient_${index}_quantity`,
          message: `La quantité de l'ingrédient ${index + 1} ne peut pas dépasser 5000`,
        });
      }

      if (!ingredient.unit || ingredient.unit.trim().length === 0) {
        errors.push({
          field: `ingredient_${index}_unit`,
          message: `L'unité de l'ingrédient ${index + 1} est obligatoire`,
        });
      }
    });
  }

  let parsedInstructions: Instruction[] = [];

  try {
    if (typeof instructions === "string") {
      parsedInstructions = JSON.parse(instructions);
    } else if (Array.isArray(instructions)) {
      parsedInstructions = instructions;
    }
  } catch {
    errors.push({
      field: "instructions",
      message: "Format des instructions invalide",
    });
  }

  if (!Array.isArray(parsedInstructions) || parsedInstructions.length === 0) {
    errors.push({
      field: "instructions",
      message: "Au moins une instruction est requise",
    });
  } else {
    for (const [index, instruction] of parsedInstructions.entries()) {
      if (!instruction.content || instruction.content.trim().length === 0) {
        errors.push({
          field: `instruction_${index}`,
          message: `Le contenu de l'étape ${index + 1} est obligatoire`,
        });
      } else if (instruction.content.trim().length < 5) {
        errors.push({
          field: `instruction_${index}`,
          message: `Le contenu de l'étape ${index + 1} doit contenir au moins 5 caractères`,
        });
      } else if (instruction.content.trim().length > 1000) {
        errors.push({
          field: `instruction_${index}`,
          message: `Le contenu de l'étape ${index + 1} ne peut pas dépasser 1000 caractères`,
        });
      }
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors: errors,
    });
  }

  next();
};

export default validateRecipeForm;
