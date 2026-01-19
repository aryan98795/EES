import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/zip",
      "application/x-zip-compressed",
      "text/plain",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      const err = new Error("Invalid file type");
      err.code = "LIMIT_FILE_TYPE";
      return cb(err, false);
    }

    cb(null, true);
  },
});

export default upload;
