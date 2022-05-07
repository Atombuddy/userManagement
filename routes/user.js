import express from "express"
import {signin,signup,updateUser,deleteUser,getUser,getUsers} from "../controllers/user.js"
import { auth } from "../middleware/auth.js"

const router=express.Router()

router.post("/signin",signin)
router.post("/signup",signup)
router.patch("/update/:id",auth,updateUser)
router.delete("/delete/:id",auth,deleteUser)
router.get("/getuser/:id",auth,getUser)
router.get("/getusers",auth,getUsers)

export default router