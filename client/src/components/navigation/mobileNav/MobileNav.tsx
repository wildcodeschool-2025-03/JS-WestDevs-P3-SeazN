import { useState } from "react";
import { NavLink } from "react-router";
import { LanguageIcon, UserIcon } from "../../ui/Icons/Icons";
import { menuItems } from "../data/menu-Items";
import "./MobileNav.css";

const MobileNav = () => {
  const [openedPopover, setOpenedPopover] = useState<string | null>(null);

  const togglePopover = (label: string) => {
    setOpenedPopover((prev) => (prev === label ? null : label));
  };

  const reorderMenuForMobile = (items: typeof menuItems) => {
    return [items[1], items[2], items[0], items[3], items[4]];
  };

  const orderItems = reorderMenuForMobile(menuItems);

  return (
    <section className="mobile-section">
      <header>
        <img src="/icones-logo/N vert et orange.webp" alt="Logo" />
        <div>
          <LanguageIcon />
          <UserIcon />
        </div>
      </header>

      <nav>
        {orderItems.map(({ icon, label, path, subItems }) => {
          const popoverId = label;

          return (
            <div key={label} className={label === "Synthèse" ? "synthese" : ""}>
              {subItems ? (
                <>
                  <button
                    type="button"
                    className="popover-button"
                    onClick={() => togglePopover(label)}
                    popoverTarget={popoverId}
                    aria-haspopup="menu"
                    aria-expanded={!!openedPopover}
                    aria-controls={popoverId}
                  >
                    {label === "Synthèse" ? (
                      <div className="center-icon">
                        <div>
                          <img src={icon} alt={label} />
                        </div>
                      </div>
                    ) : (
                      <img src={icon} alt={label} />
                    )}
                  </button>
                  {openedPopover && (
                    <div
                      id={popoverId}
                      popover="auto"
                      className="popover-menu"
                      role="menu"
                    >
                      <div className="submenu-wrapper">
                        {subItems.map(({ label: subLabel, path }) => (
                          <NavLink
                            key={subLabel}
                            to={path}
                            className="submenu-item"
                            role="menuitem"
                            onClick={() => setOpenedPopover(null)}
                          >
                            {subLabel}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <NavLink to={path}>
                  {label === "Synthèse" ? (
                    <div className="center-icon">
                      <img src={icon} alt={label} />
                    </div>
                  ) : (
                    <img src={icon} alt={label} />
                  )}
                </NavLink>
              )}
            </div>
          );
        })}
      </nav>
    </section>
  );
};

export default MobileNav;
