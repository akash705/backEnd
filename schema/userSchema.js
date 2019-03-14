var mongoose= require('mongoose');
var schema = mongoose.Schema;
var userschema = new schema({
    uid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        requrie:true
    }
});

var usermodel = mongoose.model('user', userschema);

module.exports={
    usermodel
}