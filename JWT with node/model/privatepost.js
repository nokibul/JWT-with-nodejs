const mongoose = require("mongoose");

const privatePostSchema = mongoose.Schema({
    title: String,
    content: String,
});

module.exports = mongoose.model("privatePost",privatePostSchema)