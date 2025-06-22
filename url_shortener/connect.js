import mongoose from "mongoose";

export async function connectMongoose(url){
    await mongoose.connect(url)
}