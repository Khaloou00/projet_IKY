import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import Logospb from "/Logospb.png";

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
} from "react-icons/fa";

const Header = () => {
  // ============================================
  // ÉTATS POUR GÉRER L'OUVERTURE DES MENUS
  // ============================================
  const [menuOpen, setMenuOpen] = useState(false); // Menu mobile
  const [userMenuOpen, setUserMenuOpen] = useState(false); // Dropdown utilisateur
  const [contactMenuOpen, setContactMenuOpen] = useState(false); // Dropdown contact

  // ============================================
  // FONCTION POUR FERMER TOUS LES MENUS
  // ============================================
  const closeAllMenus = () => {
    setMenuOpen(false);
    setUserMenuOpen(false);
    setContactMenuOpen(false);
  };

  return (
    // ============================================
    // CONTENEUR PRINCIPAL - STICKY HEADER
    // ============================================
    <div className="fixed w-full top-0 z-50 bg-green-900/30 backdrop-blur-xl border-b border-green-500/25 shadow-lg">
      <nav className="layout flex justify-between items-center py-3 px-4 lg:px-8">
        {/* ============================================
            LOGO - Cliquable vers l'accueil
            ============================================ */}
        <Link to={"/"} onClick={closeAllMenus}>
          <img
            src={Logospb}
            alt="Logo"
            className="w-[70px] sm:w-[è0px] md:w-[70px] rounded-md shadow-lg hover:scale-110 transition-transform duration-300"
          />
        </Link>

        {/* ============================================
            MENU DESKTOP - Visible sur écrans moyens et grands
            ============================================ */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-10 text-base xl:text-lg font-medium text-white">
          {/* Lien Accueil */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 hover:text-yellow-300 transition-colors duration-200 ${
                isActive ? "text-yellow-400 font-bold" : ""
              }`
            }
          >
            <FaHome /> Accueil
          </NavLink>

          {/* Lien Articles */}
          <NavLink
            to="/articles"
            className={({ isActive }) =>
              `flex items-center gap-2 hover:text-yellow-300 transition-colors duration-200 ${
                isActive ? "text-yellow-400 font-bold" : ""
              }`
            }
          >
            <FaNewspaper /> Articles
          </NavLink>

          {/* Lien Boutique */}
          <NavLink
            to="/boutique"
            className={({ isActive }) =>
              `flex items-center gap-2 hover:text-yellow-300 transition-colors duration-200 ${
                isActive ? "text-yellow-400 font-bold" : ""
              }`
            }
          >
            <FaStore /> Boutique
          </NavLink>

          {/* ============================================
              DROPDOWN CONTACT - Menu déroulant
              ============================================ */}
          <div className="relative">
            <button
              className="flex items-center gap-2 hover:text-yellow-300 transition-colors duration-200"
              onClick={() => {
                setContactMenuOpen(!contactMenuOpen);
                setUserMenuOpen(false); // Fermer l'autre dropdown
              }}
            >
              <FaEnvelopeOpenText />
              Contact
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  contactMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Sous-menu Contact */}
            {contactMenuOpen && (
              <div className="absolute top-12 right-0 bg-white text-black shadow-2xl rounded-lg py-2 w-56 animate-fadeIn">
                <Link
                  to="/blog"
                  onClick={closeAllMenus}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                >
                  <FaBlog className="text-green-600" /> Blog
                </Link>
                <Link
                  to="/services-it"
                  onClick={closeAllMenus}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                >
                  <FaTools className="text-blue-600" /> Service Informatique
                </Link>
                <Link
                  to="/support"
                  onClick={closeAllMenus}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                >
                  <FaHeadset className="text-purple-600" /> Service Client
                </Link>
              </div>
            )}
          </div>

          {/* ============================================
              BARRE DE RECHERCHE - Desktop uniquement
              ============================================ */}
          <input
            type="text"
            placeholder="Rechercher..."
            className="hidden xl:block bg-white/20 text-white placeholder-white/70 px-4 py-2 rounded-full outline-none focus:bg-white/30 focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
          />

          {/* ============================================
              DROPDOWN UTILISATEUR - Menu Se connecter
              ============================================ */}
          <div className="relative">
            <button
              className="flex items-center gap-2 hover:text-yellow-300 transition-colors duration-200"
              onClick={() => {
                setUserMenuOpen(!userMenuOpen);
                setContactMenuOpen(false); // Fermer l'autre dropdown
              }}
            >
              <FaUser />
              Se connecter
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  userMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Sous-menu Utilisateur */}
            {userMenuOpen && (
              <div className="absolute top-12 right-0 bg-white text-black shadow-2xl rounded-lg py-2 w-64 animate-fadeIn">
                <div className="px-4 py-3 text-sm text-gray-500 border-b">
                  Connectez-vous pour accéder à votre compte
                </div>

                <Link
                  to="/login"
                  onClick={closeAllMenus}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                >
                  <FaSignInAlt className="text-green-600" /> Se connecter
                </Link>
              </div>
            )}
          </div>

          {/* ============================================
              PANIER - Avec badge de quantité
              ============================================ */}
          <Link to={"/cart"} className="relative" onClick={closeAllMenus}>
            <FaCartArrowDown className="text-2xl hover:text-yellow-300 transition-colors duration-200" />
            <span className="absolute bg-yellow-500 text-white rounded-full px-2 py-1 text-[10px] font-bold -top-2 -right-2 shadow-md">
              0
            </span>
          </Link>
        </div>

        {/* ============================================
            BOUTON HAMBURGER - Mobile et Tablette
            ============================================ */}
        <button
          className="lg:hidden text-white text-2xl hover:text-yellow-300 transition-colors duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* ============================================
          MENU MOBILE - Visible uniquement sur petits écrans
          ============================================ */}
      {menuOpen && (
        <div className="lg:hidden bg-green-900/95 backdrop-blur-xl text-white flex flex-col gap-1 p-4 border-t border-green-500/25 animate-slideDown">
          {/* ============================================
              NAVIGATION MOBILE
              ============================================ */}
          <NavLink
            to="/"
            onClick={closeAllMenus}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors ${
                isActive ? "bg-white/20 text-yellow-400" : ""
              }`
            }
          >
            <FaHome className="text-xl" /> Accueil
          </NavLink>

          <NavLink
            to="/articles"
            onClick={closeAllMenus}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors ${
                isActive ? "bg-white/20 text-yellow-400" : ""
              }`
            }
          >
            <FaNewspaper className="text-xl" /> Articles
          </NavLink>

          <NavLink
            to="/boutique"
            onClick={closeAllMenus}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors ${
                isActive ? "bg-white/20 text-yellow-400" : ""
              }`
            }
          >
            <FaStore className="text-xl" /> Boutique
          </NavLink>

          {/* ============================================
              SECTION CONTACT MOBILE - Sous-menu déroulant
              ============================================ */}
          <div>
            <button
              className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setContactMenuOpen(!contactMenuOpen)}
            >
              <span className="flex items-center gap-3">
                <FaEnvelopeOpenText className="text-xl" /> Contact
              </span>
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  contactMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Sous-menu Contact Mobile */}
            {contactMenuOpen && (
              <div className="pl-8 mt-2 space-y-1 animate-fadeIn">
                <Link
                  to="/blog"
                  onClick={closeAllMenus}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <FaBlog /> Blog
                </Link>
                <Link
                  to="/services-it"
                  onClick={closeAllMenus}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <FaTools /> Service Informatique
                </Link>
                <Link
                  to="/support"
                  onClick={closeAllMenus}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <FaHeadset /> Service Client
                </Link>
              </div>
            )}
          </div>

          {/* Lien Se connecter Mobile */}
          <NavLink
            to="/login"
            onClick={closeAllMenus}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors ${
                isActive ? "bg-white/20 text-yellow-400" : ""
              }`
            }
          >
            <FaUser className="text-xl" /> Se connecter
          </NavLink>

          {/* Lien Panier Mobile */}
          <NavLink
            to="/cart"
            onClick={closeAllMenus}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors ${
                isActive ? "bg-white/20 text-yellow-400" : ""
              }`
            }
          >
            <FaCartArrowDown className="text-xl" /> Panier
            <span className="ml-auto bg-yellow-500 text-white rounded-full px-2 py-1 text-xs font-bold">
              0
            </span>
          </NavLink>

          {/* ============================================
              BARRE DE RECHERCHE MOBILE
              ============================================ */}
          <div className="mt-2 pt-2 border-t border-white/20">
            <input
              type="text"
              placeholder="Rechercher…"
              className="w-full bg-white/20 text-white placeholder-white/70 px-4 py-3 rounded-lg outline-none focus:bg-white/30 focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
