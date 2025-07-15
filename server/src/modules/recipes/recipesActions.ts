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

const addRecipes: RequestHandler = async (req, res, next) => {
  try {
    const newRecipes = await recipesRepository.createRecipes(req.body);

    if (newRecipes) {
      res.status(201).json("Congratulations, your recipe has been added.");
    } else {
      res.status(404).json("There was an error while adding your recipe.");
    }
  } catch (err) {
    next(err);
  }
};

export default { browseLastRecipes, addRecipes };
