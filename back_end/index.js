const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;

const stone = ['travertine']

app.get("/", (req, res) => {
    res.send(stone);
});

app.listen(port, () => console.log(`Server running in port ${port}`));