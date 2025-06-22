import express from "express";
import URL from "./models/url.js";
import urlRoute from "./routes/url.js";
import staticRouter from "./routes/staticRouter.js"
import { connectMongoose } from "./connect.js";
import userRoute from "./routes/user.js"
import cookieParser from "cookie-parser"
import { restrictToLoggedIn,checkAuth } from "./middleware/auth.js";

connectMongoose("mongodb://localhost:27017/shorturl").then(() =>
  console.log("connected to mongoose")
);

const app = express();
const port = 3000;
app.set("view engine","ejs");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/",checkAuth,staticRouter);
app.use("/url",restrictToLoggedIn, urlRoute);
app.use("/user",userRoute)

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: { //this is used to push the data...
        visitHistory: {
            timeStamp:new Date(Date.now()).toString()
        }
      },
    }
  );
  if(!entry) {console.log("error")  
    return res.json("wrong shortId")
  }
  res.redirect(entry.redirectURL)
});


app.listen(port, () => console.log(port + " running"));
