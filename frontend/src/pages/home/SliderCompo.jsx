import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
const URL = import.meta.env.VITE_BASE_URL;
const NextArrow = ({ onClick }) => {
    return (
      <div className="slick-arrow slick-next" onClick={onClick}>
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    );
  };
const PrevArrow = ({ onClick }) => {
    return (
      <div className="slick-arrow slick-prev" onClick={onClick}>
        <i className="fas fa-chevron-left"></i>
      </div>
    );
  };
export default function SliderCompo(){
    const [sliderProducts, setSliderProducts] = useState([]);
    useEffect(() => {
      console.log('Slider component mounted.');
       fetchSliderProducts(); 
    },[])
    const fetchSliderProducts = async () => {
        try {
          const response = await axios.get(`${URL}/slider-products`); // Use the full URL
          const sliderProducts = response.data.SliderProducts;
          // console.log(sliderProducts); // Check the data fetched
          setSliderProducts(sliderProducts);
        } catch (error) {
          console.error('Error fetching slider products:', error);
        }
      };
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
      };
    const multipleItemsSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
      };
    return (
        <>
            <section className="image-slider max-w-full overflow-hidden">
                <Slider {...settings}>
                {
                    sliderProducts?.map((product, index) => (
                    <div key={index} className="slide">
                    <img
                        src={product}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-60 sm:h-80 md:h-96 object-cover"
                    />
                    </div>
                    ))
                }
                </Slider>
            </section>
        </>
    );
}