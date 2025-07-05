const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { error } = require("console");
const mime = require("mime");

// Ensure uploads directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  console.log("File filter - Field:", file.fieldname, "MIME:", file.mimetype);

  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type: ${file.mimetype}`), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 2, // Maximum 2 files
  },
});

const retrieve = (filename) => {
  const filePath = path.join(uploadDir, filename);
  const mimeType = mime.default.getType(filePath);
  if (fs.existsSync(filePath)) {
    return { data: fs.readFileSync(filePath), mimeType };
  } else {
    return null;
  }
};

module.exports = { upload, retrieve };
