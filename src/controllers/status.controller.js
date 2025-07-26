const pool = require("../db");

async function getAllStatuses(req, res) {
    try {
        const result = await pool.query("SELECT * FROM restaurant_status")

        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({error:"Internal server error", detail: error.detail})
    }
}

async function getStatusById(req, res){
    try {
        const id = req.params.id

        const result = await pool.query(
            "SELECT * FROM restaurant_status WHERE restaurant_status_id = $1",
        [id])

        if(result.rowCount === 0){
            return res.status(404).json({error: "Status not found"})
        }

        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(500).json({error: "Internal Server Error", detail: error.detail})
    }
}

async function postStatus(req, res){
    try {
        const {status_name} = req.body

        if(!status_name){
            return res.status(400).json({error: "Status data invalid"})
        }

        const result = await pool.query(
            "INSERT INTO restaurant_status (restaurant_status_name) VALUES ($1) RETURNING *",
            [status_name]
        )

        res.status(201).json({message: "Status created succesfully", data: result.rows[0]})
    } catch (error) {
        res.status(500).json({error: "Internal Server Error", detail: error.detail})
    }
}

async function updateStatusById(req, res){
    try {
        const id = req.params.id
        const {status_name} = req.body

        if(!status_name){
            return res.status(400).json({error: "Status data invalid"})
        }

        const result = await pool.query(
            "UPDATE restaurant_status SET restaurant_status_name = $1 WHERE restaurant_status_id = $2 RETURNING *",
            [status_name, id]
        )

        if(result.rowCount === 0){
            return res.status(404).json({error: "Status not found"})
        }

        res.status(200).json({message: "Status updated succesfully", data: result.rows[0]})
    } catch (error) {
        res.status(500).json({error: "Internal Server Error", detail: error.detail})
    }
}

async function deleteStatusById(req, res){
    try {
        const id = req.params.id

        const result = await pool.query(
            "DELETE FROM restaurant_status WHERE restaurant_status_id = $1 RETURNING *",
            [id]
        )

        if(result.rowCount === 0){
            res.status(404).json({error: "Status not found"})
        }

        res.status(200).json({message: "Status deleted succesfully", data: result.rows[0]})
    } catch (error) {
        res.status(500).json({error: "Internal Server Error", detail: error.detail})
    }
}

module.exports = {getAllStatuses, getStatusById, postStatus, updateStatusById, deleteStatusById}