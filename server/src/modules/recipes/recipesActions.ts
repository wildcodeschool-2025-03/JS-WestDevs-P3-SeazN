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
const readRecipeDetailed: RequestHandler = async (req, res, next) => {
  console.log(req.params);
  try {
    const recipeId = Number(req.params.id);
    const recipe = await recipesRepository.readById(recipeId);

    if (recipe == null) {
      res.sendStatus(404);
    } else {
      res.json(recipe);
    }
  } catch (err) {
    next(err);
  }
};

export default { browseSearchRecipes, browseLastRecipes, readRecipeDetailed };
