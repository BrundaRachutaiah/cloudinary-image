import  path  from "path"
import multer from "multer"
import { fileTypeValidator } from "../utils/fileTypeValidator.js"
import { UNEXPECTED_FILE_TYPE } from "../constants/file.js"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const isFailTypeAllowed = fileTypeValidator(file)
        console.log(isFailTypeAllowed)
        if (isFailTypeAllowed) {
            return cb(null, true)
        } else {
            cb(new multer.MulterError(UNEXPECTED_FILE_TYPE.code, UNEXPECTED_FILE_TYPE.message))
        }
    }
}).array("file", 1)

export default upload;