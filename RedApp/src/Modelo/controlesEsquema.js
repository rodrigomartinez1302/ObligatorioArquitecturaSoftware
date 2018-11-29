const mongoose = require('mongoose');

const controlesEsquema = new mongoose.Schema({
    descripcion : {type: String, required: true, maxlength: 250 },
    cantidad : {type: Number, required: true}
});
module.exports = mongoose.model('Control', controlesEsquema);

