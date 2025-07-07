const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test query
async function testConnection() {
  try {
    const client = await pool.connect();
    const res = await client.query("SELECT * FROM restaurant_topping");
    console.log("Rows retrieved: " + res.rows.length)
    for(let i = 0; i < res.rows.length; i++){
        console.log("Database connection succesful at: " + res.rows[i].restaurant_topping_name);
    }
    client.release()
  } catch (err) {
    console.error("Error connecting to the database: ", err);
  }
}

module.exports = pool;
