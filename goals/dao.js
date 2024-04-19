import pool from '../mysql.js';

export async function fetchAllGoals(userId) {
    const [goals] = await pool.query('SELECT * FROM goal WHERE user_id = ?', [userId]);
    return goals;
}


export async function setNewGoal(goalData, userId) {
    const { name, description, learningResource, endDate, status, category } = goalData;

    const [resource] = await pool.query('SELECT id FROM resource WHERE link = ?', [learningResource]);
    let resourceId;
    if (resource.length) {
        resourceId = resource[0].id;
    } else {
        const [insertResource] = await pool.query('INSERT INTO resource (name, link) VALUES (?, ?)', ['Resource Name', learningResource]);
        resourceId = insertResource.insertId;
    }

    const [categoryRow] = await pool.query('SELECT id FROM category WHERE name = ?', [category]);
    if (!categoryRow.length) throw new Error('Category not found');
    const categoryId = categoryRow[0].id;

    const [result] = await pool.query('INSERT INTO goal (name, description, start_date, end_date, status, category_id, resource_id, user_id) VALUES (?, ?, NOW(), ?, ?, ?, ?, ?)', [name, description, endDate, status, categoryId, resourceId, userId]);
    return result.insertId;
}



export async function deleteGoal(goalId) {
    await pool.query('CALL DeleteGoal(?)', [goalId]);
}


export async function updateGoal(goalId, goalData) {
    const { name, description, start_date, end_date, status, category_id, resource_link } = goalData;
    try {
        await pool.execute('CALL UpdateGoal(?, ?, ?, ?, ?, ?, ?, ?)', [
            goalId, name || null, description || null, start_date || null, end_date || null, status || null, category_id || null, resource_link || null
        ]);
    } catch (error) {
        throw new Error(`Failed to update goal: ${error.message}`);
    }
}

export async function fetchGoalsWithDaysLeft() {
    try {
        const [results] = await pool.query('CALL FetchGoalsWithDaysLeft()');
        return results[0];
    } catch (error) {
        throw new Error(`Database error: ${error.message}`);
    }
}

export async function addStudySession(sessionData, userId) {
    const { start_time, end_time, session_length, goal_for_session } = sessionData;
    await pool.query('CALL AddStudySession(?, ?, ?, ?, ?)', [
        userId, start_time, end_time, session_length, goal_for_session
    ]);
}

export async function fetchStudySessions(userId) {
    const [sessions] = await pool.query('CALL FetchStudySessions(?)', [userId]);
    return sessions[0]; 
}