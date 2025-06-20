import { useState } from "react";
import "./Sidebar.css";

const menuItems = [
  { icon: "/icones-logo/icon-dashbords2.webp", label: "Synthèse" },
  { icon: "/icones-logo/Icon-cuisine3.webp", label: "Ma cuisine" },
  { icon: "/icones-logo/icon-recette2.webp", label: "Recettes" },
  { icon: "/icones-logo/icon-produit2.webp", label: "Produits" },
  { icon: "/icones-logo/icon-nutrition2.webp", label: "Nutrition" },
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <nav className={`sidebar ${isExpanded ? "is-expanded" : ""}`}>
      <div className="sidebar-top">
        <div className="toggle-wrapper">
          <input
            type="checkbox"
            id="toggle-checkbox"
            checked={isExpanded}
            onChange={() => setIsExpanded((prev) => !prev)}
            hidden
          />
          <label htmlFor="toggle-checkbox" className="toggle">
            <div className="toggle__circle" />
          </label>
        </div>

        <div className="logo-wrapper">
          <img
            src="/icones-logo/N vert et orange.webp"
            alt="Logo court"
            className="logo short"
          />
          <img
            src="/icones-logo/logo SeazN.webp"
            alt="Logo complet"
            className="logo full"
          />
        </div>
      </div>

      <div className="sidebar-menu">
        {menuItems.map(({ icon, label }) => (
          <div className="sidebar-item" key={label}>
            <div className="menu-content">
              <img src={icon} alt={label} className="menu-icon" />
              <span className="menu-label">{label}</span>
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
