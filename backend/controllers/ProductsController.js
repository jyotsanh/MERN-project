const bcrypt = require("bcrypt");
const ProductSchemadb = require("../schema/ProductSchema");
const fs = require('fs');
const path = require('path');

const ProductDetailsId = async (req, res) => {
    try {
        const product_data = await ProductSchemadb.findById(req.params.id);
        if (product_data) {
            return res.send({ "Product": product_data });
        } else {
            return res.send({ "msg": "No data in db" });
        }
    } catch (error) {
        console.error("Error fetching product details:", error);
        return res.status(500).send({ "msg": "Server error" });
    }
};

const UserProductsController = async (req, res) => {
    try {
        const product_data = await ProductSchemadb.find().select('name price category imageUrls');
        if (product_data) {
            return res.send({ "Product": product_data });
        } else {
            return res.send({ "msg": "No data in db" });
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).send({ "msg": "Server error" });
    }
};

const ProductController = async (req, res) => {
    try {
        const product_data = await ProductSchemadb.find();
        if (product_data) {
            return res.send({ "Product": product_data });
        } else {
            return res.send({ "msg": "No data in db" });
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).send({ "msg": "Server error" });
    }
};

const TopProductController = async (req, res) => {
    return res.send({
        "msg": "Top Product Details"
    });
}

const AddProductController = async (req, res) => {
    try {
        const { name, price, description, category, quantity, frame_material, lens_material, frame_shape } = req.body;
        const imageUrls = req.files.map(file => `uploads/Products/${name}/${file.filename}`);
        const data = await ProductSchemadb.create({
            name,
            price,
            description,
            category,
            quantity,
            frame_material,
            lens_material,
            frame_shape,
            imageUrls,
            createdBy: req.userId
        });
        if (data) {
            return res.status(200).send({ msg: "Product Added Successfully" });
        }
    } catch (error) {
        console.error("Error adding product:", error);
        return res.status(400).send({ msg: "Server Error", error: error });
    }
};

const EditProductController = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, price, description, category, quantity, frame_material, lens_material, frame_shape } = req.body;
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
        if (req.files) {
            const imageUrls = req.files.map(file => `uploads/Products/${name}/${file.filename}`);
            updatedData.imageUrls = imageUrls;
        }
        const updatedProduct = await ProductSchemadb.findByIdAndUpdate(productId, updatedData, { new: true });
        if (updatedProduct) {
            res.status(200).json({ msg: "Product updated successfully", product: updatedProduct });
        } else {
            res.status(404).json({ msg: "Product not found" });
        }
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ msg: "Server error" });
    }
};

const DeleteProductController = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await ProductSchemadb.findById(productId);

        if (product) {
            // Delete associated images
            product.imageUrls.forEach(imageUrl => {
                const imagePath = path.join(__dirname, '..', imageUrl);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            });

            // Delete the product from the database
            await ProductSchemadb.findByIdAndDelete(productId);

            res.status(200).json({
                msg: "Product and associated images deleted successfully"
            });
        } else {
            res.status(404).json({ msg: "Product not found" });
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ msg: "Server error" });
    }
};

exports.ProductController = ProductController;
exports.TopProductController = TopProductController;
exports.AddProductController = AddProductController;
exports.EditProductController = EditProductController;
exports.DeleteProductController = DeleteProductController;
exports.UserProductsController = UserProductsController;
exports.ProductDetailsId = ProductDetailsId;
