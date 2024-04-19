import * as dao from './dao.js';
import express from 'express';

function goalRoutes(app) {
    const router = express.Router();

    // Endpoint to get all goals for a specific user
    router.get("/:userId/goals", async (req, res) => {
        try {
            const goals = await dao.fetchAllGoals(req.params.userId);
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

    router.delete("/:userId/goals/:goalId", async (req, res) => {
        try {
            await dao.deleteGoal(req.params.goalId); // Adjust based on how your deleteGoal function is implemented
            res.json({ message: "Goal deleted successfully" });
        } catch (error) {
            console.error("Error deleting goal:", error);
            res.status(500).json({ error: error.message });
        }
    });

    
    router.put("/:userId/goals/:goalId", async (req, res) => {
        try {
            await dao.updateGoal(req.params.goalId, req.body);
            res.json({ message: "Goal updated successfully" });
        } catch (error) {
            console.error("Error updating goal:", error);
            res.status(500).json({ error: error.message });
        }
    });
    
    router.get("/:userId/progress-reminders", async (req, res) => {
        try {
            const goalsWithDaysLeft = await dao.fetchGoalsWithDaysLeft(req.params.userId);
            res.json(goalsWithDaysLeft);
        } catch (error) {
            console.error("Error fetching progress reminders:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    router.post("/:userId/study-sessions", async (req, res) => {
        try {
            await dao.addStudySession(req.body, req.params.userId);
            res.status(201).json({ message: "Study session added successfully" });
        } catch (error) {
            console.error("Error adding study session:", error);
            res.status(500).json({ error: error.message });
        }
    });

    router.get("/:userId/study-sessions", async (req, res) => {
        try {
            const sessions = await dao.fetchStudySessions(req.params.userId);
            res.json(sessions);
        } catch (error) {
            console.error("Error fetching study sessions:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    
    
    

    app.use("/api/users", router);
}

export default goalRoutes;
