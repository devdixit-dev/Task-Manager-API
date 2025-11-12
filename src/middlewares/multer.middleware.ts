import multer from "multer";
import path from "path";
import fs from 'fs';

const uploadDir = path.join(process.cwd(), "src", "uploads", "user", "avatars");
if(!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueFilename = `${(req as any)?.user?._id}` + '-' + file.originalname
    cb(null, uniqueFilename);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB max
  }
});

// in future - security concern
// add allowed ext array
// check file with this array, if file ext having ext in the array, the save it
// else throw err like...file format not supported

export default upload;