import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import adminModel from '../models/adminmodel.js'


// login admin
const loginadmin=async(req,res)=>{
    const {email,password}=req.body
    try {
        const admin=await adminModel.findOne({email})
        if(!admin){
            return res.json({success:false,message:"Admin does not exist"})
        }
        const ismatch = await bcrypt.compare(password,admin.password)
        if(!ismatch){
            return res.json({success:false,message:"Invalid credentials"})
        }
        const token=createToken(admin._id);
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:"Error"})
    }
}
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register admin
const registeradmin=async(req,res)=>{
    const {name,password,email}=req.body;
    try {
        const exists=await adminModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"Admin already exists"})
        }
        //validating email format & strong password
        if (!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }
        if (password.length<8){
            return res.json({suscess:false,message:"Please enter a strong password"})
        }
        const salt=await bcrypt.genSalt(10)
        const hashedpassword=await bcrypt.hash(password,salt);

        const newAdmin=new adminModel({
            name:name,
            email:email,
            password:hashedpassword
        })
        const admin=await newAdmin.save()
        const token = createToken(admin._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {loginadmin,registeradmin}