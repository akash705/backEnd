
const express = require('express');
const mongoose = require('mongoose');
const { config } = require('./config/config');
var {usermodel}  = require('./schema/userSchema');
var uid = require('uuid');

// imports-------------------------
var app = express();
// connection------------------------
var check={
    status:false
};
mongoose.connect(`mongodb://localhost:27017/${config.dataBaseName}`,{useNewUrlParser:true}).then(data=>{console.log(`mongodb running `);check.status=true;}).catch(data=>{console.log('mongodb Connection Failed');})
app.listen(config.port,() => console.log(`app listening on port ${config.port}`));
// connection------------------------


app.use((req,res,next)=>{
    if(!check.status){
        return res.send({status:false,error:'Database Error'});
    }
    return next();
})
app.all('/',(req,res)=>{return res.send({status:true,message:'Hey There all , Api has been setup'});})

app.get('/signUp',(req,res)=>{
    console.log(req.params);
        if(req.params){
            if(!trimAndCheck(req.params.name))
                return res.send({status:false,error:'Name is required'});
            if(!trimAndCheck(req.params.email))
                return res.send({status:false,error:'Email is required'});
            if(!trimAndCheck(req.params.password))
                return res.send({status:false,error:'Password is required'});


            let useData = new usermodel({name:req.params.name.trim(),email:req.params.email.trim().toLowerCase(),uid:uid.v1(),password:req.params.password.trim()});
            useData.save().then(data=>{
                return res.send({status:true,email:req.params.email});
            })
            .catch(data=>{
                return res.send({status:false,error:'Error While inserting Data'});
            })
        }
        
})  



app.post('/login',(req,res)=>{
    usermodel.findOne({password:req.params.password, email:req.params.email})
    .then(data=>{
        console.log(data);
        if(data){
            res.send({status:true,uuid:data.uid});
        }else{
            res.send({status:false,error:'User Not found'});
        }
    }).catch(data=>{
        res.send({status:false,error:'Exception '});
    })
});

function trimAndCheck(data){
    if(!data || !data.trim()){
        return false;
    }
    return true;
}

