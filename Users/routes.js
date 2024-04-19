import * as dao from './dao.js';
import express from "express";

// let currentUser = null; // current logged in user

function userRoutes(app) {
    const router = express.Router();

    router.get("/", async (req, res) => {
        try {
            const users = await dao.findAllUsers();
            res.json(users);
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    router.get("/:id", async (req, res) => {
        try {
            const user = await dao.findUserById(req.params.id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });


    router.post("/login", async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await dao.findUserByEmail(email, password);
            if (user) {
                res.json({ message: "Login successful", user });
            } else {
                res.status(401).json({ message: "Invalid email or password" });
            }
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    

    router.post("/register", async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body;
            const userId = await dao.registerUser({
                firstName,
                lastName,
                email,
                password  // Directly using the provided password without hashing
            });
            res.status(201).json({ message: "User registered successfully", id: userId });
        } catch (error) {
            console.error("Registration error:", error);
            res.status(500).json({ message: "Internal server error", detail: error.message });
        }
    });
    
    

    router.post("/signout", (req, res) => {
        res.json({ message: "Signout successful" });
    });

    router.get("/account/:id", async (req, res) => {
        try {
            const user = await dao.findUserById(req.params.id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error("Error fetching account details:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
    

    router.use((req, res, next) => {
        console.log(`Incoming request: ${req.method} ${req.path}`);
        next();
    });

    app.use("/api/users", router);
}

export default userRoutes;