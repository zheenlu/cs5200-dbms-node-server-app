import pool from '../mysql.js';

export async function fetchAllGoals(userId) {
    const [goals] = await pool.query('SELECT * FROM goal WHERE user_id = ?', [userId]);
    return goals;
}


export async function setNewGoal(goalData, userId) {
    const { name, description, learningResource, endDate, status, category } = goalData;

    // Find or create resource
    const [resource] = await pool.query('SELECT id FROM resource WHERE link = ?', [learningResource]);
    let resourceId;
    if (resource.length) {
        resourceId = resource[0].id;
    } else {
        const [insertResource] = await pool.query('INSERT INTO resource (name, link) VALUES (?, ?)', ['Resource Name', learningResource]);
        resourceId = insertResource.insertId;
    }

    // Find category id
    const [categoryRow] = await pool.query('SELECT id FROM category WHERE name = ?', [category]);
    if (!categoryRow.length) throw new Error('Category not found');
    const categoryId = categoryRow[0].id;

    // Insert goal with resource and category id
    const [result] = await pool.query('INSERT INTO goal (name, description, start_date, end_date, status, category_id, resource_id, user_id) VALUES (?, ?, NOW(), ?, ?, ?, ?, ?)', [name, description, endDate, status, categoryId, resourceId, userId]);
    return result.insertId;
}



export async function deleteGoal(goalId) {
    // Calling a stored procedure to delete a goal
    await pool.query('CALL DeleteGoal(?)', [goalId]);
}


export async function updateGoal(goalId, goalData) {
    const { name, description, end_date, status, category_id, resource_id } = goalData;
    try {
        const [result] = await pool.execute('CALL UpdateGoal(?, ?, ?, ?, ?, ?, ?)', [
            goalId, name, description, end_date, status, category_id, resource_id
        ]);
        return result;
    } catch (error) {
        throw new Error(`Failed to update goal: ${error.message}`);
    }
}
