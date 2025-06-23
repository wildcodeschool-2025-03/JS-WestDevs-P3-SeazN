import { useState } from "react";
import { NavLink } from "react-router";
import "./sidebar.css";

const menuItems = [
  {
    icon: "/icones-logo/icon-dashbords2.webp",
    label: "Synthèse",
    path: "/synthese",
  },
  {
    icon: "/icones-logo/Icon-cuisine3.webp",
    label: "Ma cuisine",
    path: "/ma-cuisine",
    subItems: [
      { label: "Mes recettes", path: "/ma-cuisine/recettes" },
      { label: "Frigo", path: "/ma-cuisine/frigo" },
      { label: "Liste des courses", path: "/ma-cuisine/courses" },
      { label: "Préférences", path: "/ma-cuisine/preferences" },
      { label: "Plannificateur", path: "/ma-cuisine/plannificateur" },
    ],
  },
  {
    icon: "/icones-logo/icon-recette2.webp",
    label: "Recettes",
    path: "/recettes",
  },
  {
    icon: "/icones-logo/icon-produit2.webp",
    label: "Produits",
    path: "/produits",
    subItems: [
      { label: "Légumes de saison", path: "/produits/legumes-de-saison" },
      { label: "Analyse ingrédients", path: "/produits/analyse-ingredients" },
    ],
  },
  {
    icon: "/icones-logo/icon-nutrition2.webp",
    label: "Nutrition",
    path: "/nutrition",
  },
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openedSubmenu, setOpenedSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (label: string) => {
    setOpenedSubmenu((prev) => (prev === label ? null : label));
  };

  return (
    <aside className={`sidebar ${isExpanded ? "is-expanded" : ""}`}>
      <section className="sidebar-top">
        <div className="toggle-wrapper">
          <input
            type="checkbox"
            id="toggle-checkbox"
            checked={isExpanded}
            onChange={() => setIsExpanded((prev) => !prev)}
            hidden
          />
          <label htmlFor="toggle-checkbox" className="toggle">
            <div className="toggle-circle" />
          </label>
        </div>

        <div className="logo-wrapper">
          <img
            src="/icones-logo/N vert et orange.webp"
            alt="Logo court"
            className="logo-short"
          />
          <img
            src="/icones-logo/logo SeazN.webp"
            alt="Logo complet"
            className="logo-full"
          />
        </div>
      </section>

      <ul className="sidebar-menu">
        {menuItems.map(({ icon, label, path, subItems }) => (
          <li className="sidebar-item" key={label}>
            <NavLink
              to={path}
              className="menu-content"
              onClick={() => subItems && toggleSubmenu(label)}
            >
              <img src={icon} alt={label} className="menu-icon" />
              <span className="menu-label">{label}</span>
            </NavLink>

            {subItems && openedSubmenu === label && (
              <ul className="submenu">
                {subItems.map(({ label, path }) => (
                  <li className="submenu-item" key={label}>
                    <NavLink to={path} className="submenu-link">
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
