import express from "express";
import URL from "../models/url.js";

const router=express.Router();

router.get("/", async (req,res)=>{
  console.log(req.user)
  if(!req.user) return res.redirect("/login")
  const allurls=await URL.find({createdBy:req.user._id})
  console.log(allurls)
  res.render("home",{urls:allurls})
})

router.get('/signup',(req,res)=>{
  res.render("signup");
})

router.get('/login',(req,res)=>{
  res.render("login");
})

export default router;