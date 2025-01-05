import express from "express"
import config from "config"
import "./utils/dbConnect.js"
import publicRouter from "./controllers/public/index.js"
import repoRouter from "./controllers/repo/index.js"
import userRouter from "./controllers/user/index.js"
import gistRouter from "./controllers/gists/index.js"
import authMiddleware from "./middleware/auth.js"

const app = express();

const PORT  = config.get("PORT") || 5001

app.use(express.json());

app.get("/",(req,res)=>{
    try {
       res.status(200).json({msg:"The Server is Running!"}) 
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})

app.use("/api/public", publicRouter);
app.use("/api/repo", repoRouter);
app.use("/api/user", userRouter);
app.use("/api/gist", gistRouter);
app.use(authMiddleware)


app.listen(PORT,()=>{
    console.log("The Server is Running!");
})