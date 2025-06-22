import { nanoid } from "nanoid";
import URL from "../models/url.js";

export async function generateNewUrl(req, res) {
  const shortId = nanoid(8); // this will give random characters of length 8 for shortId....
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required.." });
  const url=await URL.findOne({createdBy:req.user._id,redirectURL:body.url});
  const urls=await URL.find({createdBy:req.user._id})
  if(url){
    console.log(url)
    return res.render('home',{
      error:"The shortId already exists",
      id: url.shortId,
      urls
    })
  }
  
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id //this is from the middleware which has req.user as user 
  }).catch(err=>console.log(err))
  const URLS=await URL.find({createdBy:req.user._id})
  
  res.render('home',{
    id: shortId,
    urls:URLS
  })
}

export async function handleAnalytics(req, res) {
  const shortId = req.params.shortId;
  const url = await URL.findOne({
    shortId,
  });
  if(!url) {return res.json({error:"wrong shortId"})}
  return res.json({ totalClicks: url.visitHistory.length, analytics: url.visitHistory });
}
