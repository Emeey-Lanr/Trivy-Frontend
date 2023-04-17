import express from "express"
const route = express.Router()
import {signup, signin} from "../UserController/userController"

route.post("/signup", signup)
route.post("/signin",signin)




module.exports = route


