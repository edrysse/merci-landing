import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import data2 from "../repas.json";

import data from "../newrepas.json";
import translations from "../translation_template.json";
import "../App.css";

const Menu = () => {
  const { language } = useParams();
  const [selectedCategories, setSelectedCategories] = useState(["*"]);
  const [scrolled, setScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const navbarRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navButtons = [
    { key: "Tout", categories: ["*"] },
    { key: "Standard drinks", categories: ["Espresso", "Thé", "Frappuccino", "Cappuccino", "Café crème", "Ice tea", "Ice Coffee", "Fondue Au Chocolat"] },
    { key: "Sucré", categories: ["Pancake", "Crêpe", "Gaufre"] },
    { key: "Salé", categories: ["Crêpe salé"] },
    { key: "Gold drinks", categories: ["Nos Jus", "Cocktail", "Nos Smoothies", "Milk shakes"] },
    { key: "Club Sandwich", categories: ["Sandwich"] },
    { key: "Dessert", categories: ["Dessert"] },
    { key: "Petits Déjeuners", categories: ["Petits Déjeuners"] },
    { key: "Brunch", categories: ["Brunch"] },
    { key: "Supplements", categories: ["Supplements"] },
  ];
  const orderedCategories = [
    "Brunch",
    "Petits Déjeuners",
    "Standard drinks",
    "Sucré",
    "Salé",
    "Gold drinks",
    "Club Sandwich",
    "Dessert",
    "Supplements"
  ];
  const groupedItems = data.reduce((groups, item) => {
    if (!groups[item.type]) {
      groups[item.type] = [];
    }
    if (!groups[item.type].some(existingItem => existingItem.nom === item.nom && existingItem.prix === item.prix)) {
      groups[item.type].push(item);
    }
    return groups;
  }, {});

  useEffect(() => {
    document.documentElement.dir = language === "العربية" ? "rtl" : "ltr";
  }, [language]);

  const handleCategoryClick = (categories) => {
    setSelectedCategories(categories);
    setIsNavOpen(false);
  };

  const filteredItems = selectedCategories.includes("*")
    ? groupedItems
    : Object.fromEntries(
        Object.entries(groupedItems).filter(([key]) =>
          selectedCategories.includes(key)
        )
      );

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsNavOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* نافبار */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-light fixed-top">
  <div className="container-fluid d-flex align-items-center justify-content-between">
    
    {/* شعار المطعم */}
    <a className="navbar-brand me-3" href="#">
      <img src="/clientpage/images/MERCI_IMG/logo_header/Logo-Merci-b4.png" alt="Logo" className="mylogo" />
    </a>

    {/* زر فتح القائمة في الشاشات الصغيرة */}
    <button className="navbar-toggler" type="button" onClick={() => setIsNavOpen(!isNavOpen)}>
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* عناصر النافبار */}
    <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`} id="navbarNav">
      <ul className="navbar-nav d-flex align-items-center gap-2"> 
        {navButtons.map((button) => (
          <li key={button.key} className="nav-item">
            <button
              onClick={() => handleCategoryClick(button.categories)}
              className={`nav-link section-btn ${selectedCategories[0] === button.categories[0] ? "active" : ""}`}
            >
              {translations.type?.[button.key]?.[language] || translations.type?.["tout"]?.[language] || button.key}
            </button>
          </li>
        ))}
      </ul>
    </div>

  </div>
</nav>

<div className="menu-container">
  {Object.keys(filteredItems)
    .sort((a, b) => {
      const indexA = orderedCategories.indexOf(a);
      const indexB = orderedCategories.indexOf(b);
      return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    })
    .map((category, index) => ( // أضف index هنا
      <div 
        key={category} 
        className={`menu-category ${scrolled ? "scrolled" : ""}`}
        style={{ marginTop: index === 0 ? "100px" : "0px" }} // إضافة هامش فقط لأول عنصر
      >
        <h2 className="category-title">
          {translations.type?.[category]?.[language] || category}
        </h2>
        
        <div className={`menu-grid ${category === "Petits Déjeuners" || category === "Brunch" ? "pdj-brunch" : ""}`}>
          {filteredItems[category].map((item) => (
            <div 
              key={item.id} 
              className={`menu-card ${category === "Petits Déjeuners" || category === "Brunch" ? "pdj-brunch" : ""}`}
            >
              <img 
                src={process.env.PUBLIC_URL + "/" + item.image} 
                alt={item.nom} 
                className="menu-image"
                onClick={() => handleImageClick(item.image)} 
              />
              <div className="menu-card-content">
                <h3 className="menu-item-name">
                  {translations.nom?.[item.nom]?.[language] || item.nom}
                </h3>
                
                {(category === "Petits Déjeuners" || category === "Brunch") && item.description && (
                  <p className="menu-item-description">
                    {translations.description?.[item.description]?.[language] || item.description}
                  </p>
                )}
                
                <p className="menu-item-price">{item.prix} DHS</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
</div>


      {/* نافذة عرض الصورة */}
      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div className="image-modal-content">
            <img src={process.env.PUBLIC_URL + "/" + selectedImage} alt="Selected" />
            <button className="close-button" onClick={closeModal}>X</button>
          </div>
        </div>
      )}

      {/* زر العودة إلى الأعلى */}
      {showScrollButton && (
        <div className="btn-back-to-top bg0-hov" id="myBtn" onClick={scrollToTop}>
          <span className="symbol-btn-back-to-top">
            <i className="fa fa-angle-double-up" aria-hidden="true"></i>
          </span>
        </div>
      )}
    </div>
  );
};

export default Menu;
