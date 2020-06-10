let express = require('express');
let router = express.Router();
let multer = require('multer');
let file = require('../db/Schemas/Product');
let path = require('path');
let pathDir = path.join(__dirname+"../uploads/");
let port = 'http://localhost:4416';
router.use(express.static(__dirname+"../uploads/"));

let storage = multer.diskStorage({ 
    destination:function(req,file,callBack) {
        callBack(null, pathDir)
    },
    filename:function(req,file,callBack) {
        callBack(null,Date.now()+file.originalname);
    },
});
let fileFilter = (req,file,callBack)=> {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
        callBack(null,true);
    }
    else{
        callBack(null,false);
    }
};

// let fileStorage = multer({
    let upload = multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:fileFilter
});


router.post('/uploadfile',upload.single('image'),async(req,res) => {
    try{
        let data = new file.ProductSchema({
            image:port + '/uploads/' +req.file.filename
        });
        if(!data) {
            return res.status(403).send({message:'not found file'})
        }
        let saveImages  = await data.save();
        res.send({message:'file uploaded',data:saveImages});
    }
    catch(ex){
        res.send(ex.message);
    }
});

// router.post('/file',upload.single('image'),async(req,res) => {
//         let file = new Model({
//             image:port+'/uploads/'+req.file.filename
//         });
//         if(!fileModel){
//             return res.status(403).send('not found file')
//         }
//         let data = await file.save();

//         res.send({
//             message:'fileuploaded',
//             data:data
//         });
// });
module.exports=router;

