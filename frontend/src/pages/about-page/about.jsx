import React from 'react';
import './about.css';
import softlens from '../../assets/softlens.jpeg';
import disposal from '../../assets/disposal.jpeg';
import grplens from '../../assets/grplens.jpg';
import lenss from '../../assets/extends.jpg';

function about() {
  return (
    <div className="about-container">
      <h1>About-Us</h1>
      <div className="content">

        <div className="section">
          <div className="text-section">
            <h2>Theme:            </h2>
            <p>
            Introducing Eyemate Optical Pvt Ltd, now proudly serving the community with our
             unparalleled craftsmanship and personalized service. With our expansion, we're
              excited to announce the opening of our new locations in Boudha, Shankhamul, and
               New Baneshwor, bringing our exceptional eyewear experience closer to you.
                At Eyemate Optical Pvt Ltd, we're more than just a destination for exquisite eyewear – we're 
                a symbol of quality and community, dedicated to making a difference in the lives of those we serve.
              Join us at any of our locations and discover the perfect pair of spectacles crafted with care and 
              precision, tailored to reflect your unique style and personality.


            </p>
          </div>
          <div className="image-section">
            <img src={softlens} alt="softlens" />
          </div>
        </div>

        <div className="section">
          <div className="image-section">
            <img src={disposal} alt="disposal lens" />
          </div>
          <div className="text-section">
            <h2>Personalized Recommendations:
            </h2>
            <p>
            With a wide selection of designer frames and lenses to choose from,
             our opticians will work closely with you to understand your lifestyle, 
             preferences, and visual needs. Whether you're looking for everyday glasses,
              sunglasses, or specialty lenses, we'll help you find the perfect solution

            </p>
          </div>
        </div>

        <div className="section">
          <div className="text-section">
            <h2>Ongoing Care:
            </h2>
            <p>
            Your vision is our priority, which is why we offer ongoing support and care
             for all your eyewear needs. Whether you need a simple adjustment or have questions
              about your prescription, our friendly opticians are here to help.
              Visit Eyemate Optical today and experience the difference our expert opticians 
            can make in your vision and style journey. Your perfect pair of glasses is waiting for you!

            </p>
          </div>
          <div className="image-section">
            <img src={grplens} alt="grplens" />
          </div>
        </div>

        <div className="section">
          <div className="image-section">
            <img src={lenss} alt="extend" />
          </div>
          <div className="text-section">
            <h2>Premium Sunglasses 
            </h2>
            <p>
            Introducing the epitome of style and quality – premium sunglasses
             now available at Eyemate Optical in Nepal. Elevate your eyewear 
             game with our exquisite collection, crafted for those who demand
              nothing but the best. Experience unparalleled clarity and protection
               while making a statement with every step. Don't compromise on quality or
                style; find your perfect pair at Eyemate Optical today and invest in your
                 vision without breaking the bank.

            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default about;
