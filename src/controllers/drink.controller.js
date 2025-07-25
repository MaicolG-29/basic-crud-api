const pool = require("../db");

async function getAllDrinks(req, res) {
  try {
    const result = await pool.query("SELECT * FROM restaurant_drink");

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getDrinkById(req, res) {
  try {
    const id = req.params.id;

    const result = await pool.query(
      "SELECT * FROM restaurant_drink WHERE restaurant_drink_id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Drink not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", detail: error.detail });
  }
}

async function postDrink(req, res) {
  try {
    const { drink_name, drink_price } = req.body;

    if (!drink_name || typeof drink_price !== "number") {
      return res.status(400).json({ error: "Drink data invalid" });
    }

    const result = await pool.query(
      "INSERT INTO restaurant_drink (restaurant_drink_name, price) VALUES ($1, $2) RETURNING *",
      [drink_name, drink_price]
    );

    res.status(201).json({message: "Drink created succesfully", data: result.rows[0]});
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", detail: error.detail });
  }
}

async function updateDrinkById(req, res) {
  try {
    const id = req.params.id;
    const { drink_name, drink_price } = req.body;

    if (!drink_name || typeof drink_price !== "number") {
      return res.status(400).json({ error: "Drink data invalid" });
    }

    const result = await pool.query(
      "UPDATE restaurant_drink SET restaurant_drink_name = $1, price = $2 WHERE restaurant_drink_id = $3 RETURNING *",
      [drink_name, drink_price, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Drink not found" });
    }

    res.status(200).json({message: "Drink updated succesfully", data: result.rows[0]});
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", detail: error.detail });
  }
}

async function deleteDrinkById(req, res) {
  try {
    const id = req.params.id;

    const result = await pool.query(
      "DELETE FROM restaurant_drink WHERE restaurant_drink_id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Drink not found" });
    }

    res.status(200).json({message: "Drink deleted succesfully", data: result.rows[0]});
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", detail: error.detail });
  }
}

module.exports = {
  getAllDrinks,
  getDrinkById,
  postDrink,
  updateDrinkById,
  deleteDrinkById,
};
