const bcrypt = require("bcrypt");
const ProductSchemadb = require("../schema/ProductSchema");
const EyeGlassessSchemadb = require("../schema/EyeGlassesSchemadb");
const KidsGlassesSchemadb = require("../schema/KidsGlassesSchema");
const SunglassesSchemadb = require("../schema/SunglassesSchemadb");

const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Products', // Folder where images will be stored on Cloudinary
        allowed_formats: ['jpg', 'png', 'webp', 'jpeg'], // List of allowed formats
        format: async (req, file) => {
            // Get the file extension
            const extension = file.originalname.split('.').pop().toLowerCase();
            // If it's one of our allowed formats, use that. Otherwise, default to png.
            return ['jpg', 'png', 'webp', 'jpeg'].includes(extension) ? extension : 'png';
        },
        public_id: (req, file) => `${Date.now()}_${file.originalname}`,
    },
});

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
        const page = parseInt(req.query.page) || 1; // Get the page number from query params, default to 1
        const limit = 8; // Number of items per page
        const skip = (page - 1) * limit; // Calculate the number of documents to skip

        const totalProducts = await ProductSchemadb.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit);

        const product_data = await ProductSchemadb.find()
            .select('name price category imageUrls frame_material lens_material frame_shape')
            .skip(skip)
            .limit(limit);

        if (product_data.length > 0) {
            return res.send({
                "Products": product_data,
                "currentPage": page,
                "totalPages": totalPages
            });
        } else {
            return res.send({ "msg": "No data found for this page" });
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).send({ "msg": "Server error" });
    }
};
const UserSunglassesProductsController = async (req, res) => {
    try {
        console.log("Sunglasses Products")
        const page = parseInt(req.query.page) || 1; // Get the page number from query params, default to 1
        const limit = 8; // Number of items per page
        const skip = (page - 1) * limit; // Calculate the number of documents to skip

        const totalProducts = await SunglassesSchemadb.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit);

        const product_data = await SunglassesSchemadb.find()
            .select('name price category imageUrls frame_material lens_material frame_shape')
            .skip(skip)
            .limit(limit);

        if (product_data.length > 0) {
            return res.send({
                "Products": product_data,
                "currentPage": page,
                "totalPages": totalPages
            });
        } else {
            return res.status(404).send({ "msg": "No Sunglasses Products Available" });
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).send({ "msg": "Server error" });
    }
};

const KidsGlassesProductsController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Get the page number from query params, default to 1
        const limit = 8; // Number of items per page
        const skip = (page - 1) * limit; // Calculate the number of documents to skip

        const totalProducts = await KidsGlassesSchemadb.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit);

        const product_data = await KidsGlassesSchemadb.find()
            .select('name price category imageUrls frame_material lens_material frame_shape')
            .skip(skip)
            .limit(limit);

        if (product_data.length > 0) {
            return res.send({
                "Products": product_data,
                "currentPage": page,
                "totalPages": totalPages
            });
        } else {
            return res.status(404).send({ "msg": "No Kids Glasses available" });
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).send({ "msg": "Server error" });
    }
};

