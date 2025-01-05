import express from "express";
import config from "config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../../models/User/User.js";
import sendMail from "../../utils/sendEmail.js";
import sendSMS from "../../utils/sendSMS.js"

const router = express.Router();

const URL = config.get("SERVER_URL");
const JWT_SECRET = config.get("JWT_SECRET");

router.post("/register", async (req, res) => {
  try {
    const {
      type,
      user_view_type,
      site_admin,
      name,
      email,
      phone,
      password,
      company,
      blog,
      location,
      hireable,
      bio,
      twitter_username,
      public_repos,
      public_gists,
      followers,
      following,
    } = req.body;

    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "The User Already exists!" });
    }

    let hashPassword = await bcrypt.hash(password, 10);

    const emailToken = Math.random().toString(36).substring(2);
    const phoneToken = Math.random().toString(36).substring(2);

    console.log(emailToken, phoneToken);

    let newUser = {
      type,
      user_view_type,
      site_admin,
      name,
      email,
      phone,
      password: hashPassword,
      company,
      blog,
      location,
      hireable,
      bio,
      twitter_username,
      public_repos,
      public_gists,
      followers,
      following,
      userVerifyToken: {
        email: emailToken,
        phone: phoneToken,
      },
    };
    await userModel.create(newUser);

    // await sendMail({
    //     to:"1234zeshanahmed@gmail.com",
    //     subject: "Email Verification Link",
    //     html: `<p> Verify your email using the link below:</p>
    //     <a href = "${URL}/api/public/verifyemail/${emailToken}">Click on me</a>`
    // })

    // console.log(`${URL}/api/public/verifyemail/${emailToken}`);

    // await sendSMS({
    //     to:"+919381279869",
    //     body:`Verify: ${URL}/api/public/verifyphone/${phoneToken}`
    // })

    res
      .status(200)
      .json({ msg: "User registered, Please verify your Phone or Email" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/verifyemail/:token", async (req, res) => {
  try {
    const { token } = req.params;

    let user = await userModel.findOne({ "userVerifyToken.email": token });
    if (!user) {
      return res.status(500).json({ msg: "Invalid Token" });
    }
    user.userVerify.email = true;
    user.userVerifyToken.email = null;
    await user.save();

    res.status(200).json({ msg: "Email Verified!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/verifyphone/:token", async (req, res) => {
    try {
      const { token } = req.params;
  
      let user = await userModel.findOne({ "userVerifyToken.phone": token });
      if (!user) {
        return res.status(500).json({ msg: "Invalid Token" });
      }
      user.userVerify.phone = true;
      user.userVerifyToken.phone = null;
      await user.save();
  
      res.status(200).json({ msg: "Phone Verified!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error });
    }
  });

  router.post("/login", async (req,res)=>{
    try {
        const {email,password} = req.body;
        let user = await userModel.findOne({email})

        if(!user){
            return res.status(400).json({msg:"Invalid Credentials!"})
        }

        if(!user.userVerify.email){
            return res.status(400).json({msg: "Email not Verified!"})
        }

        if(!user.userVerify.phone){
            return res.status(400).json({msg: "Phone not Verified!"})
        }
        
        let match = await bcrypt.compare(password,user.password);

        if(!match){
            res.status(400).json({msg: "Invalid Credentials!"})
        }

        const token = jwt.sign({user}, JWT_SECRET, {expiresIn:"1h"});
        res.status(200).json({msg:"Logged In! Here's your Token:",token});

        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
  })

export default router;
