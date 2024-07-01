
const bcrypt = require("bcrypt")
const ProductSchemadb = require("../schema/ProductSchema");


const ProductController = async (req,res)=>{
    return res.send({
        "msg":"Product Details"
    })
}

const TopProductController = async (req,res) => {
    return res.send({
        "msg":"Top Product Details"
    })
}

const AddProductController = async (req,res) => {
    try{
    let {name,price,description,category,imageUrl,quantity} = request.body;
    imageUrl = `/uploads/${req.file.filename}`;
    const data = await ProductSchemadb.create(req.body)
    if(data){
        {
            return response.status(200).send({
                "msg":"Product Added Successfully"
            })
        }
    }
    }catch(error){
        return response.status(400).send({
            "msg":"Server Error"
        })
    }
}


exports.ProductController = ProductController;
exports.TopProductController = TopProductController;

exports.AddProductController = AddProductController;