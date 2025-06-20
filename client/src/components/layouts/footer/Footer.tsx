import "./footer.css";
import { Link } from "react-router";
import { GithubIcon } from "../../ui/Icons/Icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-right">
        <Link to="/contact">Nous contacter</Link>
        <Link to="/mentions-legales">Mentions légales</Link>
        <Link to="/cgu">CGU</Link>

        <Link to="https://github.com/wildcodeschool-2025-03/JS-WestDevs-P3-SeazN.git">
          <GithubIcon className="github-icon" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
