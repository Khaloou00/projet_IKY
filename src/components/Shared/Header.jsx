import React, { useState, useCallback, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router";
import Logospb from "../../assets/images/Logo_superbie.png";

import {
  FaCartArrowDown,
  FaBars,
  FaTimes,
  FaHome,
  FaNewspaper,
  FaStore,
  FaChevronDown,
  FaBlog,
  FaTools,
  FaHeadset,
  FaUser,
  FaSignInAlt,
  FaEnvelopeOpenText,
  FaSearch,
} from "react-icons/fa";

// ============================================
// DONNÉES DE NAVIGATION
// ============================================
const NAV_LINKS = [
  { to: "/", label: "Accueil", icon: FaHome },
  { to: "/articles", label: "Articles", icon: FaNewspaper },
  { to: "/boutique", label: "Boutique", icon: FaStore },
];

const CONTACT_LINKS = [
  { to: "/blog", label: "Blog", icon: FaBlog, color: "text-green-600" },
  {
    to: "/services-it",
    label: "Service Informatique",
    icon: FaTools,
    color: "text-blue-600",
  },
  {
    to: "/support",
    label: "Service Client",
    icon: FaHeadset,
    color: "text-purple-600",
  },
];

// ============================================
// COMPOSANTS RÉUTILISABLES
// ============================================
const NavLinkItem = ({ to, label, icon: Icon, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-2 hover:text-yellow-300 transition-colors duration-200 ${
        isActive ? "text-yellow-400 font-bold" : ""
      }`
    }
  >
    <Icon /> {label}
  </NavLink>
);

const MobileNavLink = ({ to, label, icon: Icon, onClick, badge }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors ${
        isActive ? "bg-white/20 text-yellow-400" : ""
      }`
    }
  >
    <Icon className="text-xl" /> {label}
    {badge !== undefined && badge > 0 && (
      <span className="ml-auto bg-yellow-500 text-white rounded-full px-2 py-1 text-xs font-bold">
        {badge}
      </span>
    )}
  </NavLink>
);

const DropdownItem = ({ to, label, icon: Icon, color, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
  >
    <Icon className={color} /> {label}
  </Link>
);

// ============================================
// COMPOSANT PRINCIPAL
// ============================================
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [contactMenuOpen, setContactMenuOpen] = useState(false);
  const [cartCount] = useState(100);

  const contactRef = useRef(null);
  const userRef = useRef(null);

  // Fermer les menus au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contactRef.current && !contactRef.current.contains(event.target)) {
        setContactMenuOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeAllMenus = useCallback(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
    setContactMenuOpen(false);
  }, []);

  const toggleContactMenu = useCallback((e) => {
    e.stopPropagation();
    setContactMenuOpen((prev) => !prev);
    setUserMenuOpen(false);
  }, []);

  const toggleUserMenu = useCallback((e) => {
    e.stopPropagation();
    setUserMenuOpen((prev) => !prev);
    setContactMenuOpen(false);
  }, []);

  return (
    <div className="fixed w-full top-0 z-50 bg-green-900/30 backdrop-blur-xl border-b border-green-500/25 shadow-lg">
      <nav className="layout flex justify-between items-center py-3 px-4 lg:px-8">
        {/* LOGO */}
        <Link to="/" onClick={closeAllMenus} className="flex-shrink-0">
          <img
            src={Logospb}
            alt="Logo"
            className="w-[130px] rounded-md shadow-lg hover:scale-110 transition-transform duration-300"
          />
        </Link>

        {/* BARRE DE RECHERCHE - Desktop (juste après le logo) */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-6">
          <div className="relative w-[90%]">
            <input
              type="text"
              placeholder="Rechercher des produits, articles..."
              className="w-full bg-white/20 text-white placeholder-white/70 px-4 py-2 pr-10 rounded-full outline-none focus:bg-white/30 focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
              aria-label="Rechercher"
            />
            <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70" />
          </div>
        </div>

        {/* MENU DESKTOP */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-base font-medium text-white">
          {/* Navigation principale */}
          {NAV_LINKS.map((link) => (
            <NavLinkItem key={link.to} {...link} onClick={closeAllMenus} />
          ))}

          {/* Dropdown Contact */}
          <div className="relative" ref={contactRef}>
            <button
              className="flex items-center gap-2 hover:text-yellow-300 transition-colors duration-200"
              onClick={toggleContactMenu}
              aria-expanded={contactMenuOpen}
              aria-label="Menu contact"
            >
              <FaEnvelopeOpenText />
              Contact
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  contactMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {contactMenuOpen && (
              <div className="absolute top-full mt-2 right-0 bg-white text-black shadow-2xl rounded-lg py-2 w-56 animate-fadeIn z-50">
                {CONTACT_LINKS.map((link) => (
                  <DropdownItem
                    key={link.to}
                    {...link}
                    onClick={closeAllMenus}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Dropdown Utilisateur */}
          <div className="relative" ref={userRef}>
            <button
              className="flex items-center gap-2 hover:text-yellow-300 transition-colors duration-200"
              onClick={toggleUserMenu}
              aria-expanded={userMenuOpen}
              aria-label="Menu utilisateur"
            >
              <FaUser />
              Se connecter
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  userMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {userMenuOpen && (
              <div className="absolute top-full mt-2 right-0 bg-white text-black shadow-2xl rounded-lg py-2 w-64 animate-fadeIn z-50">
                <div className="px-4 py-3 text-sm text-gray-500 border-b">
                  Connectez-vous pour accéder à votre compte
                </div>
                <DropdownItem
                  to="/login"
                  label="Se connecter"
                  icon={FaSignInAlt}
                  color="text-green-600"
                  onClick={closeAllMenus}
                />
              </div>
            )}
          </div>

          {/* Panier */}
          <Link
            to="/cart"
            className="relative flex-shrink-0"
            onClick={closeAllMenus}
            aria-label="Panier"
          >
            <FaCartArrowDown className="text-3xl hover:text-yellow-300 transition-colors duration-200" />
            {cartCount > 0 && (
              <span className="absolute bg-yellow-500/95 text-white rounded-full px-2 py-1 text-[12px] font-bold -top-2 -right-5 shadow-md">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* BOUTON HAMBURGER MOBILE */}
        <button
          className="lg:hidden text-white text-2xl hover:text-yellow-300 transition-colors duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu mobile"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* BARRE DE RECHERCHE MOBILE (Style Jumia) */}
      <div className="lg:hidden bg-green-800/10 backdrop-blur-lg px-4 py-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Recherchez un produit ou un catégorie ..."
            className="w-full bg-white text-gray-800 placeholder-gray-500 px-4 py-2.5 pr-10 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
            aria-label="Rechercher"
          />
          <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* MENU MOBILE (Style Jumia) */}
      {menuOpen && (
        <div className="lg:hidden bg-white text-gray-800 animate-slideDown shadow-xl">
          {/* Navigation mobile */}
          <div className="border-b border-gray-200">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeAllMenus}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    isActive ? "bg-green-50 text-green-700 font-semibold" : ""
                  }`
                }
              >
                <link.icon className="text-lg" /> {link.label}
              </NavLink>
            ))}
          </div>

          {/* Section Contact Mobile */}
          <div className="border-b border-gray-200">
            <button
              className="flex items-center justify-between w-full px-6 py-4 hover:bg-gray-50 transition-colors"
              onClick={() => setContactMenuOpen(!contactMenuOpen)}
              aria-expanded={contactMenuOpen}
            >
              <span className="flex items-center gap-3 font-medium">
                <FaEnvelopeOpenText className="text-lg" /> Contact
              </span>
              <FaChevronDown
                className={`transition-transform duration-300 text-gray-600 ${
                  contactMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {contactMenuOpen && (
              <div className="bg-gray-50 animate-fadeIn">
                {CONTACT_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={closeAllMenus}
                    className="flex items-center gap-3 px-12 py-3 hover:bg-gray-100 transition-colors border-t border-gray-200"
                  >
                    <link.icon className={link.color} /> {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Section Compte */}
          <div className="border-b border-gray-200">
            <Link
              to="/login"
              onClick={closeAllMenus}
              className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <FaUser className="text-lg" />
              <div>
                <div className="font-medium">Mon Compte</div>
                <div className="text-xs text-gray-500">
                  Se connecter / S'inscrire
                </div>
              </div>
            </Link>
          </div>

          {/* Panier Mobile */}
          <Link
            to="/cart"
            onClick={closeAllMenus}
            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FaCartArrowDown className="text-lg" />
              <span className="font-medium">Mon Panier</span>
            </div>
            {cartCount > 0 && (
              <span className="bg-orange-500 text-white rounded-full px-3 py-1 text-sm font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
