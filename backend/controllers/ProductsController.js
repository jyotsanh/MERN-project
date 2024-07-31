
const bcrypt = require("bcrypt")
const ProductSchemadb = require("../schema/ProductSchema");


const ProductDetailsId = async (req,res) => {
    console.log(req.params.id);
    const product_data = await ProductSchemadb.findById(req.params.id);
    console.log(product_data);
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

const UserProductsController = async (req,res) => {
    const product_data = await ProductSchemadb.find().select('name price category price imageUrl'); //fetch only those data i selected.
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
    const {name,price,description,category,quantity,frame_material,lens_material,frame_shape} = req.body;
    console.log(req.body)
    const imageUrl = `uploads/Products/${name}/${req.file.filename}`;
    console.log(name,price,description,category,quantity,imageUrl)

    const data = await ProductSchemadb.create({
        name,
        price,
        description,
        category,
        quantity,
        frame_material,
        lens_material,
        frame_shape,
        imageUrl,
        createdBy: req.userId
    })
    console.log(data)
    if(data){
        {
            return res.status(200).send({
                "msg":"Product Added Successfully"
            })
        }
    }
    }catch(error){
        console.log(error)
        return res.status(400).send({
            "msg":"Server here Error",
            "error":error
        })
    }
}


const EditProductController = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, price, description, category, quantity ,frame_material,lens_material,frame_shape} = req.body;
        const updatedData = {
            name,
            price,
            description,
            category,
            quantity,
            frame_material,
            lens_material,
            frame_shape,
            createdBy: req.userId
        };
        if (req.file) {
            console.log(`Update path  : ${req.file.path}`)
            updatedData.image = req.file.path;
        }
        const updatedProduct = await ProductSchemadb.findByIdAndUpdate(productId, updatedData, { new: true });
        if (updatedProduct) {
            res.status(200).json({
                msg: "Product updated successfully",
                product: updatedProduct
            });
        } else {
            res.status(404).json({
                msg: "Product not found"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Server error"
        });
    }
};

const DeleteProductController = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await ProductSchemadb.findByIdAndDelete(productId);
        if (deletedProduct) {
            res.status(200).json({
                msg: "Product deleted successfully"
            });
        } else {
            res.status(404).json({
                msg: "Product not found"
            });
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({
            msg: "Server error"
        });
    }
};


exports.ProductController = ProductController;
exports.TopProductController = TopProductController;
exports.AddProductController = AddProductController;
exports.EditProductController = EditProductController;
exports.DeleteProductController = DeleteProductController;
exports.UserProductsController = UserProductsController;
exports.ProductDetailsId = ProductDetailsId;