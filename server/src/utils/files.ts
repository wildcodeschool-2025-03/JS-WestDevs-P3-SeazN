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

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    const allowedTypes = [".png", ".jpg", ".jpeg", ".webp"];
    const fileExtension = path.extname(file.originalname.toLowerCase());

    if (allowedTypes.includes(fileExtension)) {
      callback(null, true);
    } else {
      callback(new Error("INVALID_FILE_TYPE"));
    }
  },
});

const imageUpload: RequestHandler = (req, res, next) => {
  const uploadSingle = upload.single("image");

  uploadSingle(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        res.status(400).json({
          success: false,
          errors: [
            {
              field: "image",
              message: "L'image ne peut pas dépasser 5MB",
            },
          ],
        });
        return;
      }
      if (err.message === "INVALID_FILE_TYPE") {
        res.status(400).json({
          success: false,
          errors: [
            {
              field: "image",
              message:
                "Format d'image non autorisé. Utilisez PNG, JPG, JPEG ou WEBP",
            },
          ],
        });
        return;
      }
      res.status(500).json({
        success: false,
        errors: [
          {
            field: "image",
            message: "Erreur lors de l'upload de l'image",
          },
        ],
      });
      return;
    }
    next();
  });
};

const recipesImage: RequestHandler = (req, res, next) => {
  const apiUrl = process.env.SERVER_URL;
  try {
    if (req.file) {
      req.body.image = `${apiUrl}/assets/images/${req.file.filename}`;
    } else {
      req.body.image = `${apiUrl}/assets/images/default_dish.jpg`;
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default { imageUpload, recipesImage };
