import pool from '../mysql.js';


export async function findAllUsers() {
  const [users] = await pool.query('SELECT * FROM user');
  return users;
}

export async function findUserByEmail(email, password) {
  const [results] = await pool.execute('CALL UserLogin(?, ?, @user_id)', [email, password]);
  const [userDetails] = await pool.query('SELECT @user_id AS userId');
  if (userDetails[0].userId) {
      return results[0];
  }
  return null; 
}

export async function registerUser(userData) {
  const { firstName, lastName, email, password } = userData;
  try {
      const [result] = await pool.execute('CALL RegisterUser(?, ?, ?, ?, @output_user_id)', [firstName, lastName, email, password]);
      const [output] = await pool.query('SELECT @output_user_id AS userId');
      return output[0].userId;
  } catch (error) {
      throw error;
  }
}


export async function findUserById(id) {
  const [results] = await pool.execute('CALL GetUserByID(?)', [id]);
  return results[0][0]; 
}

