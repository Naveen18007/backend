import express from "express"
import { loginadmin,registeradmin } from "../controllers/admincontroller.js"
const adminRouter =express.Router()

adminRouter.post("/register",registeradmin)
adminRouter.post("/login",loginadmin)

export default adminRouter;