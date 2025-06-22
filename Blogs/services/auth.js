import jwt from "jsonwebtoken"

const secret="BlogsForDemo"

export function createToken(user){
    const payLoad={
        _id:user._id,
        email:user.email,
        name:user.name,
        profileImage:user.profileImage,
        role:user.role
    }
    const token = jwt.sign(payLoad,secret)
    return token;
}  

export function validateToken(token){
    const payLoad=jwt.verify(token,secret);
    return payLoad
}

