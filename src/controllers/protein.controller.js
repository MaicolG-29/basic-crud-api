const pool = require("../db");

async function getAllProteins(req, res) {
  try {
    const result = await pool.query("SELECT * FROM restaurant_protein");

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getProteinById(req, res) {
  try {
    const id = req.params.id;

    const result = await pool.query(
      "SELECT * FROM restaurant_protein WHERE restaurant_protein_id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Protein not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", detail: error.detail });
  }
}

async function postProtein(req, res) {
  try {
    const { protein_name, protein_price } = req.body;

    if (!protein_name || typeof protein_price !== "number") {
      return res.status(400).json({ error: "Protein data invalid" });
    }

    const result = await pool.query(
      "INSERT INTO restaurant_protein (restaurant_protein_name, price) VALUES ($1, $2) RETURNING *",
      [protein_name, protein_price]
    );

    res.status(201).json({message: "Protein created succesfully", data: result.rows[0]});
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", detail: error.detail });
  }
}

async function updateProteinById(req, res) {
  try {
    const id = req.params.id;
    const { protein_name, protein_price } = req.body;

    if (!protein_name || typeof protein_price !== "number") {
      return res.status(400).json({ error: "Protein data invalid" });
    }

    const result = await pool.query(
      "UPDATE restaurant_protein SET restaurant_protein_name = $1, price = $2 WHERE restaurant_protein_id = $3 RETURNING *",
      [protein_name, protein_price, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Protein not found" });
    }

    res.status(200).json({message: "Protein updated succesfully", data: result.rows[0]});
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", detail: error.detail });
  }
}

async function deleteProteinById(req, res) {
  try {
    const id = req.params.id;

    const result = await pool.query(
      "DELETE FROM restaurant_protein WHERE restaurant_protein_id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Protein not found" });
    }

    res.status(200).json({message: "Protein deleted succesfully", data: result.rows[0]});
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", detail: error.detail });
  }
}

module.exports = {
  getAllProteins,
  getProteinById,
  postProtein,
  updateProteinById,
  deleteProteinById,
};