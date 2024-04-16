import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    firstName: { type: String }, 
    lastName: { type: String }, 
    email: { type: String, required: true },
    password: { type: String, required: true },
},
    {collection: "users"}
);

export default loginSchema;