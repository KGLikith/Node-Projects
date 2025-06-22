import { Router} from "express"
import Blog from "../models/blog.js"
import Comment from "../models/comment.js"

import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + '-' + file.originalname;
      console.log(filename)
      cb(null, filename)
    }
})

const upload = multer({ storage: storage })

const router=Router();

router.get("/add-new",(req,res)=>{
    return res.render("addBlog",{
        user:req.user
    })
})

router.post("/",upload.single('coverImage'),async (req,res)=>{
    const { title,body }=req.body;
    const blog=await Blog.create({
        title,
        body,
        coverImage:`/uploads/${req.file.filename}`,
        createdBy:req.user._id
    })
    return res.redirect(`/blog/${blog._id}`)
})

router.get('/:id',async (req,res)=>{
    const blog=await Blog.findById(req.params.id).populate("createdBy") //this will refer to the ref with the id...
    const comments=await Comment.find({blogId:req.params.id}).populate("createdBy")
    console.log(comments)
    res.render('blog',{
        user:req.user,
        blog,
        comments:comments
    })
})

router.post('/comment/:blogid',async(req,res)=>{
    const comment=await Comment.create({
        content:req.body.content,
        createdBy:req.user._id,
        blogId:req.params.blogid
    })
    return res.redirect(`/blog/${req.params.blogid}`)
})

export default router