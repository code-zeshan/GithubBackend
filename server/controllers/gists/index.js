import express from "express";
import gistModel from "../../models/Gists/Gists.js";
import userModel from "../../models/User/User.js";

const router = express.Router();

router.get("/get/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    let gist = await gistModel.findOne({ _id: userParams });
    res.status(200).json({ gist });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/getall", async(req,res)=>{
    try {
       let gist = await gistModel.find({});
        res.status(200).json({gist});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.post("/create", async(req,res)=>{
    try {
        let userData = req.body;
        await gistModel.create(userData);
        res.status(200).json({msg:"Gist Created!"}) 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
});

router.put("/update/:id",async (req,res)=>{
    try {
        let userParams = req.params.id;
        let userData = req.body;
        await gistModel.updateOne({_id: userParams}, {$set:userData})
        res.status(200).json({msg: "Gist Updated Successfully!",userData})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.delete("/delete/:id",async(req,res)=>{
    try {
        let userParams = req.params.id;
        await gistModel.deleteOne({_id:userParams})
        res.status(200).json({msg: "Gist Deleted Successfully!"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.delete("/deleteall",async(req,res)=>{
    try {
        await gistModel.deleteMany({})
        res.status(200).json({msg: "All Gists Deleted!"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})


export default router
