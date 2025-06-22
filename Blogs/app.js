import express from "express";
import {connectMongoose} from "./connect.js"
import cookieParser from "cookie-parser"
import path from "path"
import env from "dotenv"

import Blog from "./models/blog.js";
import userRoute from "./routes/user.js"
import blogRoute from "./routes/blog.js"
import { checkForAuthCookie } from "./middleware/auth.js";

env.config()

const app=express();
const port=process.env.PORT || 3000; //adding the environment variable for cloud deployment...

connectMongoose(process.env.MONGO_URL).then(() =>
    console.log("connected to mongoose")
);

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthCookie("token"))
app.use(express.static(path.resolve("./public")))

app.use("/user",userRoute)
app.use("/blog",blogRoute)

app.get('/',async (req,res)=>{
    var blogs=await Blog.find({}).sort({createdAt:-1}) // newer posts
    console.log(req.user)
    res.render("home",{
        user:req.user,
        blogs
    })
})

app.get('/userBlogs',async (req,res)=>{
    if(req.user) var blogs=await Blog.find({createdBy:req.user._id}).sort({createdAt:-1});
    res.render("home",{
        user:req.user,
        blogs
    })
})

app.listen(port,()=>console.log(port + " is running"))