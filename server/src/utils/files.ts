import crypto from "node:crypto";
import path from "node:path";
import type { RequestHandler } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "public/assets/images/");
  },
  filename(req, file, callback) {
    const { name, ext } = path.parse(file.originalname.toLowerCase());
    const id = crypto.randomUUID();
    callback(null, `${name}_${id}${ext}`);
  },
});

const upload = multer({ storage: storage });

const imageUpload = upload.single("image");

const recipesImage: RequestHandler = (req, res, next) => {
  const apiUrl = process.env.SERVER_URL;
  try {
    if (req.file) {
      req.body.image = `${apiUrl}/assets/images/${req.file.filename}`;
      console.log(req.file.filename);
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default { imageUpload, recipesImage };
