import type { RequestHandler } from "express";
import lastRecipesRepository from "./recipesRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const lastRecipes = await lastRecipesRepository.readAll();
    res.json(lastRecipes);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const recipeId = Number(req.params.id);
    const result = await lastRecipesRepository.readById(recipeId);
    if (result == null) {
      res.sendStatus(404);
    } else {
      res.json(result);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read };
