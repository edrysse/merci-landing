import React, { useState } from "react";
import "../App.css"; // استيراد ملف CSS
import { useNavigate } from "react-router-dom";

const CustomSlider = () => {
    
  const [currentSlide, setCurrentSlide] = useState(0);
   const navigate = useNavigate();
    const languages = [
      { name: "Français", flag: "https://cdn-icons-png.flaticon.com/512/197/197560.png" },
      { name: "Deutsch", flag: "https://cdn-icons-png.flaticon.com/512/197/197571.png" },
      { name: "العربية", flag: "https://cdn-icons-png.flaticon.com/512/197/197551.png" },
      { name: "English", flag: "https://cdn-icons-png.flaticon.com/512/197/197374.png" },
      { name: "中文", flag: "https://cdn-icons-png.flaticon.com/512/197/197375.png" },
      { name: "Español", flag: "https://cdn-icons-png.flaticon.com/512/197/197593.png" }, // رابط علم إسبانيا الصحيح
    ];
  
    const handleLanguageClick = (language) => {
      navigate(`/menu/${language}`);
    };
  

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
            <div className="wrap-content-slide1"   style={{ 
                  textTransform:" uppercase",
               }}>
              <span className="caption1-slide1"
              >{slides[currentSlide].title}</span>

              <h3 className="caption2-slide1">
                <img className="mercilogo" src={slides[currentSlide].logo} alt="Logo" />
              </h3>
              <div style={{ textAlign: "center" }}>
                    <h1 id="please" className="myh2" >
                   Please select your preferred language to view the menu:
                      
                    </h1>
                    <div className="buttons" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap",              marginBottom:"200px"
               }}>
                      {languages.map((language) => (
                        <button
                          key={language.name}
                          onClick={() => handleLanguageClick(language.name)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "10px 20px",
                            fontSize: "16px",
                            cursor: "pointer",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            backgroundColor: "#f9f9f9",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.2s, box-shadow 0.2s",
                          }}
                          onMouseOver={(e) => {
                            e.target.style.transform = "scale(1.05)";
                            e.target.style.boxShadow = "0 6px 8px rgba(0, 0, 0, 0.2)";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.transform = "scale(1)";
                            e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                          }}
                        >
                          <img
                            src={language.flag}
                            alt={`${language.name} flag`}
                            style={{ width: "24px", height: "24px", marginRight: "10px", borderRadius: "4px" }}
                          />
                          {language.name}
                        </button>
                      ))}
                    </div>
                  </div>
               
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CustomSlider;
