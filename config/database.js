var mongoose = require('mongoose');
var {mongodb} = require('./keys');

mongoose.connect(mongodb.URI,{
    useCreateIndex:true,
    useNewUrlParser:true
}).then(db=>{console.log("connection success")}).catch(err=>{console.log(err)});