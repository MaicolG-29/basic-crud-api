const express = require("../express");

const app = express();

app.get("/order", (req, res) => {
  res.send("Hola Alessandro Garzón Melo.");
});

app.listen(3000);
console.log("Server listening on port 3000");
