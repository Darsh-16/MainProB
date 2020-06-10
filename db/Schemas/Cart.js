let mongoose = require('mongoose');
let Joi = require('@hapi/joi');
let Pro = require('./Product')

// Cart Schema

let CartSchema = new mongoose.Schema({
    ProductId:{type:mongoose.Schema.Types.ObjectId,ref:"Productinfo",required:true},
    name:{type:String},
    image:{type:String},
    price:{type:Number},
    quantity:{type:Number,required:true},
    totalPrice:{type:Number,required:true},
    recordDate:{type:Date,default:Date.now()},
    updateDate:{type:Date,default:Date.now()}
});


let CModel = mongoose.model('CModel',CartSchema);
function Validation(message){
    let Schema = Joi.object({
        ProductId:Joi.required(),
        quantity:Joi.number().required(),
        totalPrice:Joi.number().required(),
    });
    return Schema.validate(message);
}


module.exports = {CModel,Validation,CartSchema}
