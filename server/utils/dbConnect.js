import mongoose from "mongoose";
import express from "express"
import config  from "config"

async function dbConnect(){
    try {
        let dbURL = config.get("DB_URL");
        await mongoose.connect(dbURL);
        console.log("Database Connected!");
    } catch (error) {
        console.log(error);
    }
}

dbConnect();