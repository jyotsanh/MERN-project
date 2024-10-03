const bcrypt = require("bcrypt");
const ProductSchemadb = require("../schema/ProductSchema");
const fs = require('fs');
const path = require('path');

const ProductDetailsId = async (req, res) => {
    try {
        // Fetch the main product by its ID
        const product_data = await ProductSchemadb.findById(req.params.id);
        
        if (product_data) {
            // Fetch all other products for recommendations, excluding the current product
            const otherProducts = await ProductSchemadb.find({ _id: { $ne: req.params.id } });

            // Shuffle and pick 8 random products for "You may also like" section
            const suggestedProducts = otherProducts
                .sort(() => Math.random() - 0.5)
                .slice(0, 8);

            return res.send({
                "Product": product_data,
                "youMayAlsoLike": suggestedProducts
            });
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

        // Extract Cloudinary URLs from the uploaded files
        const imageUrls = req.files.map(file => file.path); // Cloudinary stores the URL in `file.path`

        // Create the product with the Cloudinary URLs
        const data = await ProductSchemadb.create({
            name,
            price,
            description,
            category,
            quantity,
            frame_material,
            lens_material,
            frame_shape,
            imageUrls,  // Saving Cloudinary URLs
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
        
        // Find the product to update
        const product = await ProductSchemadb.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        // Updated product data (without images)
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

        // If there are new files (images) uploaded
        if (req.files && req.files.length > 0) {
            // Delete old images from Cloudinary
            const oldImageUrls = product.imageUrls;
            for (const imageUrl of oldImageUrls) {
                // Extract the public ID from the Cloudinary URL
                const publicId = imageUrl.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId); // delete image from Cloudinary
            }

            // Map new uploaded files to Cloudinary URLs
            const newImageUrls = req.files.map(file => file.path); // Cloudinary stores URL in file.path
            updatedData.imageUrls = newImageUrls; // Update the product with new image URLs
        }

        // Update the product in the database
        const updatedProduct = await ProductSchemadb.findByIdAndUpdate(productId, updatedData, { new: true });
        if (updatedProduct) {
            return res.status(200).json({ msg: "Product updated successfully", product: updatedProduct });
        } else {
            return res.status(404).json({ msg: "Product not found" });
        }
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ msg: "Server error", error });
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
const RecentProductsController = async (req, res) => {
    try {
      const recentProducts = await ProductSchemadb.find()
        .sort({ createdAt: -1 })
        .limit(4)
        .select('name price category imageUrls');
        
      return res.status(200).send({ RecentProducts: recentProducts });
    } catch (error) {
      console.error('Error fetching recent products:', error);
      return res.status(500).send({ msg: 'Server error' });
    }
  };
  



exports.RecentProductsController = RecentProductsController;
exports.ProductController = ProductController;
exports.TopProductController = TopProductController;
exports.AddProductController = AddProductController;
exports.EditProductController = EditProductController;
exports.DeleteProductController = DeleteProductController;
exports.UserProductsController = UserProductsController;
exports.ProductDetailsId = ProductDetailsId;
