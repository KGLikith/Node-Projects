import users from "../models/user.js";
import { v4 as uuidv4 } from 'uuid';
import { getUser,setUser } from "../service/auth.js";

export async function usersingup(req,res){
    const { name,email,password} = req.body;
    const user=await users.create({
        name,
        email,
        password,
    }).catch(err=>console.log("user already exists"))

    console.log(user);

    // const sessionid=uuidv4();
    // setUser(sessionid,user);
    // res.cookie("uuid",sessionid)
    const token=setUser(user); //jwt
    res.cookie("uuid",token,{maxAge:1000*60*60*24})

    return res.redirect("/")
}

export async function loginsetup(req,res){
    const {email,password }=req.body;
    const user=await users.findOne({
        email,password
    })
    if(!user){
        return res.redirect("/login",)
    }
    
    // const sessionid=uuidv4(); //not required for jwt... 
    // setUser(sessionid,user);
    const token=setUser(user);
    // return res.json({token})  for bearer tokens as an example... only valid in checkAuth()
    res.cookie("uuid",token,{maxAge:1000*60*60*24})
    
    return res.redirect("/")
}