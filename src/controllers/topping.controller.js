const pool = require("../db");

async function getAllToppings(req, res) {
  try {
    const result = await pool.query(
      "SELECT * FROM restaurant_topping ORDER BY restaurant_topping_name ASC"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching toppings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { getAllToppings };
