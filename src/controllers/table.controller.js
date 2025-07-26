const pool = require("../db");

async function getAllTables(req, res) {
  try {
    const result = await pool.query("SELECT * FROM restaurant_table");

    res.status(200).json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", detail: error.detail });
  }
}

async function getTableById(req, res){
    try {
    const id = req.params.id;

    const result = await pool.query(
      "SELECT * FROM restaurant_table WHERE restaurant_table_id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Table not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", detail: error.detail });
  }
}

async function postTable(req, res) {
  try {
    const { waiter_id } = req.body;

    if (typeof waiter_id !== "number") {
      return res.status(400).json({ error: "Table data invalid" });
    }

    const result = await pool.query(
      "INSERT INTO restaurant_table (restaurant_waiter_id) VALUES ($1) RETURNING *",
      [waiter_id]
    );

    res.status(201).json({message: "Table created succesfully", data: result.rows[0]});
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", detail: error.detail });
  }
}

async function updateTableById(req, res) {
  try {
    const id = req.params.id;
    const { waiter_id } = req.body;

    if (typeof waiter_id !== "number") {
      return res.status(400).json({ error: "Table data invalid" });
    }

    const result = await pool.query(
      "UPDATE restaurant_table SET restaurant_waiter_id = $1 WHERE restaurant_table_id = $2 RETURNING *",
      [waiter_id, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Table not found" });
    }

    res.status(200).json({message: "Table updated succesfully", data: result.rows[0]});
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", detail: error.detail });
  }
}

async function deleteTableById(req, res) {
  try {
    const id = req.params.id;

    const result = await pool.query(
      "DELETE FROM restaurant_table WHERE restaurant_table_id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Table not found" });
    }

    res.status(200).json({message: "Table deleted succesfully", data: result.rows[0]});
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", detail: error.detail });
  }
}

module.exports = { getAllTables, getTableById, postTable, updateTableById, deleteTableById};
