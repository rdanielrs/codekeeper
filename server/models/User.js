const mongoose = require("mongoose")

const User = mongoose.model("user", {
    id: String,
    username: String,
    password: String,
    user_folders: Array
})

module.exports = User