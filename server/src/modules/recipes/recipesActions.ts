import type { RequestHandler } from "express";
import recipesRepository, {
  type AvailableFilters,
  type RecipesParams,
} from "./recipesRepository";

const browseSearchRecipes: RequestHandler = async (req, res, next) => {
  try {
    /* const name = typeof req.query.name === "string" ? req.query.name : "";
    const price = typeof req.query.price === "string" ? req.query.price : "";
    const duration =
      typeof req.query.duration === "string" ? req.query.duration : "";
    const usersRanking =
      typeof req.query.usersRanking === "string" ? req.query.usersRanking : "";
    const ecoRanking =
      typeof req.query.ecoRanking === "string" ? req.query.ecoRanking : ""; 
      
      const recipesParams: RecipesParams = {
      name,
      price,
      duration,
      usersRanking,
      ecoRanking,
    };
    */

    const filters = ["name", "price", "duration", "usersRanking", "ecoRanking"];
    const recipesParams: RecipesParams = {};
    for (const key of filters) {
      const value = req.query[key];
      recipesParams[key as AvailableFilters] =
        typeof value === "string" ? value : "";
    }

    console.warn("Filters : ", recipesParams);

    const filteredRecipes =
      await recipesRepository.readSearchRecipes(recipesParams);

    res.json(filteredRecipes);
  } catch (err) {
    next(err);
  }
};

export default { browseSearchRecipes };
