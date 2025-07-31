import type { RequestHandler } from "express";
import unitRepository from "./unitRepository";

const browseUnit: RequestHandler = async (req, res, next) => {
  try {
    const unit = await unitRepository.readAllUnit();
    res.json(unit);
  } catch (err) {
    next(err);
  }
};

export default { browseUnit };
