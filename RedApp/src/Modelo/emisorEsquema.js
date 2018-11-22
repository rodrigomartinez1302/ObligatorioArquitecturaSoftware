const mongoose = require('mongoose');

const emisorEsquema = new mongoose.Schema({
    idEmisor : {type: String, required: true, maxlength: 4 },
    nombreEmisor : {type: String, required: true}
});
module.exports = mongoose.model('Emisor', emisorEsquema);