const ProductController = async (req, res) => {
    try {
        console.log("fetched the filtered products")
        const { name, category, frame_shape, frame_material, lens_material, page = 1, limit = 8 } = req.query;

        let filter = {};

        // Build the search filters based on query parameters
        if (name) filter.name = { $regex: name, $options: 'i' };
        if (category) filter.category = { $regex: category, $options: 'i' };
        if (frame_shape) filter.frame_shape = { $regex: frame_shape, $options: 'i' };
        if (frame_material) filter.frame_material = { $regex: frame_material, $options: 'i' };
        if (lens_material) filter.lens_material = { $regex: lens_material, $options: 'i' };

        const skip = (page - 1) * limit;

        // Fetch products with filters and pagination
        const product_data = await ProductSchemadb.find(filter)
            .skip(skip)
            .limit(limit);

        // Get total count of filtered products
        const total_products = await ProductSchemadb.countDocuments(filter);

        // Check if products exist
        if (product_data.length > 0) {
            return res.send({
                "Product": product_data,
                "totalPages": Math.ceil(total_products / limit),  // Total number of pages
                "currentPage": page,
                "totalProducts": total_products  // Total number of matching products
            });
        } else {
            return res.send({ "msg": "No products found" });
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).send({ "msg": "Server error", error: error.message });
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


const testEditProductController = async (req, res) => {
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


const EditProductController = async (req, res) => {
    try {
        console.log("heere");
        const productId = req.params.id;
        const { name, price, description, category, quantity, frame_material, lens_material, frame_shape, deleteProductsUrl } = req.body;
        
        // Find the product to update
        const product = await ProductSchemadb.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        // Updated product data
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

        const extractPublicId = (url) => {
            const splitUrl = url.split('/');
            
            
            let filename = splitUrl[splitUrl.length - 1];
            
            
            const parts = filename.split(".");
            
            // Check if the last two parts are identical (duplicate extensions)
            if (parts[parts.length - 1] === parts[parts.length - 2]) {
                // Remove the duplicate extension by joining without the last part
                filename = parts.slice(0, -1).join(".");
            } else {
                // Otherwise, return the filename as-is
                filename = parts.join(".");
            }
            
            return filename;
        }

        // Handle image deletions
        if (deleteProductsUrl && deleteProductsUrl.length > 0) {
            const deletedUrls = JSON.parse(deleteProductsUrl);
            const successfullyDeletedUrls = [];
            
            for (const imageUrl of deletedUrls) {
                try {
                    const publicId = `Products/${extractPublicId(imageUrl)}`;
                
                    
                    const result = await cloudinary.uploader.destroy(publicId);
                    
                    if (result.result === 'ok') {
                        console.log(`Successfully deleted image with public ID: ${publicId}`);
                        successfullyDeletedUrls.push(imageUrl);
                    } else if (result.result === 'not found') {
                        console.log(`Image with public ID ${publicId} not found in Cloudinary. It may have been already deleted.`);
                        // Optionally, you might still want to remove this URL from your database
                        successfullyDeletedUrls.push(imageUrl);
                    } else {
                        console.log(`Failed to delete image with public ID: ${publicId}. Cloudinary response:`, result);
                    }
                } catch (error) {
                    console.error(`Error deleting image ${imageUrl}:`, error);
                }
            }
            
            updatedData.imageUrls = product.imageUrls.filter(url => !successfullyDeletedUrls.includes(url));
        }

        // Handle new image uploads
        if (req.files && req.files.length > 0) {
            const newImageUrls = req.files.map(file => file.path);
            updatedData.imageUrls = [...(updatedData.imageUrls || []), ...newImageUrls];
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
            // Delete associated images from Cloudinary
            for (const imageUrl of product.imageUrls) {
                try {
                    const publicId = `Products/${extractPublicId(imageUrl)}`;
                    const result = await cloudinary.uploader.destroy(publicId);
                    
                    if (result.result === 'ok') {
                        console.log(`Successfully deleted image with public ID: ${publicId}`);
                    } else if (result.result === 'not found') {
                        console.log(`Image with public ID ${publicId} not found in Cloudinary. It may have been already deleted.`);
                    } else {
                        console.log(`Failed to delete image with public ID: ${publicId}. Cloudinary response:`, result);
                    }
                } catch (error) {
                    console.error(`Error deleting image ${imageUrl}:`, error);
                }
            }

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

// Helper function to extract public ID from Cloudinary URL
const extractPublicId = (url) => {
    const splitUrl = url.split('/');
    let filename = splitUrl[splitUrl.length - 1];
    const parts = filename.split(".");
    
    // Check if the last two parts are identical (duplicate extensions)
    if (parts[parts.length - 1] === parts[parts.length - 2]) {
        // Remove the duplicate extension by joining without the last part
        filename = parts.slice(0, -1).join(".");
    } else {
        // Otherwise, return the filename as-is
        filename = parts.join(".");
    }
    
    return filename;
}

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
  
const SliderProductsController = async (req, res) => {
    try {
        const ImageUrls = [
                            "https://res.cloudinary.com/drknmo9pb/image/upload/v1728009867/Products/ccrwbz3qryyhaiucx6pf.webp",
                            "https://res.cloudinary.com/drknmo9pb/image/upload/v1728009866/Products/v3to6fp4gdfcdhn8hpgs.webp",
                            "https://res.cloudinary.com/drknmo9pb/image/upload/v1728009865/Products/ily51jlvp8j8wndnhesc.webp",
                            "https://res.cloudinary.com/drknmo9pb/image/upload/v1728009865/Products/c6evrawe9o4imxhx10qd.webp"
                            ]
        return res.status(200).send({ SliderProducts: ImageUrls });
    } catch (error) {
        console.error('Error fetching slider products:', error);    
        return res.status(500).send({ msg: 'Server error' });
    }
};

const FilterProductsController = async (req, res) => {
    try {
        console.log(req.body);
        const { price, frameMaterial, lensMaterial, frameShape, page = 1 } = req.body;
        const limit = 8; // Or whatever number of items per page you want

        let query = {};

        if (price) {
            if (price === 'Under Rs 500') {
                query.price = { $lt: 500 };
            } else if (price === 'Rs 500 - Rs 2000') {
                query.price = { $gte: 500, $lte: 2000 };
            } else if (price === 'Over Rs 2000') {
                query.price = { $gt: 2000 };
            }
        }

        if (frameMaterial) {
            query.frame_material = frameMaterial;
        }

        if (lensMaterial) {
            query.lens_material = lensMaterial;
        }

        if (frameShape) {
            query.frame_shape = frameShape;
        }

        const totalProducts = await ProductSchemadb.countDocuments(query);
        console.log(totalProducts);
        if (totalProducts === 0) {
            return res.status(404).send({
                msg: "No products found matching the filter criteria",
                Products: [],
                currentPage: page,
                totalPages: 0,
                totalProducts: 0
            });
        }

        const totalPages = Math.ceil(totalProducts / limit);

        const filteredProducts = await ProductSchemadb.find(query)
            .skip((page - 1) * limit)
            .limit(limit);
        console.log(`Total Page: ${totalPages}`);
        return res.status(200).send({
            Products: filteredProducts,
            currentPage: page,
            totalPages: totalPages,
            totalProducts: totalProducts
        });
    } catch (error) {
        console.error('Error filtering products:', error);
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
exports.SliderProductsController = SliderProductsController;
exports.FilterProductsController = FilterProductsController;
exports.UserSunglassesProductsController = UserSunglassesProductsController;
exports.KidsGlassesProductsController = KidsGlassesProductsController;