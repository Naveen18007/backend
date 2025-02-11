import express from 'express'
import { bookbus,cancelbus, listbus} from '../controllers/bookingcontroller.js'
import authmiddleware from '../middleware/auth.js'
const bookrouter=express.Router()

bookrouter.post("/listbus",authmiddleware,listbus)
bookrouter.post("/book",authmiddleware,bookbus)
bookrouter.post("/cancel",authmiddleware,cancelbus)

export default bookrouter