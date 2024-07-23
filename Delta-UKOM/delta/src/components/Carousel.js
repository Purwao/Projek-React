import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Art1 from "../photos/Artboard 1.png";
import Art2 from "../photos/Artboard 2.png";
import Art3 from "../photos/Artboard 3.png";

function Carousel() {
  const settings = {

    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500, // Adjust autoplay speed as needed
    dots:true,
  };
  return (
    <div>
 <Slider {...settings}>
      <div>
      <img src={Art1} alt="1" />
      </div>
      <div>
      <img src={Art2} alt="2" />
      </div>
      <div>
      <img src={Art3} alt="3" />
      </div>
      {/* Add more slides as needed */}
    </Slider>
    </div>
  )
}

export default Carousel