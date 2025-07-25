const pool = require("../db");

async function getAllBases(req, res) {
  try {
    const result = await pool.query("SELECT * FROM restaurant_base");

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getBaseById(req, res) {
  try {
    const id = req.params.id;

    const result = await pool.query(
      "SELECT * FROM restaurant_base WHERE restaurant_base_id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Base not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", detail: error.detail });
  }
}

async function postBase(req, res) {
  try {
    const { base_name, base_price } = req.body;

    if (!base_name || typeof base_price !== "number") {
      return res.status(400).json({ error: "Base data invalid" });
    }

    const result = await pool.query(
      "INSERT INTO restaurant_base (restaurant_base_name, price) VALUES ($1, $2) RETURNING *",
      [base_name, base_price]
    );

    res.status(201).json({message: "Base created succesfully", data: result.rows[0]});
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", detail: error.detail });
  }
}

async function updateBaseById(req, res) {
  try {
    const id = req.params.id;
    const { base_name, base_price } = req.body;

    if (!base_name || typeof base_price !== "number") {
      return res.status(400).json({ error: "Base data invalid" });
    }

    const result = await pool.query(
      "UPDATE restaurant_base SET restaurant_base_name = $1, price = $2 WHERE restaurant_base_id = $3 RETURNING *",
      [base_name, base_price, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Base not found" });
    }

    res.status(200).json({message: "Base updated succesfully", data: result.rows[0]});
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", detail: error.detail });
  }
}

async function deleteBaseById(req, res) {
  try {
    const id = req.params.id;

    const result = await pool.query(
      "DELETE FROM restaurant_base WHERE restaurant_base_id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Base not found" });
    }

    res.status(200).json({message: "Base deleted succesfully", data: result.rows[0]});
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", detail: error.detail });
  }
}

module.exports = {
  getAllBases,
  getBaseById,
  postBase,
  updateBaseById,
  deleteBaseById,
};