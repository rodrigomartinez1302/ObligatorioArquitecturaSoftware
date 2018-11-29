const mongoose = require("mongoose");

const redEsquema = new mongoose.Schema({
  idRed: { type: String, required: true, maxlength: 2 },
  nombreRed: { type: String, required: true }
});
module.exports = mongoose.model("Red", redEsquema);
