import mongoose  from "mongoose";

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    gender:{type:String},
    age:{type:Number},
    address:{type:String},
    city:{type:String},
    state:{type:String},
    zip:{type:String},
    image:{type:String},
    id:{type:String}
})


export default mongoose.model("User",userSchema)
