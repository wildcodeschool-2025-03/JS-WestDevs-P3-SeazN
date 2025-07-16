import multer from "multer"
import path from "node:path"
import crypto from "node:crypto"

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "public/images/")
  },
  filename(req, file, callback) {
    const base = path.basename(file.originalname).toLowerCase();
    const ext = path.extname(file.originalname).toLowerCase();
    const id = crypto
  },
})