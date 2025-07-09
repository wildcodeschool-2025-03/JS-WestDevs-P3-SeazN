import type { RequestHandler } from "express";
import recipesRepository from "./recipesRepository";

const browseLastRecipes: RequestHandler = async (req, res, next) => {
  try {
    const lastRecipes = await recipesRepository.readLastRecipes();
    res.json(lastRecipes);
  } catch (err) {
    next(err);
  }
};

export default { browseLastRecipes };
