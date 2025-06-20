import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-right">
        <a href="/contact">Nous contacter</a>
        <a href="/mentions-legales">Mentions légales</a>
        <a href="/cgu">CGU</a>

        <img
          src="/icones-logo/github-mark-white.svg"
          alt="GitHub"
          className="github-logo"
        />
      </div>
    </footer>
  );
};

export default Footer;
