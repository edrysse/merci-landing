import React, { useState } from "react";
import "../App.css"; // استيراد ملف CSS

const CustomSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      img: "clientpage/images/slide1-01.jpg",
      title: "Welcome to",
      logo: "clientpage/images/MERCI_IMG/LOGO/Logo-Merci-b1.png",
    },
    {
      img: "clientpage/images/master-slides-02.jpg",
      title: "Welcome to",
      logo: "clientpage/images/MERCI_IMG/LOGO/Logo-Merci-b1.png",
    },
    {
      img: "clientpage/images/master-slides-01.jpg",
      title: "Welcome to",
      logo: "clientpage/images/MERCI_IMG/LOGO/Logo-Merci-b1.png",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="section-slide">
      <div className="wrap-slick1">
        <div className="slick1">
          <div
            className="item-slick1"
            style={{
              backgroundImage: `url(${slides[currentSlide].img})`,
            }}
          >
            <div className="wrap-content-slide1">
              <span className="caption1-slide1">{slides[currentSlide].title}</span>

              <h3 className="caption2-slide1">
                <img className="mercilogo" src={slides[currentSlide].logo} alt="Logo" />
              </h3>

              <div className="wrap-btn-slide1">
                <button className="btn1" >Voir Menu</button>
              </div>
            </div>
          </div>
        </div>

        <div className="wrap-slick1-dots">
          <button className="prev-slide" onClick={prevSlide}>
            &#60;
          </button>
          <button className="next-slide" onClick={nextSlide}>
            &#62;
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomSlider;
