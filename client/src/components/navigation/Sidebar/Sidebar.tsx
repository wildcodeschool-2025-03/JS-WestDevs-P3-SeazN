import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { menuItems } from "../../../data/menu-Items";
import "./sidebar.css";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openedSubmenu, setOpenedSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (label: string) =>
    setOpenedSubmenu((prev) => (prev === label ? null : label));

  useEffect(() => {
    if (!isExpanded) setOpenedSubmenu(null);
  }, [isExpanded]);

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
          <li key={label}>
            <NavLink
              to={path}
              end={!subItems}
              onClick={() =>
                subItems ? toggleSubmenu(label) : setOpenedSubmenu(null)
              }
            >
              <img src={icon} alt={label} />
              <span>{label}</span>
            </NavLink>

            {isExpanded && subItems && openedSubmenu === label && (
              <ul>
                {subItems.map((item) => (
                  <li key={item.label}>
                    <NavLink to={item.path}>{item.label}</NavLink>
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
