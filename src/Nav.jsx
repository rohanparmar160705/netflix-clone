// used rfce to make this skeleton

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useLocation, NavLink } from "react-router-dom";
import netflixLogo from "./images/netflix-logo.png";
import userIcon from "./images/user.svg";
import "./Nav.css";

function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef();

  const handleScroll = useCallback(() => {
    const scrollThreshold = 80;
    setIsScrolled(window.scrollY > scrollThreshold);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    // Toggle body scroll when menu is open
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [location.pathname, isMenuOpen]);

  const navLinks = [
    { path: "/", label: "Home", exact: true },
    { path: "/tv", label: "TV Shows" },
    { path: "/movies", label: "Movies" },
  ];

  const renderNavLinks = (isMobile = false) =>
    navLinks.map(({ path, label, exact }) => (
      <NavLink
        key={path}
        exact={exact}
        to={path}
        className={isMobile ? "nav__mobile-link" : "nav__link"}
        activeClassName="active"
      >
        {label}
      </NavLink>
    ));

  return (
    <nav className={`nav ${isScrolled || isMenuOpen ? "nav__black" : ""}`}>
      <div className="nav__contents">
        <div className="nav__left">
          <NavLink to="/" className="nav__logo-link">
            <img
              className="nav__logo"
              src={netflixLogo}
              alt="Netflix Logo"
              loading="lazy"
            />
          </NavLink>
          <div className={`nav__links ${isMenuOpen ? "show" : ""}`}>
            {renderNavLinks()}
          </div>
        </div>

        <div className="nav__right">
          <NavLink to="/profile" className="nav__avatar-link">
            <img
              className="nav__avatar"
              src={userIcon}
              alt="User Profile"
              loading="lazy"
            />
          </NavLink>
          <button
            className={`nav__menu-button ${isMenuOpen ? "active" : ""}`}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            type="button"
          >
            {[...Array(3)].map((_, index) => (
              <span key={index} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className={`nav__mobile-menu ${isMenuOpen ? "show" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        {renderNavLinks(true)}
      </div>
    </nav>
  );
}

export default Nav;
