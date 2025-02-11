import express from "express"
import { addbus,removebus, updatebus} from "../controllers/buscontroller.js"
import multer from "multer"
import adminmiddleware from "../middleware/admin.js";
const busrouter=express.Router();



// Image storage Engine
const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload =multer({storage:storage})
busrouter.post("/add",upload.single("image"),addbus)
busrouter.post("/remove",adminmiddleware,removebus)
busrouter.post("/update",adminmiddleware,updatebus)



export default busrouter