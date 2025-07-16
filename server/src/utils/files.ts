import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";
import type { RequestHandler } from "express";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "public/assets/images/");
  },
  filename(req, file, callback) {
    const base = path.basename(file.originalname).toLowerCase();
    const ext = path.extname(file.originalname).toLowerCase();
    const id = crypto.randomUUID();
    callback(null, `${base}_${id}${ext}`);
  },
});

const upload = multer({ storage: storage });

const imageUpload = upload.single("image");

const recipesImage: RequestHandler = (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/assets/images/${req.file.filename}`;

      next();
    }
  } catch (err) {
    next(err);
  }
};
