import pool from '../mysql.js';

export async function getAllGoals(userId) {
    const [goals] = await pool.query('SELECT * FROM goal WHERE user_id = ?', [userId]);
    return goals;
}

export async function setNewGoal(goalData, userId) {
    const { name, description, learningResource, endDate, status, category } = goalData;
    if (!name || !description || !endDate || !status || !category) {
        throw new Error('Missing required goal data');
    }

    // Assuming you fetch category_id as shown previously
    const [categoryRows] = await pool.query('SELECT id FROM category WHERE name = ?', [category]);
    if (categoryRows.length === 0) {
        throw new Error('Category not found');
    }
    const category_id = categoryRows[0].id;

    try {
        const [results] = await pool.execute('CALL SetNewGoal(?, ?, NOW(), ?, ?, ?, ?, @new_goal_id)', [
            name, description, endDate, status, category_id, userId
        ]);
        const [output] = await pool.query('SELECT @new_goal_id AS newGoalId');
        return output[0].newGoalId;
    } catch (error) {
        throw error;
    }
}

