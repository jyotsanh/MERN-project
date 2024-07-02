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
            <h2>Soft Contact Lenses</h2>
            <p>
            Soft contact lenses are made of soft, flexible plastics that allow oxygen to pass 
            through to the cornea. Soft contact lenses may be easier to adjust to and are more
             comfortable than rigid gas permeable lenses. Newer soft lens materials include silicone-hydrogels 
            to provide more oxygen to your eye while you wear your lenses.
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
            <h2>Disposable Contact Lenses</h2>
            <p>
            The majority of soft contact lens wearers are prescribed some type of frequent replacement 
            schedule. “Disposable,” as defined by the FDA, means used once and discarded.
             With a true daily wear disposable schedule, a brand new pair of lenses is used each day.
             Some soft contact lenses are referred to as “disposable”
              by contact lens sellers, but actually, they are for frequent/planned replacement. 
            </p>
          </div>
        </div>

        <div className="section">
          <div className="text-section">
            <h2>Rigid Gas Permeable Contact Lenses</h2>
            <p>
            Rigid gas permeable contact lenses (RGPs) are more durable and resistant 
            to deposit buildup, and generally give a clearer, crisper vision. They tend
             to be less expensive over the life of the lens since they last longer than 
             soft contact lenses. They are easier to handle and less likely to tear. However,
              they are not as comfortable initially as soft contacts and it may take a few weeks
               to get used to wearing RGPs, compared to several days for soft contacts.
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
            <h2>Extended Wear Contact Lenses</h2>
            <p>
            Extended wear contact lenses are available for overnight or continuous wear 
            ranging from one to six nights or up to 30 days. Extended wear contact lenses
             are usually soft contact lenses. They are made of flexible plastics that allow 
             oxygen to pass through to the cornea. There are also a very few rigid gas permeable 
             lenses that are designed and approved for overnight wear. Length of continuous wear 
             depends on lens type and your eye care professional’s evaluation of your tolerance for 
             overnight wear. It’s important for the eyes to have a rest without lenses for at least one 
             night following each scheduled removal.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default about;
