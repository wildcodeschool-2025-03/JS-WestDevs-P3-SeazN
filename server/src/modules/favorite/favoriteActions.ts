import type { RequestHandler } from "express";
import type { Favorite } from "../../types/express/favorite";
import favoriteRepository from "./favoriteRepository";
import type { RecipeBase } from "../../types/express/recipe";

const browseFavoritesByUser: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);

    if (Number.isNaN(userId)) {
      return res.status(400).send("Invalid userId");
    }

    const favorites = await favoriteRepository.readAll(userId);

    res.json(favorites as RecipeBase[]);
  } catch (err) {
    next(err);
  }
};

const readSingleFavorite: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const recipeId = Number(req.params.recipeId);

    if (Number.isNaN(userId) || Number.isNaN(recipeId)) {
      return res.status(400).send("Invalid userId or recipeId");
    }

    const rows = await favoriteRepository.readSingleFavorite(userId, recipeId);

    if (rows.length > 0) {
      res.json(rows[0].is_favorite === 1);
    } else {
      res.json(false);
    }
  } catch (err) {
    next(err);
  }
};

const addFavorite: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const recipeId = Number(req.params.recipeId);

    if (Number.isNaN(userId) || Number.isNaN(recipeId)) {
      return res.status(400).send("Invalid userId or recipeId");
    }

    const newFavorite = await favoriteRepository.createFavorite(
      userId,
      recipeId,
    );

    if (newFavorite) {
      res.status(201).json({ message: "Created", favorites: newFavorite });
    } else {
      res.status(404).json({ message: "Favorite not created" });
    }
  } catch (err) {
    next(err);
  }
};

const removeFavorite: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const recipeId = Number(req.params.recipeId);

    if (Number.isNaN(userId) || Number.isNaN(recipeId)) {
      return res.status(400).send("Invalid userId or recipeId");
    }

    const updatedFavorite = await favoriteRepository.updateFavorite(
      userId,
      recipeId,
    );

    if (updatedFavorite) {
      res
        .status(200)
        .json(
          `Recipe ${recipeId} has been successfully removed from user ${userId} favorites.`,
        );
    } else {
      res
        .status(404)
        .json(
          `Impossible to remove recipe ${recipeId} from user ${userId} favorites.`,
        );
    }
  } catch (err) {
    next(err);
  }
};

export default {
  addFavorite,
  browseFavoritesByUser,
  readSingleFavorite,
  removeFavorite,
};
