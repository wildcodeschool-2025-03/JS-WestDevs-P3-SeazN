import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";
import "./Header.css";

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { user, isLogged, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  const greeting = isLoading
    ? "Chargement..."
    : user?.username
      ? `Bienvenue ${user.username}`
      : "Bienvenue";

  const handleLogout = () => {
    logout();
    navigate("/connexion");
  };

  return (
    <header className="header">
      <div className="header-left">
        <img
          src="/icones-logo/avatar-dg.jpg"
          alt="Avatar de l'utilisateur"
          className="user-avatar"
        />

        <span className="user-name">{greeting}</span>

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

        {!isLoading &&
          (isLogged ? (
            <button
              className="header-link"
              type="button"
              onClick={handleLogout}
            >
              Se déconnecter
            </button>
          ) : (
            <Link to="/connexion" className="header-link">
              Se connecter
            </Link>
          ))}
      </div>
    </header>
  );
};

export default Header;
