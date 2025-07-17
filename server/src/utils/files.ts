import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";
import type { RequestHandler } from "express";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "public/assets/images/");
  },
  filename(req, file, callback) {
    const { name, ext } = path.parse(file.originalname.toLowerCase());
    const id = crypto.randomUUID();
    callback(null, `${name}_${id}${ext}`)

  },
});

const upload = multer({ storage: storage });

const imageUpload = upload.single("image");

const recipesImage: RequestHandler = (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/assets/images/${req.file.filename}`;

      next();
    } else {
      res.status(400).json("File problem");
    }
  } catch (err) {
    next(err);
  }
};

export default { imageUpload, recipesImage };
