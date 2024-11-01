
import grplens from '../../assets/grplens.jpg';

export default function GasPermeableContactLens() {
    return (
        <>
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
        </>
    )
}