import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // استيراد ملف CSS
import CustomSlider from "./CustomSlider";

const Home = () => {
  const navigate = useNavigate();
  const languages = [
    { name: "Français", flag: "https://cdn-icons-png.flaticon.com/512/197/197560.png" },
    { name: "Deutsch", flag: "https://cdn-icons-png.flaticon.com/512/197/197571.png" },
    { name: "العربية", flag: "https://cdn-icons-png.flaticon.com/512/197/197484.png" },
    { name: "English", flag: "https://cdn-icons-png.flaticon.com/512/197/197374.png" },
    { name: "中文", flag: "https://cdn-icons-png.flaticon.com/512/197/197375.png" },
    { name: "Español", flag: "https://cdn-icons-png.flaticon.com/512/197/197386.png" },
  ];

  const handleLanguageClick = (language) => {
    navigate(`/menu/${language}`);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <CustomSlider />
      <h1 style={{paddingTop:"100px", marginBottom : "150px",  fontFamily: "Poppins",fontSize: "43px", fontWeight: "bold",marginLeft:"10%", marginRight:"10%" }}>
        Welcome! Please select your preferred language to view the menu:
        
      </h1>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "15px",              marginBottom:"200px"
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
  );
};

export default Home;
