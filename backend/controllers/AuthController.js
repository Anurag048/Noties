import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signup = async (req,res) =>{
    try{
        const {username, email, password} = req.body;
        const user = await userModel.findOne({email});
        if(user){
            return res.status(400).json({message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({message: 'User created successfully', success:true, username: newUser.username})
    }catch(err){
        console.error("Signup error:", err);
        res.status(500).json({message: 'Something went wrong', success:false, error: err.message});
    }
}

const login = async (req,res) =>{
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(403).json({message: 'No User exists',success:false});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(403).json({message: 'Invalid credentials', success:false});
        }
        const token = jwt.sign({email:user.email,id:user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({message: 'Login successful', success:true, jwtToken: token, username: user.username});
    }catch(err){
        res.status(500).json({message: 'Something went wrong', success:false});
    }
}

export default {
    signup,
    login
}