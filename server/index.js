const express = require("express");
const cors = require("cors")
const cookie = require("cookie-parser")
const router = require("./router");

const PORT = 5000;


const app = express();

app.use(express.json());
app.use(cookie());
app.use(cors());
app.use('/esstu', router);

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
} )