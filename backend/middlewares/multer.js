// middlewares/multer.js
import multer from "multer";

// ✅ Use memory storage instead of disk storage
const storage = multer.memoryStorage();

export const upload = multer({ storage });
