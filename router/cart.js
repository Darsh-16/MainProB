let express = require('express');
let router = express.Router();
let cschema = require('../db/Schemas/Cart');

router.post('/AddToCart',async(req,res)=>{
    try{
        let {error}=cschema.Validation(req.body);
        if(error){return res.status(404).send(error.details[0].message)}
        let CItem = new cschema.CModel({
            ProductId:req.body.ProductId,
            quantity:req.body.quantity,
            totalPrice:req.body.totalPrice,
        })
        let result = await CItem.save();
        res.send({message:"Item Added to Cart",d:result});

    }
    catch(ex){
        res.send(ex.message);
    }
});

router.get('/allCarts',async(req,res)=>{
    let data = await cschema.CModel.find().populate('ProductId');
    res.send(data);
});




module.exports=router;