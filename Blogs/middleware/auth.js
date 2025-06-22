import { validateToken } from "../services/auth.js";


export function checkForAuthCookie(cookie){
    return (req,res,next)=> {
        const token=req.cookies[cookie]

        if(!token){
           return next();
        }
        try{
            const userPayLoad=validateToken(token)
            req.user=userPayLoad;
        }catch(err){
            
        }
        return next()
    }
}