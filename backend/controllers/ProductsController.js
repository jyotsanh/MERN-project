
const bcrypt = require("bcrypt")
const ProductSchemadb = require("../schema/ProductSchema");


const ProductController = async (req,res)=>{
    const product_data = await ProductSchemadb.find();
    if(product_data){
        return res.send({
            "Product":product_data
        })
    }else{
        return res.send({
            "msg":"no data in db"
        })
    }
}

const TopProductController = async (req,res) => {
    return res.send({
        "msg":"Top Product Details"
    })
}

const AddProductController = async (req,res) => {
    try{
    const {name,price,description,category,quantity} = req.body;
    console.log(req.body)
    const imageUrl = `uploads/Products/${req.file.filename}`;
    console.log(name,price,description,category,quantity,imageUrl)

    const data = await ProductSchemadb.create({name,price,description,category,quantity,imageUrl})
    console.log(data)
    if(data){
        {
            return res.status(200).send({
                "msg":"Product Added Successfully"
            })
        }
    }
    }catch(error){
        return res.status(400).send({
            "msg":"Server here Error",
            "error":error
        })
    }
}


exports.ProductController = ProductController;
exports.TopProductController = TopProductController;

exports.AddProductController = AddProductController;