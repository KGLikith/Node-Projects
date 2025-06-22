import { getUser } from "../service/auth.js";

export async function restrictToLoggedIn(req,res,next){
    const userId=req.cookies.uuid;
    
    if(!userId) return res.redirect('/login')
    const user=getUser(userId);
    if(!user) return res.redirect('/login')
    console.log(user)
    req.user=user;
    next();
}

export async function checkAuth(req,res,next){
    // token authentication....
    // like first the token obtained from the login page shd be given as header as bearer token... only then it works...
    // (
    //     headers:{
    //         Authorization:`Bearer ${yourBearerToken}` //default one for authourisation... syntax...   ///in postman .. can be given directly
    //       },
    // )
    // console.log(req.headers);
    // const userid=req.header["authorization"]
    // const token= userid.split("Bearer ")[1]               if we are using bearer token for authentication...
    // const user=getuser(token)
    const userId=req.cookies.uuid;
    const user=getUser(userId);
    req.user=user;
    next();
}