const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.auth = async (req,res,next) =>{
try{
         // Extract Token 
         const token = req.cookies.token 
                      || req.body.token  
                      || req.header("Authorisation").replace("Bearer ","");

        // If token missing 
         
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token Missing"
            })
        }

        // Verify token 
        try{
          const decode = jwt.verify(token,process.env.JWT_SECRET);
          console.log(decode);
          req.user = decode;
        }
        catch(error){
                  return res.status(400).json({
                    success:false,
                    message:"Token invalid"
                  })
        }
        
         next();

}
catch(error){
    console.log(error.message);
             return res.status(400).json({
                success:false,
                message:"Something wrong in validating the token"
             })
}
}


// Is student 

exports.isStudent = async(req,res,next) =>{
    try{
                  if(req.user.accountType!=='Student'){
                    return res.status(400).json({
                        success:false,
                        message:"This is for Student, Other is not allowed"
                    })
                  }
                  next();
    } 
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User Role can not be verified"
        })
    }
}


// _--------------- IsInstructor _______-------------------

exports.isInstructor = async(req,res,next) =>{
    try{
                  if(req.user.accountType!=='Instructor'){
                    return res.status(400).json({
                        success:false,
                        message:"This is for Instructor, Other is not allowed"
                    })
                  }
                  next();
    } 
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User Role can not be verified"
        })
    }
}


// ------------------ IsAdmin------------------

exports.isAdmin = async(req,res,next) =>{
    try{
                  if(req.user.accountType!=='Admin'){
                    return res.status(400).json({
                        success:false,
                        message:"This is for Admin, Other is not allowed"
                    })
                  }
                  next();
    } 
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User Role can not be verified"
        })
    }
}
