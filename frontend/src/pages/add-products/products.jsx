import { useState,useEffect } from "react";
import { UploadProducts } from "../../service/api";
import { jwtDecode } from "jwt-decode";
import './products.css';
import Cookies from 'js-cookie';
import { NavLink,useNavigate } from 'react-router-dom';

function AddProducts() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]); 
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(''); 
    const [quantity, setQuantity] = useState('');
    const [frame_material, setFrame_material] = useState('');
    const [lens_material, setLens_material] = useState('');
    const [frame_shape, setFrame_shape] = useState('');
    const [Error, SetError] = useState({});
    const [imageNames, setImageNames] = useState([]);


    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const token = Cookies.get('token');
        console.log(token) // remove when deploying to production
        if (!token) {
            navigate('/');
        } else {
            try {
                const decoded = jwtDecode(token);
                if (decoded.role === 'admin') {
                    setIsAdmin(true);
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error('Invalid token:', error);
                navigate('/');
            }
        
        }
    }, [navigate]);


    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(prevImages => [...prevImages, ...files]);
        const fileNames = files.map(file => file.name);
        setImageNames(prevNames => [...prevNames, ...fileNames]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        SetError({});

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        const categoriesArray = category.split(',').map(cat => cat.trim());
        categoriesArray.forEach(cat => formData.append('category', cat));
        formData.append('quantity', quantity);
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }
        formData.append('frame_material', frame_material);
        formData.append('lens_material', lens_material);
        formData.append('frame_shape', frame_shape);

        try {
            const token = Cookies.get('token');
            const response = await UploadProducts(formData, token);
            setMessage(response.data.msg);
            setName("");
            setPrice("");
            setImages([]);
            setDescription("");
            setCategory("");
            setQuantity("");
            setImageNames([]);
        } catch (error) {
            const { name, price, description, category, quantity, frame_material, lens_material, frame_shape } = error.response.data;
            SetError({
                name: name,
                price: price,
                description: description,
                category: category,
                quantity: quantity,
                frame_material: frame_material,
                lens_material: lens_material,
                frame_shape: frame_shape,
                msg: error.response.data.msg
            });
        }
    }

    if (!isAdmin) {
        return (
            <>
            </>
        );
    }

    return (
        <div className="pro-upload-product-container">
            <h1>Upload Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="pro-form-group">
                    <label htmlFor="name">Product Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {Error.name && <p className="pro-error-text">{Error.name}</p>}
                </div>

                <div className="pro-form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    {Error.description && <p className="pro-error-text">{Error.description}</p>}
                </div>

                <div className="pro-form-group">
                    <label htmlFor="price">Product Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    {Error.price && <p className="pro-error-text">{Error.price}</p>}
                </div>

                <div className="pro-form-group">
                    <label htmlFor="frame_material">Frame Material: </label>
                    <select
                        id="frame_material"
                        value={frame_material}
                        onChange={(e) => setFrame_material(e.target.value)}
                        required
                    >
                        <option value="">Select a Frame Category</option>
                        <option value="Aluminium">Aluminium</option>
                        <option value="Titanium">Titanium</option>
                        <option value="Stainless Steel">Stainless Steel</option>
                        <option value="Plastic">Plastic</option>
                        <option value="Carbon Fiber">Carbon Fiber</option>
                        <option value="Wood">Wood</option>
                        <option value="Leather">Leather</option>
                        <option value="TR-90">TR-90</option>
                    </select>
                    {Error.frame_material && <p className="pro-error-text">{Error.frame_material}</p>}
                </div>

                <div className="pro-form-group">
                    <label htmlFor="frame_shape">Frame Shape: </label>
                    <select
                        id="frame_shape"
                        value={frame_shape}
                        onChange={(e) => setFrame_shape(e.target.value)}
                        required
                    >
                        <option value="">Select a Frame Shape</option>
                        <option value="Rectangular">Rectangular</option>
                        <option value="Round">Round</option>
                        <option value="Square">Square</option>
                        <option value="Oval">Oval</option>
                        <option value="Cat-Eye">Cat-Eye</option>
                        <option value="Aviator">Aviator</option>
                        <option value="Browline/Clubmaster">Browline/Clubmaster</option>
                        <option value="Wayfarer">Wayfarer</option>
                        <option value="Oversized">Oversized</option>
                        <option value="Geometric">Geometric</option>
                        <option value="Rimless">Rimless</option>
                    </select>
                    {Error.frame_shape && <p className="pro-error-text">{Error.frame_shape}</p>}
                </div>

                <div className="pro-form-group">
                    <label htmlFor="lens_material">Lens Material: </label>
                    <select
                        id="lens_material"
                        value={lens_material}
                        onChange={(e) => setLens_material(e.target.value)}
                        required
                    >
                        <option value="">Select a Lens Material</option>
                        <option value="Polycarbonate">Polycarbonate</option>
                        <option value="Glass">Glass</option>
                        <option value="Plastic">Plastic</option>
                    </select>
                    {Error.lens_material && <p className="pro-error-text">{Error.lens_material}</p>}
                </div>

                <div className="pro-form-group">
                    <label htmlFor="category">Category: </label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Enter categories separated by commas"
                        required
                    />
                    {Error.category && <p className="pro-error-text">{Error.category}</p>}
                </div>

                <div className="pro-form-group">
                    <label htmlFor="quantity">Quantity: </label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                    {Error.quantity && <p className="pro-error-text">{Error.quantity}</p>}
                </div>

                <div className="pro-form-group">
                    <label htmlFor="images">Product Images:</label>
                    <input
                        type="file"
                        id="images"
                        multiple
                        onChange={handleImageChange}
                        required
                    />
                    {Error.images && <p className="pro-error-text">{Error.images}</p>}
                    {imageNames.length > 0 && (
                        <div className="pro-selected-files">
                            <p>Selected files:</p>
                            <ul>
                                {imageNames.map((name, index) => (
                                    <li key={index}>{name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <button type="submit">Upload</button>
                <NavLink to="/admin/products">
                    <button type="button">Back to Admin</button>
                </NavLink>
                {Error.msg && <p className="pro-error-text">{Error.msg}</p>}
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}

export default AddProducts;
