import jwt from "jsonwebtoken"
const secret ="Likith@2000"

// export function setUser(id,user){
//     return sessionIdtoUserMap.set(id,user)
// }


export function setUser(user){
    
    return jwt.sign({
        _id:user._id,
        email:user.email
    },secret)
}


// export function getUser(id){
//     return sessionIdtoUserMap.get(id)
// }


export function getUser(token){
    if(!token) return null
    try{

        return jwt.verify(token,secret);
    }catch(err){
        console.log(err)
        return null

    }
}

