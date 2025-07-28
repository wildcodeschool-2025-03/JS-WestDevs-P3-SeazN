import type { RequestHandler } from "express";
import recipesRepository, {
  type AvailableFilters,
  type RecipesParams,
} from "./recipesRepository";

const browseSearchRecipes: RequestHandler = async (req, res, next) => {
  try {
    const filters = [
      "name",
      "price",
      "duration",
      "usersRanking",
      "ecoRanking",
      "page",
    ];
    const recipesParams: RecipesParams = {};
    for (const key of filters) {
      const value = req.query[key];
      recipesParams[key as AvailableFilters] =
        typeof value === "string" ? value : "";
    }

    const filteredRecipes =
      await recipesRepository.readSearchRecipes(recipesParams);

    res.json(filteredRecipes);
  } catch (err) {
    next(err);
  }
};

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
    console.warn("JE SUIS DANS ACTION");

    const newRecipes = await recipesRepository.createRecipes(req.body);

    if (newRecipes) {
      res.status(201).json("Congratulations, your recipe has been added.");
    } else {
      res.status(404).json("There was an error while adding your recipe.");
    }
  } catch (err) {
    res.status(500).json("Internal server error");
    next(err);
  }
};

export default { browseLastRecipes, browseSearchRecipes, addRecipes };
