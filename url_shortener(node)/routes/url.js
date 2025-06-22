import express from "express";
import { generateNewUrl,handleAnalytics } from "../controllers/url.js";
import URL from "../models/url.js";

const router=express.Router();

router.get('/',async (req,res)=>{
    console.log(req.user)
    const allurls=await URL.find({createdBy:req.user._id});
    console.log(allurls);
    return res.render('home',{
      urls:allurls
    })
})

router.post('/',generateNewUrl)

router.get('/analytics/:shortId',handleAnalytics)


export default router;