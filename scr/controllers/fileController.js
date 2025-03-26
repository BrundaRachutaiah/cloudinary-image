
import { cloudinaryUpload } from "../service/fileService.js"
export const fileController = async (req,res) => {
    try {
        console.log(req.files)
        if(!req.files){
            return res.status(400).json({error: {description:"file not present in the request body."}})
        }

        if(Array.isArray(req.files) && req.files.length === 0){
            return res.status(400).json({error: {description: "No file uploaded."}})
        }

        const file = req.files[0]
        const response = await cloudinaryUpload(file)
        res.status(200).json({message: "file uploaded successfully", uploadResult: response})
    } catch (error) {
        res.status(500).json({message: error.message })
    }
}