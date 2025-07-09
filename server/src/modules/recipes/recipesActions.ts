import type { RequestHandler } from "express";
import recipesRepository, { type RecipesParams } from "./recipesRepository";

const browseSearchRecipes: RequestHandler = async (req, res, next) => {
  try {
    const { name, price, duration, usersRanking, ecoRanking } = req.query;
    const prices = typeof price === "string" ? price.split(",") : "";
    const durations = typeof duration === "string" ? duration.split(",") : "";

    const recipesParams: RecipesParams = {
      name,
      prices,
      durations,
      usersRanking,
      ecoRanking,
    };

    console.warn("Filters : ", recipesParams);

    const filteredRecipes =
      await recipesRepository.readSearchRecipes(recipesParams);

    res.json(filteredRecipes);
  } catch (err) {
    next(err);
  }
};

export default { browseSearchRecipes };
