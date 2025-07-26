const pool = require("../db");

async function getAllWaiters(req, res) {
    try {
        const result = await pool.query("SELECT * FROM restaurant_waiter")

        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({error:"Internal server error", detail: error.detail})
    }
}

async function getWaiterById(req, res){
    try {
        const id = req.params.id

        const result = await pool.query(
            "SELECT * FROM restaurant_waiter WHERE restaurant_waiter_id = $1",
        [id])

        if(result.rowCount === 0){
            return res.status(404).json({error: "Waiter not found"})
        }

        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(500).json({error: "Internal Server Error", detail: error.detail})
    }
}

async function postWaiter(req, res){
    try {
        const {waiter_name} = req.body

        if(!waiter_name){
            return res.status(400).json({error: "Waiter data invalid"})
        }

        const result = await pool.query(
            "INSERT INTO restaurant_waiter (restaurant_waiter_name) VALUES ($1) RETURNING *",
            [waiter_name]
        )

        res.status(201).json({message: "Waiter created succesfully", data: result.rows[0]})
    } catch (error) {
        res.status(500).json({error: "Internal Server Error", detail: error.detail})
    }
}

async function updateWaiterById(req, res){
    try {
        const id = req.params.id
        const {waiter_name} = req.body

        if(!waiter_name){
            return res.status(400).json({error: "Waiter data invalid"})
        }

        const result = await pool.query(
            "UPDATE restaurant_waiter SET restaurant_waiter_name = $1 WHERE restaurant_waiter_id = $2 RETURNING *",
            [waiter_name, id]
        )

        if(result.rowCount === 0){
            return res.status(404).json({error: "Waiter not found"})
        }

        res.status(200).json({message: "Waiter updated succesfully", data: result.rows[0]})
    } catch (error) {
        res.status(500).json({error: "Internal Server Error", detail: error.detail})
    }
}

async function deleteWaiterById(req, res){
    try {
        const id = req.params.id

        await pool.query(
            "DELETE FROM restaurant_table WHERE restaurant_waiter_id = $1",
        [id])

        const result = await pool.query(
            "DELETE FROM restaurant_waiter WHERE restaurant_waiter_id = $1 RETURNING *",
            [id]
        )

        if(result.rowCount === 0){
            res.status(404).json({error: "Waiter not found"})
        }

        res.status(200).json({message: "Waiter deleted succesfully", data: result.rows[0]})
    } catch (error) {
        res.status(500).json({error: "Internal Server Error", detail: error.detail})
    }
}

async function getWaiterTables(req, res){
    try {
        const id = req.params.id

        const result = await pool.query(
            "SELECT * FROM restaurant_table WHERE restaurant_waiter_id = $1",
            [id]
        )

        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({error: "Internal Server Error", detail: error.detail})
    }
}

module.exports = {getAllWaiters, getWaiterById, postWaiter, updateWaiterById, deleteWaiterById, getWaiterTables}