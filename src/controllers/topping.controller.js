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
      "INSERT INTO restaurant_topping (restaurant_topping_name, price) VALUES ($1, $2) RETURNING *",
      [values["topping_name"],values["topping_price"]]
    )

    console.log(result.rows[0])
    res.status(201).json({message: "Topping created succesfully"})
  } catch (error) {
    console.error("Error posting topping:", error)
    res.status(500).json({error: "Internal server error", detail: error.detail})
  }

}

async function getToppingById(req, res){
  try {
    const id = req.params.id
    const result = await pool.query(
      "SELECT * FROM restaurant_topping WHERE restaurant_topping_id = $1",
      [id]
    )
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({error: "Internal server error"})
  }
}

async function updateToppingById(req, res){
  try {
    const id = req.params.id
    const values = req.body

    const result = await pool.query(
      "UPDATE restaurant_topping SET restaurant_topping_name = $1, price=$2 WHERE restaurant_topping_id = $3 RETURNING *",
      [values["topping_name"], values["topping_price"], id]
    )
    console.log(result.rows[0])
    res.status(204).json({message: "Topping updated succesfully"})
  } catch (error) {
    res.status(500).json({error: "Internal server error", detail: error.detail})
  }
}

module.exports = { getAllToppings, postTopping, getToppingById, updateToppingById};
