import userModel from "../models/usermodel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//login user
const loginuser = async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await userModel.findOne({email})
        if(!user){
            return res.json({sucess:false,message:"User does not exist"})
        }
        const ismatch = await bcrypt.compare(password,user.password)
        if(!ismatch){
            return res.json({success:false,message:"Invalid credentials"})
        }
        const token=createToken(user._id);
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:"Error"})
    }
}
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register user
const registeruser=async(req,res)=>{
    const {name,password,email}=req.body;
    try {
        //checking if user already exists
        const exists=await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }
        //validating email format & strong password
        if (!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }
        if (password.length<8){
            return res.json({suscess:false,message:"Please enter a strong password"})
        }

        //hashing user password
        const salt=await bcrypt.genSalt(10)
        const hashedpassword=await bcrypt.hash(password,salt);

        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedpassword
        })
        const user=await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {loginuser,registeruser}