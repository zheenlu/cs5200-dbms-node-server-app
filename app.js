import express from 'express';
import userRoutes from './Users/routes.js';
import cors from 'cors';
import mongoose from "mongoose";

const app = express();
app.listen(4000);

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/kanbas")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


userRoutes(app);