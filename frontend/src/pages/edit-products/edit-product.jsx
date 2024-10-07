import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { editProduct, FetchProducts } from '../../service/api';
import './edit-product.css'; 
import Cookies from 'js-cookie';

function EditProduct() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [Error, SetError] = useState({});
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        category: [], 
        quantity: '',
        frame_material: '',
        lens_material: '',
        frame_shape: '',
        imageUrls: [],
        newImages: []
    });
    const [previewImages, setPreviewImages] = useState([]);
    const [deleteProductsUrl, setDeleteProductsUrl] = useState([]);
    const [newImages, setNewImages] = useState([]);

    const fetchProduct = async () => {
        console.log(`Fetching product with ID: ${id}`);
        try {
            const page = searchParams.get('page');
            console.log('page number:', page);
            const productsData = await FetchProducts(page);
            console.log('Fetched products data:', productsData);
            
            if (!productsData.Product || !Array.isArray(productsData.Product)) {
                console.error('Invalid products data structure:', productsData);
                return;
            }

            console.log('All product IDs:', productsData.Product.map(p => p._id));
            
            const productToEdit = productsData.Product.find(p => p._id === id);
            console.log(`Product to edit:`, productToEdit);

            if (productToEdit) {
                setProduct(productToEdit);
            } else {
                console.error(`Product with ID ${id} not found`);
                console.log('ID type:', typeof id);
                console.log('Sample product ID type:', typeof productsData.Product[0]._id);
                // Optionally, you can set an error state or show a message to the user
                // setError('Product not found');
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            // Optionally, you can set an error state or show a message to the user
            // setError('Failed to fetch product');
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id, searchParams]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: name === 'category'
                ? value.split(',').map(item => item.trim())
                : value
        }));
    };

    const handleImageDelete = (imageUrl) => {
        setProduct(prevProduct => ({
            ...prevProduct,
            imageUrls: prevProduct.imageUrls.filter(url => url !== imageUrl)
        }));
        setDeleteProductsUrl(prev => [...prev, imageUrl]);
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const imagePreviews = files.map(file => URL.createObjectURL(file));
        setNewImages(files);
        setPreviewImages(imagePreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = Cookies.get('token');
        try {
            const formData = new FormData();

            // Append product details
            Object.keys(product).forEach(key => {
                if (key !== 'imageUrls') {
                    if (key === 'category') {
                        // Handle category separately
                        const categoryValue = Array.isArray(product.category)
                            ? JSON.stringify(product.category)
                            : product.category;
                        formData.append('category', categoryValue);
                    } else {
                        formData.append(key, product[key]);
                    }
                }
            });

            // Append deleteProductsUrl
            formData.append('deleteProductsUrl', JSON.stringify(deleteProductsUrl));

            // Append new images
            newImages.forEach((file, index) => {
                formData.append(`newImages`, file);
            });
            console.log(deleteProductsUrl);
            console.log(product.category);
            // Make the API request
            await editProduct(id, formData, token);
            // Reload the current page instead of navigating
            window.location.reload();
        } catch (error) {
            const errorMsg = error.response?.data?.msg || 'An unexpected error occurred';
            const errorDetails = error.response?.data || {};
            console.log(error);

            SetError({
                name: errorDetails.name || '',
                price: errorDetails.price || '',
                description: errorDetails.description || '',
                category: errorDetails.category || '',
                quantity: errorDetails.quantity || '',
                frame_material: errorDetails.frame_material || '',
                lens_material: errorDetails.lens_material || '',
                frame_shape: errorDetails.frame_shape || '',
                msg: errorMsg
            });
        }
    };

    return (
        <div>
            <h1 className="edit-product-heading">Edit Product</h1>
            <div className="edit-product-container">
                <form onSubmit={handleSubmit} className="edit-product-form">
                    <div className="form-left">
                        <label>
                            Name:
                            <input type="text" name="name" value={product.name} onChange={handleChange} />
                        </label>
                        {Error.name && <p className="error-text">{Error.name}</p>}
                        <label>
                            Price:
                            <input type="number" name="price" value={product.price} onChange={handleChange} />
                        </label>
                        {Error.price && <p className="error-text">{Error.price}</p>}
                        <label>
                            Description:
                            <input type="text" name="description" value={product.description} onChange={handleChange} />
                        </label>
                        {Error.description && <p className="error-text">{Error.description}</p>}
                        <label>
                            Quantity:
                            <input type="number" name="quantity" value={product.quantity} onChange={handleChange} />
                        </label>
                        {Error.quantity && <p className="error-text">{Error.quantity}</p>}
                        <label htmlFor="category">Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={Array.isArray(product.category) ? product.category.join(', ') : product.category}
                            onChange={handleChange}
                            placeholder="Enter categories separated by commas"
                            required
                        />
                        {Error.category && <p className="error-text">{Error.category}</p>}
                    </div>

                    <div className="form-right">
                        <label htmlFor="frame-material">Frame Material:</label>
                        <select id="frame-material" name="frame_material" value={product.frame_material} onChange={handleChange} required>
                            <option value="">Select a Frame Material</option>
                            <option value="Aluminium">Aluminium</option>
                            <option value="Titanium">Titanium</option>
                            <option value="Stainless Steel">Stainless Steel</option>
                            <option value="Plastic">Plastic</option>
                            <option value="Carbon Fiber">Carbon Fiber</option>
                            <option value="Wood">Wood</option>
                            <option value="Leather">Leather</option>
                            <option value="TR-90">TR-90</option>
                        </select>
                        {Error.frame_material && <p className="error-text">{Error.frame_material}</p>}
                        <label htmlFor="frame-shape">Frame Shape:</label>
                        <select name="frame_shape" id="frame-shape" value={product.frame_shape} onChange={handleChange} required>
                            <option value="">Select a Frame Shape</option>
                            <option value="Rectangular">Rectangular</option>
                            <option value="Round">Round</option>
                            <option value="Square">Square</option>
                            <option value="Oval">Oval</option>
                            <option value="Cat-Eye">Cat-Eye</option>
                            <option value="Aviator">Aviator</option>
                            <option value="Wayfarer">Wayfarer</option>
                            <option value="Oversized">Oversized</option>
                        </select>
                        {Error.frame_shape && <p className="error-text">{Error.frame_shape}</p>}
                        <label htmlFor="lens-material">Lens Material:</label>
                        <select id="lens-material" value={product.lens_material} onChange={handleChange} name="lens_material" required>
                            <option value="">Select a Lens Material</option>
                            <option value="Polycarbonate">Polycarbonate</option>
                            <option value="Glass">Glass</option>
                            <option value="Plastic">Plastic</option>
                        </select>
                        {Error.lens_material && <p className="error-text">{Error.lens_material}</p>}

                        <label>Existing Images:</label>
                        <div className="image-preview-container">
                            {product.imageUrls && product.imageUrls.map((url, index) => (
                                <div key={index} className="image-preview">
                                    <img src={url} alt={`Product ${index}`} className="product-image-preview" />
                                    <button type="button" onClick={() => handleImageDelete(url)}>Delete</button>
                                </div>
                            ))}
                        </div>
                        <label htmlFor="new-images">Upload New Images:</label>
                        <input type="file" id="new-images" multiple onChange={handleImageUpload} />
                        
                        {previewImages.length > 0 && (
                            <div className="image-preview">
                                {previewImages.map((preview, index) => (
                                    <img key={index} src={preview} alt={`Preview ${index + 1}`} style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }} />
                                ))}
                            </div>
                        )}
                    </div>
                    <button type="submit" className="submit-btn">Update Product</button>
                    <button type="button" className="back-btn" onClick={() => navigate(`/admin-view?page=${searchParams.get('page')}`)}>Back to Admin</button>
                    
                    {Error.msg && <p className="error-text"> {Error.msg} </p>}
                </form>
            </div>
        </div>
    );
}

export default EditProduct;
