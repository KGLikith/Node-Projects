import express from "express"
import Users from "../models/user.js";
import bcrypt from "bcrypt"
import users from "../models/user.js";
import { createToken } from "../services/auth.js";

const router=express.Router();

router.get("/signin",(req,res)=>{
    return res.render("signin")
})

router.get("/signup",(req,res)=>{
    return res.render("signup")
})

router.post('/signup',async (req,res)=>{
    const { name,email,password } = req.body;
    if(!name || !email || !password) return res.render("signup",{error:"Please enter all the fields"})
    const user=await Users.findOne({email:email})
    console.log(user)
    if(user) return res.render("signup",{error:"The email address already exists"})

    const newuser = await Users.create({
        name,
        email,
        password
    })
    const token= createToken(newuser)
    return res.cookie("token",token).redirect("/");
})

router.post('/signin',async (req,res)=>{
    const { password,email } = req.body;
    if(!email || !password) return res.render("signin",{error:"Please enter all the fields"})
    // const user=await Users.findOne({email})
    // if(!user) return res.render("signin",{error:"User not found"})

    // console.log(user)
    // const hashedPass=user.password;
    // const result =await bcrypt.compare(password,hashedPass)
    // console.log(password)
    // console.log(result)

    // if(!result) return res.render("signin",{error: "Password is incorrect"})

    // return res.redirect("/")
    
    const user_token=await users.matchPasswordAndGenerateToken(email,password)
    
    if(!user_token) return res.render("signin",{error:"Wrong Email or Password"})
    res.cookie("token",user_token).redirect("/")

})

router.get('/signout',(req,res)=>{
    res.clearCookie('token').redirect('/')
})

export default router