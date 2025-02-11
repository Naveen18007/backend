import express from 'express'
import { addroute, removeroute, updateroute } from '../controllers/buscontroller.js'
import adminmiddleware from '../middleware/admin.js'
const Routerouter=express.Router()


Routerouter.post("/add",adminmiddleware,addroute)
Routerouter.post("/remove",adminmiddleware,removeroute)
Routerouter.post("/update",adminmiddleware,updateroute)

export default Routerouter;