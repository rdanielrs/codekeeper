/*const express = require("express");

const app = express();
const mongoose = require('mongoose')

app.use(express.json());

require("dotenv").config()


const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes)


const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.r7klk.mongodb.net/colorbank?retryWrites=true&w=majority`).then(() => {
    app.listen(3333)
    console.log("backend funcionando")
}).catch((err) => {
    console.log("Erro de conexão")
})*/

const express = require("express");

const mongoose = require('mongoose')
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(express.json());

const ShortUniqueId = require('short-unique-id');
//var uuid = new ShortUniqueId()

app.use(cors());


const userRoutes = require("./routes/userRoutes");
const folderRoutes = require('./routes/folderRoutes');
const filterRoutes = require('./routes/filterRoutes')

app.use("/users", userRoutes);
app.use("/folders", folderRoutes);
app.use("/filter", filterRoutes);

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.r7klk.mongodb.net/colorbank?retryWrites=true&w=majority`).then(() => {
    app.listen(3333)
    console.log("backend funcionando")
}).catch((err) => {
    console.log("Erro de conexão")
})



