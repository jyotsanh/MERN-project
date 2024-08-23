import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './pages/auth/AuthContext';
import Home from './pages/home/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Sunglasses from "./pages/Sunglasses/Sunglasses";
import EyeGlasses from "./pages/Eyeglasses/EyeGlasses";
import Contactlens from "./pages/contactlens/Contactlens";
import Book from "./pages/book/Book";
import FAQ from "./pages/Faq/FAQ";
import Log from './pages/Login/Log';
import Sign from './pages/Sign/Sign';
import AddProducts from '../src/pages/add-products/products';
import Admin from "../src/pages/Admin/admin";
import Admin_View from "../src/pages/Admin/admin_view";
import EditProduct from "./pages/edit-products/edit-product";
import AppointmentView from "./pages/Admin/appointment_view";
import About from './pages/about-page/about';
import Cart from './pages/cart/cart';
import ProductPage from './Components/ProductPage';
import AdminLogIn from "../src/pages/Admin/adminLogIn";
import Checkout from "../src/pages/checkout/checkout";

const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/sunglasses" element={<Sunglasses />} />
                        <Route path="/product/:id" element={<ProductPage />} /> {/* Product Page when clicked will show product data */}
                        <Route path="/eyeglasses" element={<EyeGlasses />} />
                        <Route path="/contactlens" element={<Contactlens />} />
                        <Route path="/book" element={<Book />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/login" element={<Log />} />
                        {/* <Route path="/sign" element={<Sign />} /> */}
                        <Route path="/add-products" element={<AddProducts />} />
                        <Route path="/admin-login" element={<AdminLogIn />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/admin-view" element={<Admin_View />} />
                        <Route path="/edit-product/:id" element={<EditProduct />} />
                        <Route path="/appointments" element={<AppointmentView />} />
                        <Route path='/about' element={<About />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/checkout' element={<Checkout />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
