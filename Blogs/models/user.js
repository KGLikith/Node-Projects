import mongoose from "mongoose"
import bcrypt from "bcrypt"
// import { createHmac,randomBytes } from "crypto";
import { createToken } from "../services/auth.js";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    profileImage:{
        type:String,
        default: '/public/images/default.png'
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:"USER"
    }

},{timestamps:true})

userSchema.pre('save', async function(next) { // always use function rather than arrow function (this doesn't work)
    const user = this;

    if (!user.isModified('password')) return next();
    const salt = 10

    user.password = await bcrypt.hash(user.password, salt);
    user.salt=salt;
    next();
});

userSchema.static("matchPasswordAndGenerateToken",async function(email,password){
    const user=await this.findOne({email:email});
    if(!user) return null

    const hashedPass=user.password;
    const result =await bcrypt.compare(password,hashedPass)
    console.log(result)
    if(!result) return null

    // instead of sending the user info... send the token...
    const token = createToken(user)
    return token;
})

const users=mongoose.model('user',userSchema)
export default users