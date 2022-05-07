import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.js"
import mongoose from "mongoose"

export const signin=async(req,res)=>{
    const {email,password}=req.body
    try {
        const existingUser=await User.findOne({email})
        if(!existingUser) return res.status(404).json({message:"User doesn't exist."})

        const isPasswordCorrect=await bcrypt.compare(password,existingUser.password)
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid Password."})

        const token=jwt.sign({email:existingUser.email,id:existingUser._id},"test",{expiresIn:"1h"})

        res.status(200).json({result:existingUser,token})

    } catch (error) {
        res.status(500).json({message:"Something went wrong."})
    }
}

export const signup=async(req,res)=>{
    const {email,password,name,gender,age,address,city,state,zip,image}=req.body
    try {
        const existingUser=await User.findOne({email})
        if(existingUser) return res.status(400).json({message:"User already exists."})
        const hashedPassword=await bcrypt.hash(password,10)

        const result=await User.create({email,password:hashedPassword,name,gender,age,address,city,state,zip,image})

        const token=jwt.sign({email:result.email,id:result._id},"test",{expiresIn:"1h"})
        res.cookie("savedUser",token);
        res.status(200).json({result,token})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong."})
    }
}

export const updateUser=async (req,res)=>{
    const {id}=req.params

    const user=req.body
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No User with that Id")
    const updatedUser=await User.findByIdAndUpdate(id,{...user,id},{new:true})
    res.json(updatedUser)
}

export const deleteUser=async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No User with that Id")
    await User.findByIdAndRemove(id)   ;
    res.json({message:"User Deleted Successfully"})
}

export const getUser=async (req,res)=>{
    const {id}=req.params
    const user=await User.findById(id)
    res.json(user)
}

export const getUsers=async(req,res)=>{
    const users=await User.find()
    res.json(users)
}