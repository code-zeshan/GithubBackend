import express from "express";
import repoModel from "../../models/Repo/Repo.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    let userData = req.body;
    await repoModel.create(userData);
    res.status(200).json({ msg: "Repository Created!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    let repo = await repoModel.findOne({ _id: userParams });
    res.status(200).json({ repo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    let repo = await repoModel.find({});
    res.status(200).json({ repo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    let userData = req.body;
    await repoModel.updateOne({ _id: userParams }, { $set: userData });
    res.status(200).json({ msg: "Repo Updated!", userData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
});

router.delete("/delete/:id", async(req,res)=>{
    try {
     let userParams = req.params.id;
     await repoModel.deleteOne({_id: userParams});
     res.status(200).json({msg: "Repo Deleted!"})   
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
});

router.delete("/deleteall", async(req,res)=>{
    try {
        let repo = await repoModel.deleteMany({})
        res.status(200).json({msg:"repo deleted!"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})


export default router;
