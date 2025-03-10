import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'combinations_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

(async () => {
  const connectDb = await pool.getConnection();
  console.log('Connected to MySQL as id ' + connectDb.threadId);
})()

export default pool;