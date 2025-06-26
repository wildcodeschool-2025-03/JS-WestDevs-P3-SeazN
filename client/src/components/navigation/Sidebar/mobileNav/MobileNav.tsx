import { useState } from "react";
import { NavLink } from "react-router";
import { menuItems } from "../../../../data/menu-Items";
import { LanguageIcon, UserIcon } from "../../../ui/Icons/Icons";
import "./MobileNav.css";

const MobileNav = () => {
  const [openedSubmenu, setOpenedSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (label: string) =>
    setOpenedSubmenu((prev) => (prev === label ? null : label));

  return (
    <>
      <header className="mobile-header">
        <img src="/icones-logo/N vert et orange.webp" alt="Logo" />
        <div className="icon-mobile">
          <LanguageIcon />
          <UserIcon />
        </div>
      </header>

      <nav className="mobile-footer">
        {menuItems.map(({ icon, label, path, subItems }) => (
          <div key={label}>
            <NavLink
              to={path}
              onClick={(e) => {
                if (subItems) {
                  e.preventDefault();
                  toggleSubmenu(label);
                } else {
                  setOpenedSubmenu(null);
                }
              }}
            >
              <img
                src={icon}
                alt={label}
                className={label === "Synthèse" ? "center-icon" : undefined}
              />
            </NavLink>

            {subItems && openedSubmenu === label && (
              <div>
                {subItems.map(({ label: subLabel, path }) => (
                  <NavLink key={subLabel} to={path}>
                    {subLabel}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </>
  );
};

export default MobileNav;
