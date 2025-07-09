import type { RequestHandler } from "express";
import lastRecipesRepository from "./recipesRepository";

const browseLastRecipes: RequestHandler = async (req, res, next) => {
  try {
    const lastRecipes = await lastRecipesRepository.readLastRecipes();
    res.json(lastRecipes);
  } catch (err) {
    next(err);
  }
};

export default { browseLastRecipes };
