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
    console.log("IN MULTER", name);
    
    const id = crypto.randomUUID();
    callback(null, `${name}_${id}${ext}`);
    console.log("CALLBACK", `${name}_${id}${ext}`);
  },
});

const upload = multer({ storage: storage });

const imageUpload = upload.single("image");

const recipesImage: RequestHandler = (req, res, next) => {
  try {
    console.log("=== DIAGNOSTIC ===");
    console.log("req.file:", req.file);
    console.log("req.files:", req.files);
    console.log("req.body:", req.body);
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("=== FIN DIAGNOSTIC ===");
    if (req.file) {
      req.body.image = `/assets/images/${req.file.filename}`;
      console.log(req.file.filename);

      next();
    } else {
      res.status(400).json("File problem");
    }
  } catch (err) {
    next(err);
  }
};

export default { imageUpload, recipesImage };
