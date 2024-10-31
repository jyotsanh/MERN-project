import './Home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//Component Importing
import SliderCompo from './Slider.jsx';
import Outlet from '../../pages/Store/Outlet.jsx';
import Home2ndCompo from './Home2.jsx';
import TrendingProductCompo from './TrendingProductCompo.jsx';



const Home = () => {
  
  return (
    <div className="home">
      {/* Image Slider Section */}
      <SliderCompo></SliderCompo>

      <Home2ndCompo></Home2ndCompo>

      <TrendingProductCompo></TrendingProductCompo>
      
      <Outlet />
      
    </div>
  );
};

export default Home;