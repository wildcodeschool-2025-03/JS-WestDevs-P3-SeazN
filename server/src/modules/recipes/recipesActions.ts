import type { RequestHandler } from "express";
import type {
  AvailableFilters,
  RecipeBase,
  RecipesParams,
} from "../../types/express/recipe";
import recipesRepository from "./recipesRepository";

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

const browseAddedRecipesByUser: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);

    if (Number.isNaN(userId)) {
      return res.status(400).send("Invalid userId");
    }

    const addedRecipes = await recipesRepository.readAddedByUser(userId);

    res.json(addedRecipes as RecipeBase[]);
  } catch (err) {
    next(err);
  }
};

const addRecipes: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const newRecipes = await recipesRepository.createRecipes(req.body, userId);

    if (newRecipes) {
      res.status(201).json("Congratulations, your recipe has been added.");
    } else {
      res.status(404).json("There was an error while adding your recipe.");
    }
  } catch (err) {
    res.status(500).json("Internal server error");
  }
};

export default {
  browseSearchRecipes,
  browseLastRecipes,
  readRecipeDetailed,
  browseAddedRecipesByUser,
  addRecipes,
};
