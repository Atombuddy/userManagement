import jwt from "jsonwebtoken"

export const auth=async (req,res,next)=>{
    try {
        const user=req.cookies.savedUser
        if(user){
            const token=req.cookies.savedUser
            const isCustomAuth=token.length<500
            let decodedData
            
            if(token && isCustomAuth){
                decodedData=jwt.verify(token,"test")
                req.userId=decodedData?.id
            }
            else{
                decodedData=jwt.decode(token)
                req.userId=decodedData?.sub
            }    
            next()
        }
        else{
            res.status(401).json({message:"Sign In again"})
        }
    } catch (error) {
        console.log(error)
    }
}