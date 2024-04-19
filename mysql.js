import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',      
    user: 'root',   
    password: 'password', 
    database: 'cs5200_project_spring24', 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;