import React from "react";
import { Link } from "react-router";
import Logospb from "/Logospb.png";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHome,
  FaNewspaper,
  FaStore,
  FaBlog,
  FaTools,
  FaHeadset,
  FaInfoCircle,
  FaShieldAlt,
  FaFileContract,
  FaHeart,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-900/80 backdrop-blur-md border-b border-green-500/25 text-white">
      {/* ============================================
          SECTION PRINCIPALE DU FOOTER
          ============================================ */}
      <div className="layout py-12 px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* ============================================
              COLONNE 1 : LOGO + SLOGAN + DESCRIPTION
              ============================================ */}
          <div className="space-y-2">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Link to="/" className="inline-block">
                <img
                  src={Logospb}
                  alt="Logo Approbat Services"
                  className="w-[70px] sm:w-[è0px] md:w-[70px] rounded-md shadow-lg hover:scale-110 transition-transform duration-300"
                />
              </Link>{" "}
              <h3 className="text-2xl font-bold text-yellow-400">SuperBe✨</h3>
            </div>
            {/* Slogan */}

            <p className="text-green-200 font-medium italic">
              "Construisez votre avenir avec nous"
            </p>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed">
              Votre partenaire de confiance pour des solutions professionnelles
              et innovantes. Nous vous accompagnons dans tous vos projets avec
              expertise et passion.
            </p>
          </div>

          {/* ============================================
              COLONNE 2 : LIENS UTILES
              ============================================ */}
          <div className="w-xl">
            <h4 className="text-xl font-bold text-yellow-400 border-b-2 border-yellow-400 pb-2 inline-block">
              Liens Utiles
            </h4>

            <ul className="space-y-1">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-gray-300 hover:text-yellow-300 transition-colors duration-200 group"
                >
                  <FaHome className="group-hover:translate-x-1 transition-transform" />
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/articles"
                  className="flex items-center gap-2 text-gray-300 hover:text-yellow-300 transition-colors duration-200 group"
                >
                  <FaNewspaper className="group-hover:translate-x-1 transition-transform" />
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  to="/boutique"
                  className="flex items-center gap-2 text-gray-300 hover:text-yellow-300 transition-colors duration-200 group"
                >
                  <FaStore className="group-hover:translate-x-1 transition-transform" />
                  Boutique
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="flex items-center gap-2 text-gray-300 hover:text-yellow-300 transition-colors duration-200 group"
                >
                  <FaBlog className="group-hover:translate-x-1 transition-transform" />
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/services-it"
                  className="flex items-center gap-2 text-gray-300 hover:text-yellow-300 transition-colors duration-200 group"
                >
                  <FaTools className="group-hover:translate-x-1 transition-transform" />
                  Service Informatique
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="flex items-center gap-2 text-gray-300 hover:text-yellow-300 transition-colors duration-200 group"
                >
                  <FaHeadset className="group-hover:translate-x-1 transition-transform" />
                  Service Client
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="flex items-center gap-2 text-gray-300 hover:text-yellow-300 transition-colors duration-200 group"
                >
                  <FaInfoCircle className="group-hover:translate-x-1 transition-transform" />
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          {/* ============================================
              COLONNE 3 : RÉSEAUX SOCIAUX
              ============================================ */}
          <div className="space-y-1">
            <h4 className="text-xl font-bold text-yellow-400 border-b-2 border-yellow-400 pb-2 inline-block">
              Suivez-nous
            </h4>

            <p className="text-gray-300 text-sm">
              Restez connecté avec nous sur les réseaux sociaux pour ne rien
              manquer de nos actualités et offres exclusives.
            </p>

            {/* Icônes des réseaux sociaux */}
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-900/30 backdrop-blur-xl border-b border-green-500/25 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-xl" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-900/30 backdrop-blur-xl border-b border-green-500/25 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Twitter"
              >
                <FaTwitter className="text-xl" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-900/30 backdrop-blur-xl border-b border-green-500/25 hover:via-pink-700 hover:to-orange-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-900/30 backdrop-blur-xl border-b border-green-500/25 hover:bg-blue-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="text-xl" />
              </a>

              <a
                href="https://wa.me/2250000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-900/30 backdrop-blur-xl border-b border-green-500/25 **:hover:bg-green-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="text-xl" />
              </a>
            </div>

            {/* Section Newsletter */}
            <div className="pt-4">
              <h5 className="text-lg font-semibold text-yellow-300 mb-2">
                Newsletter
              </h5>
              <p className="text-gray-300 text-sm mb-3">
                Inscrivez-vous pour recevoir nos dernières actualités
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                />
                <button className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold rounded-lg transition-colors duration-200">
                  OK
                </button>
              </div>
            </div>
          </div>

          {/* ============================================
              COLONNE 4 : CONTACT
              ============================================ */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-yellow-400 border-b-2 border-yellow-400 pb-2 inline-block">
              Contactez-nous
            </h4>

            <p className="text-gray-300 text-sm">
              Nous sommes à votre écoute. N'hésitez pas à nous contacter pour
              toute question ou demande d'information.
            </p>

            {/* Informations de contact */}
            <div className="space-y-4 pt-2">
              {/* Téléphone */}
              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/30 transition-colors">
                  <FaPhone className="text-yellow-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase">Téléphone</p>
                  <a
                    href="tel:+2250000000000"
                    className="text-white hover:text-yellow-300 transition-colors font-medium"
                  >
                    +225 00 00 00 00 00
                  </a>
                  <br />
                  <a
                    href="tel:+2250000000000"
                    className="text-white hover:text-yellow-300 transition-colors font-medium"
                  >
                    +225 00 00 00 00 00
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/30 transition-colors">
                  <FaEnvelope className="text-yellow-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase">Email</p>
                  <a
                    href="mailto:contact@approbat.com"
                    className="text-white hover:text-yellow-300 transition-colors font-medium break-all"
                  >
                    contact@approbat.com
                  </a>
                  <br />
                  <a
                    href="mailto:support@approbat.com"
                    className="text-white hover:text-yellow-300 transition-colors font-medium break-all"
                  >
                    support@approbat.com
                  </a>
                </div>
              </div>

              {/* Adresse */}
              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/30 transition-colors">
                  <FaMapMarkerAlt className="text-yellow-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase">Adresse</p>
                  <p className="text-white font-medium">
                    Abidjan, Cocody Riviera
                    <br />
                    Côte d'Ivoire
                  </p>
                </div>
              </div>

              {/* Horaires */}
              <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20">
                <p className="text-xs text-gray-400 uppercase mb-1">
                  Horaires d'ouverture
                </p>
                <p className="text-white text-sm font-medium">
                  Lun - Ven : 8h00 - 18h00
                </p>
                <p className="text-white text-sm font-medium">
                  Sam : 9h00 - 13h00
                </p>
                <p className="text-gray-400 text-sm">Dimanche : Fermé</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================
          SECTION LÉGALE ET COPYRIGHT
          ============================================ */}
      <div className="border-t border-green-800">
        <div className="layout py-6 px-4 lg:px-8">
          {/* Liens légaux */}
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <Link
              to="/privacy"
              className="flex items-center gap-2 text-gray-300 hover:text-yellow-300 transition-colors text-sm"
            >
              <FaShieldAlt />
              Politique de confidentialité
            </Link>
            <Link
              to="/terms"
              className="flex items-center gap-2 text-gray-300 hover:text-yellow-300 transition-colors text-sm"
            >
              <FaFileContract />
              Conditions d'utilisation
            </Link>
            <Link
              to="/cookies"
              className="flex items-center gap-2 text-gray-300 hover:text-yellow-300 transition-colors text-sm"
            >
              <FaInfoCircle />
              Politique des cookies
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()}{" "}
              <span className="text-yellow-400 font-semibold">SuperBe</span>.
              Tous droits réservés.
            </p>
            <p className=" text-xs mt-1 flex items-center justify-center gap-1">
              Fait avec <FaHeart className="text-red-500 animate-pulse" /> en
              Côte d'Ivoire
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
