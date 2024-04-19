import * as dao from './dao.js';
import express from 'express';

function goalRoutes(app) {
    const router = express.Router();

    // Endpoint to get all goals for a specific user
    router.get("/:userId/goals", async (req, res) => {
        try {
            const goals = await dao.getAllGoals(req.params.userId);
            res.json(goals);
        } catch (error) {
            console.error("Error fetching goals:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    router.post("/:userId/goals", async (req, res) => {
        console.log('Received goal data:', req.body);
        try {
            const newGoalId = await dao.setNewGoal(req.body, req.params.userId);
            res.json({ message: "Goal created successfully", id: newGoalId });
        } catch (error) {
            console.error("Error creating goal:", error);
            res.status(500).json({ error: error.message });
        }
    });
    
    
    

    app.use("/api/users", router);
}

export default goalRoutes;
