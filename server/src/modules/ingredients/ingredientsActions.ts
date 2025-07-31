import type { RequestHandler } from "express";
import ingredientsRepository from "./ingredientsRepository";

const browseIngredient: RequestHandler = async (req, res, next) => {
  try {
    const ingredients = await ingredientsRepository.readAllIngredient();
    res.json(ingredients);
  } catch (err) {
    next(err);
  }
};

export default { browseIngredient };
