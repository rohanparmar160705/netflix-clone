import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const footerLinks = [
    { path: "/faq", label: "FAQ" },
    { path: "/help", label: "Help Center" },
    { path: "/account", label: "Account" },
    { path: "/media", label: "Media Center" },
    { path: "/investors", label: "Investor Relations" },
    { path: "/jobs", label: "Jobs" },
    { path: "/ways-to-watch", label: "Ways to Watch" },
    { path: "/terms", label: "Terms of Use" },
    { path: "/privacy", label: "Privacy" },
    { path: "/cookies", label: "Cookie Preferences" },
    { path: "/corporate", label: "Corporate Information" },
    { path: "/contact", label: "Contact Us" },
    { path: "/speedtest", label: "Speed Test" },
    { path: "/legal", label: "Legal Notices" },
    { path: "/netflix-originals", label: "Only on Netflix" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer__wrapper">
      <div className="footer">
        <p className="footer__top">
          <Link to="/contact">Questions? Contact us.</Link>
        </p>
        <ul className="footer__links">
          {footerLinks.map(({ path, label }) => (
            <li key={path} className="footer__link__item">
              <Link to={path}>{label}</Link>
            </li>
          ))}
        </ul>
        <p className="footer__country">Netflix World</p>
        <p className="footer__country">
          © {currentYear} Netflix Clone. All Rights Reserved By Rohan
        </p>
      </div>
    </footer>
  );
}

export default Footer;
