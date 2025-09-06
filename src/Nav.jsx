// used rfce to make this skeleton

import React, { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import netflixLogo from "./images/netflix-logo.png";
import userIcon from "./images/user.svg";
import "./Nav.css";

function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const location = useLocation();

  const handleScroll = () => {
    const scrollThreshold = 80;
    setIsScrolled(window.scrollY > scrollThreshold);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home", exact: true },
    { path: "/tv", label: "TV Shows" },
    { path: "/movies", label: "Movies" },
  ];

  return (
    <nav className={`nav ${isScrolled ? "nav__black" : ""}`}>
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
          <div className="nav__links">
            {navLinks.map(({ path, label, exact }) => (
              <NavLink
                key={path}
                exact={exact}
                to={path}
                className="nav__link"
                activeClassName="active"
              >
                {label}
              </NavLink>
            ))}
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
        </div>
      </div>
    </nav>
  );
}

export default Nav;
