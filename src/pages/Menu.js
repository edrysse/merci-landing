import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import data from "../repas.json";
import translations from "../translation_template.json";
import "../App.css";

const navButtons = [
  { key: "Standard drinks", categories: ["Espresso", "Thé", "Frappuccino", "Cappuccino", "Café crème", "Ice tea", "Ice Coffee", "Fondue Au Chocolat"] },
  { key: "Sucré", categories: ["Pancake", "Crêpe", "Gaufre"] },
  { key: "Salé", categories: ["Crêpe salé"] },
  { key: "Gold drinks", categories: ["Nos Jus", "Cocktail", "Nos Smoothies", "Milk shakes"] },
  { key: "Club Sandwich", categories: ["Sandwich"] },
  { key: "Dessert", categories: ["Dessert"] },
  { key: "Petits Déjeuners", categories: ["Petits Déjeuners"] },
  { key: "Brunch", categories: ["Brunch"] },
  { key: "Supplements", categories: ["Supplements"] },
  { key: "Tout", categories: ["*"] },
];

// ترتيب العناصر حسب النوع
const groupedItems = data.reduce((groups, item) => {
  if (!groups[item.type]) {
    groups[item.type] = [];
  }
  if (!groups[item.type].some((existingItem) => existingItem.id === item.id)) {
    groups[item.type].push(item);
  }
  return groups;
}, {});

const Menu = () => {
  const { language } = useParams(); // تحديد اللغة المختارة
  const [selectedCategories, setSelectedCategories] = useState(["*"]);
  const [scrolled, setScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // تغيير اتجاه النصوص حسب اللغة
  useEffect(() => {
    document.documentElement.dir = language === "العربية" ? "rtl" : "ltr";
  }, [language]);

  const handleCategoryClick = (categories) => {
    setSelectedCategories(categories);
  };

  // تصفية العناصر حسب الفئة المختارة
  const filteredItems = selectedCategories.includes("*")
    ? groupedItems
    : Object.fromEntries(
        Object.entries(groupedItems).filter(([key]) =>
          selectedCategories.includes(key)
        )
      );

  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  useEffect(() => {
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

  return (
    <div>
      {/* قسم الصورة */}
      <section
        className="bg-title-page flex-c-m p-t-160 p-b-80 p-l-15 p-r-15"
        style={{
          backgroundImage: "url(/clientpage/images/bg-title-page-01.jpg)",
          display: "flex",
          backgroundRepeat: "no-repeat",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          flexDirection: "column",
          backgroundSize: "cover",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 className="tit6 t-center">
            {translations.type?.["Menu"]?.[language] || "Menu"}
          </h2>
          <div className="mb-4">
            <img
              className="mercilogo-autre"
              src="/clientpage/images/MERCI_IMG/LOGO/Logo-Merci-b1.png"
              alt="Logo"
              width="400px"
              height="200px"
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <a href="https://www.facebook.com/mercilaayoune">
              <img
                src="/clientpage/images/MERCI_IMG/social-media-merci/facebook-app-symbol-merci.png"
                alt="Facebook"
                width="22px"
              />
            </a>
            <a href="https://www.instagram.com/mercilaayoune1">
              <img
                className="ml-2"
                src="/clientpage/images/MERCI_IMG/social-media-merci/instagram-merci.png"
                alt="Instagram"
                width="22px"
              />
            </a>
            <a href="https://www.tiktok.com/@mercilaayoune">
              <img
                className="ml-2"
                src="/clientpage/images/MERCI_IMG/social-media-merci/tik-tok-merci.png"
                alt="TikTok"
                width="22px"
              />
            </a>
            <a href="">
              <img
                className="ml-2"
                src="/clientpage/images/MERCI_IMG/social-media-merci/snapchat.png"
                alt="Snapchat"
                width="22px"
              />
            </a>
            <a href="https://shorturl.at/cnrt1">
              <img
                className="ml-2"
                src="/clientpage/images/MERCI_IMG/social-media-merci/pin-merci.png"
                alt="Pinterest"
                width="22px"
              />
            </a>
          </div>
        </div>
      </section>

      {/* نافبار */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand section-btn" href="#">
            {translations.type?.["Menu"]?.[language] || "Menu"}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
  {navButtons.map((button) => (
    <li key={button.key} className="nav-item">
      <button
        onClick={() => handleCategoryClick(button.categories)}
        className={`nav-link section-btn ${
          selectedCategories[0] === button.categories[0] ? "active" : ""
        }`}
      >
        {translations.type?.[button.key]?.[language] || translations.type?.["tout"]?.[language] || button.key}
      </button>
    </li>
  ))}
</ul>
          </div>
        </div>
      </nav>

      {/* عرض القائمة */}
      <div className="menu-container">
        {Object.keys(filteredItems).map((category) => (
          <div key={category} className={`menu-category ${scrolled ? "scrolled" : ""}`}>
            <h2 className="category-title">
              {translations.type?.[category]?.[language] || category}
            </h2>
            <div className="menu-grid">
              {filteredItems[category].map((item) => (
                <div key={item.id} className="menu-card">
                  <img
                    src={process.env.PUBLIC_URL + "/" + item.image}
                    alt={translations.nom?.[item.nom]?.[language] || item.nom}
                    className="menu-image"
                    onClick={() => handleImageClick(item.image)}
                  />
                  <div className="menu-card-content">
                    <h3 className="menu-item-name">
                      {translations.nom?.[item.nom]?.[language] || item.nom}
                    </h3>
                    <p className="menu-item-price">{item.prix} MAD</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div className="image-modal-content">
            <img src={process.env.PUBLIC_URL + "/" + selectedImage} alt="Selected" />
            <button className="close-button" onClick={closeModal}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
