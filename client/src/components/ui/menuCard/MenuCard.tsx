import { Link } from "react-router";
import "./menuCard.css";
import type { MenuCardType } from "./menuCardType";

const MenuCard = ({ item }: { item: MenuCardType }) => {
  return (
    <>
      {item.isAvailable ? (
        <Link
          to={item.path}
          className="menu-card available"
          aria-label={`Allez vers ${item.label}`}
        >
          <span>{item.label}</span>
        </Link>
      ) : (
        <div
          className="menu-card not-available"
          aria-disabled="true"
          tabIndex={-1}
        >
          <span>{item.label}</span>
          <span>Prochainement</span>
        </div>
      )}
    </>
  );
};

export default MenuCard;
