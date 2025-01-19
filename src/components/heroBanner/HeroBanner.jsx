import React from "react";
import Slider from "react-slick";
import slider1 from "../../assets/images/slider/slider 1.jpeg";
import slider2 from "../../assets/images/slider/slider 2.jpeg";
import slider3 from "../../assets/images/slider/slider 3.jpeg";
import slider4 from "../../assets/images/slider/slider 4.jpeg";
import slider5 from "../../assets/images/slider/slider 5.jpeg";

// Images for the cards
const cards = [
  {
    id: 1,
    image: slider1, // Replace with your image path
    // title: "GFT Spotlight #1",
  },
  {
    id: 2,
    image: slider2, // Replace with your image path
    // title: "GFT Spotlight #2",
  },
  {
    id: 3,
    image: slider3, // Replace with your image path
    // title: "GFT Spotlight #3",
  },
  {
    id: 4,
    image: slider4, // Replace with your image path
    // title: "GFT Spotlight #3",
  },
  {
    id: 5,
    image: slider5, // Replace with your image path
    // title: "GFT Spotlight #3",
  },
];

const HeroBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // slidesToShow: 2,
    // slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000, // 15 seconds
    arrows: false,
    responsive: [
      {
        breakpoint: 768, // Define the max-width for mobile screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="bg-black py-10">
      <Slider {...settings}>
        {cards.map((card) => (
          <div key={card.id} className="px-4">
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <img src={card.image} alt={card.title} className="w-full h-64 sm:h-[30rem] object-cover" />
              {card.title && (
                <div className="p-4">
                  <h2 className="text-white text-lg font-bold">{card.title}</h2>
                </div>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroBanner;
