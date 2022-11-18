const mongoose = require("mongoose");

const publicPostSchema = mongoose.Schema({
    title: String,
    content: String,
});

module.exports = mongoose.model("publicPost",publicPostSchema)