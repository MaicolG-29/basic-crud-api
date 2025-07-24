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

async function postTopping(req, res){
  try {
    const values = req.body
    
    const result = await pool.query(
      "INSERT INTO restaurant_topping (restaurant_topping_name, price) VALUES ($1, $2)",
      [values["topping_name"],values["topping_price"]]
    )

    res.status(201).json({message: "Topping created succesfully"})
  } catch (error) {
    console.error("Error posting topping:", error)
    res.status(500).json({error: "Internal server error", detail: error.detail})
  }

}

module.exports = { getAllToppings, postTopping};
