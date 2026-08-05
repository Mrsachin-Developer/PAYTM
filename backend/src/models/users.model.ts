import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { string } from "zod";

const userSchema=new mongoose.Schema({
    username:{
        type:string,
        required:true,
        trim:true,
        lowercase:true,
    }
})

