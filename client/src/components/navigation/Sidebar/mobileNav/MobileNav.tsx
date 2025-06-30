import Popover from "@mui/material/Popover";
import { useState } from "react";
import { NavLink } from "react-router";
import { menuItems } from "../../../../data/menu-Items";
import { LanguageIcon, UserIcon } from "../../../ui/Icons/Icons";
import "./MobileNav.css";

const MobileNav = () => {
  const [openedSubmenu, setOpenedSubmenu] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const toggleSubmenu = (label: string, el: HTMLElement) => {
    setOpenedSubmenu((prev) => (prev === label ? null : label));
    setAnchorEl(openedSubmenu === label ? null : el);
  };

  const handleClose = () => {
    setOpenedSubmenu(null);
    setAnchorEl(null);
  };

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
          <div
            key={label}
            className={`nav-item ${label === "Synthèse" ? "synthese" : ""}`}
          >
            <NavLink
              to={path}
              onClick={(e) => {
                if (subItems) {
                  toggleSubmenu(label, e.currentTarget);
                } else {
                  handleClose();
                }
              }}
            >
              {label === "Synthèse" ? (
                <div className="center-icon">
                  <img src={icon} alt={label} />
                </div>
              ) : (
                <img src={icon} alt={label} />
              )}
            </NavLink>

            {subItems && openedSubmenu === label && (
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                transformOrigin={{ vertical: "bottom", horizontal: "center" }}
                slotProps={{
                  paper: {
                    className: "popover-menu",
                  },
                }}
              >
                <div className="submenu-wrapper">
                  {subItems.map(({ label: subLabel, path }) => (
                    <NavLink
                      key={subLabel}
                      to={path}
                      onClick={handleClose}
                      className="submenu-item"
                    >
                      {subLabel}
                    </NavLink>
                  ))}
                </div>
              </Popover>
            )}
          </div>
        ))}
      </nav>
    </>
  );
};

export default MobileNav;
