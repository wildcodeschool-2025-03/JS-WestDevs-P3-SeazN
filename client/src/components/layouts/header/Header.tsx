import { useState } from "react";
import { Link } from "react-router";
import "./Header.css";

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const userName = "Jean-Michmich";

  return (
    <header className="header">
      <div className="header-left">
        <img
          src="/icones-logo/avatar-dg.jpg"
          alt="Avatar de l'utilisateur"
          className="user-avatar"
        />

        <span className="user-name">{userName}</span>
        <button
          type="button"
          className="search-toggle"
          onClick={() => setIsSearchVisible((prev) => !prev)}
        >
          🔍
        </button>

        {isSearchVisible && (
          <input
            type="search"
            className="search-input"
            placeholder="Rechercher une recette, ingrédient..."
          />
        )}
      </div>

      <div className="header-right">
        <Link to="/langage" className="header-link">
          Langage
        </Link>
        <Link to="/connexion" className="header-link">
          Se connecter
        </Link>
      </div>
    </header>
  );
};

export default Header;
