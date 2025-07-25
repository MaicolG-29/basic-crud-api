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

async function postTopping(req, res) {
  try {
    const {topping_name, topping_price} = req.body;

    if (!topping_name || typeof topping_price !== "number") {
      return res.status(400).json({ error: "Invalid topping data" });
    }

    const result = await pool.query(
      "INSERT INTO restaurant_topping (restaurant_topping_name, price) VALUES ($1, $2) RETURNING *",
      [topping_name, topping_price]
    );
    res.status(201).json({message: "Topping created succesfully", data: result.rows[0]});
  } catch (error) {
    console.error("Error posting topping:", error);
    res
      .status(500)
      .json({ error: "Internal server error", detail: error.detail });
  }
}

async function getToppingById(req, res) {
  try {
    const id = req.params.id;
    const result = await pool.query(
      "SELECT * FROM restaurant_topping WHERE restaurant_topping_id = $1",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Topping not found" });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateToppingById(req, res) {
  try {
    const id = req.params.id;
    const { topping_name, topping_price } = req.body;

    if (!topping_name || typeof topping_price !== "number") {
      return res.status(400).json({ error: "Invalid topping data" });
    }

    const result = await pool.query(
      "UPDATE restaurant_topping SET restaurant_topping_name = $1, price=$2 WHERE restaurant_topping_id = $3 RETURNING *",
      [topping_name, topping_price, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Topping not found" });
    }
    res.status(200).json({message: "Topping updated succesfully", data: result.rows[0]});
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", detail: error.detail });
  }
}

async function deleteToppingById(req, res) {
  try {
    const id = req.params.id;

    const result = await pool.query(
      "DELETE FROM restaurant_topping WHERE restaurant_topping_id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Topping not found" });
    }
    res.status(200).json({message: "Topping deleted succesfully", data: result.rows[0]});
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", detail: error.detail });
  }
}

module.exports = {
  getAllToppings,
  postTopping,
  getToppingById,
  updateToppingById,
  deleteToppingById,
};
