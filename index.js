const express = require("express");
const app = express()
const bodyParser = require("body-parser");
const cors = require("cors");
const { main } = require("./connection");
const port = process.env.PORT || 3000;

main().catch(console.error);

app.use(cors());
app.use(express.json());    

app.get("/status", (req, res) => {
    res.send("check status");
})

app.listen(port, ()=>{
    console.log("Listening on port", port);
});