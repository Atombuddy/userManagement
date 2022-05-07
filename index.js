import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.js"
import cookieParser from "cookie-parser";

const app=express()

app.use(cookieParser());

app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Welcome")
})
app.use("/user",userRoutes)

const CONNECTION_URL="mongodb+srv://user:user123@cluster0.81nqv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const PORT =process.env.PORT || 5000

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log(`Server running on ${PORT}`)))
.catch((error)=>console.log(error.message))
