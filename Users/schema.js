import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    firstName: { type: String }, 
    lastName: { type: String }, 
    email: { type: String, required: true },
    password: { type: String, required: true },
    registrationDate: { type: Date }
},
    {collection: "users"}
);

export default loginSchema;