var mongoose = require('mongoose');
var {Schema} = mongoose;

var seguroSchema = new Schema({
    codigo:String,
    tipo:String,
    vigencia:Number
});

module.exports = mongoose.model('Seguro',seguroSchema);