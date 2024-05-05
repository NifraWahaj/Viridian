import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "../pages/Movies/MovieCard";
//DONE
const SliderUtil = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
  };

  return (
    <Slider {...settings}>
      {data?.map((movie) => (
        <div key={movie._id} className="px-2"> {/* Adjust padding as needed */}
          <MovieCard movie={movie} />
        </div>
      ))}
    </Slider>
  );
};

export default SliderUtil;
