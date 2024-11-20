const express = require("express")
const cors = require("cors")
const path = require("path")
const mongoose = require('mongoose')
const GeneralRoute = require("./Routes/GeneralRoutes")

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use("/api/", GeneralRoute);

const port = process.env.PORT || 4000;
const uri = process.env.DB_KEY;

mongoose
    .connect(uri, {})
    .then(() => console.log('MongoDB connection established...'))
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });


app.listen(port, '0.0.0.0', () => {
    console.log(`server running on ${port}`)
})