const mongoose = require('mongoose');

const URLGatewayEsquema = new mongoose.Schema({
    nombre : {type: String, required: true},
    URL : {type: String, required: true}
});
module.exports = mongoose.model('URLGateway', URLGatewayEsquema);

