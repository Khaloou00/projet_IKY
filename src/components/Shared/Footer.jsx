import React from "react";
import { Link } from "react-router";
import Logospb from "../../assets/images/Logo_superbie.png";

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
    <footer className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-700/3 rounded-full blur-3xl"></div>
      </div>

      {/* Main footer content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto py-5 px-1 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* ============================================
                COLONNE 1 : LOGO + SLOGAN + DESCRIPTION
                ============================================ */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Link to="/" className="inline-block group relative">
                  <div className="absolute inset-0 from-green-900/20 rounded-xl blur-lg group-hover:bg-yellow-400/30 transition-all duration-300"></div>
                  <img
                    src={Logospb}
                    alt="Logo Superbie"
                    className="relative w-40 rounded-xl shadow-2xl transform group-hover:scale-105 transition-all duration-300"
                  />
                </Link>
              </div>

              <div className="space-y-2">
                <div className="inline-block relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-900/20 to-transparent blur-sm rounded-lg"></div>
                  <p className="relative text-green-200 font-semibold italic text-lg leading-tight px-2">
                    "Bien-être, style & technologie au quotidien"
                  </p>
                </div>

                <p className="text-green-100/80 text-sm leading-relaxed bg-green-600/20 backdrop-blur-sm rounded-xl p-4 border border-green-700/30">
                  Bijoux, soin & santé et outils informatiques pour sublimer
                  votre style et faciliter votre quotidien.
                </p>
              </div>
            </div>

            {/* ============================================
                COLONNE 2 : LIENS UTILES
                ============================================ */}
            <div className="space-y-1">
              <div className="relative">
                <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full"></div>
                <h4 className="text-xl font-bold text-white ml-4 relative">
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                    Liens Utiles
                  </span>
                  <div className="h-0.5 w-20 bg-gradient-to-r from-yellow-400 to-transparent mt-2 rounded-full"></div>
                </h4>
              </div>

              <ul className="space-y-1">
                {[
                  { to: "/", icon: <FaHome />, text: "Accueil" },
                  { to: "/articles", icon: <FaNewspaper />, text: "Articles" },
                  { to: "/boutique", icon: <FaStore />, text: "Boutique" },
                  { to: "/blog", icon: <FaBlog />, text: "Blog" },
                  {
                    to: "/services-it",
                    icon: <FaTools />,
                    text: "Service Informatique",
                  },
                  {
                    to: "/support",
                    icon: <FaHeadset />,
                    text: "Service Client",
                  },
                  { to: "/about", icon: <FaInfoCircle />, text: "À propos" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.to}
                      className="flex items-center gap-1 text-green-100/80 hover:text-white group transition-all duration-200 p-1 rounded-lg hover:bg-white/5"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-800 to-green-900 flex items-center justify-center group-hover:from-yellow-500 group-hover:to-yellow-600 transition-all duration-300 shadow-lg">
                        <span className="text-green-200 group-hover:text-white transition-colors">
                          {link.icon}
                        </span>
                      </div>
                      <span className="relative">
                        {link.text}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ============================================
                COLONNE 3 : RÉSEAUX SOCIAUX & NEWSLETTER
                ============================================ */}
            <div className="space-y-1">
              <div className="space-y-1">
                <div className="relative">
                  <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full"></div>
                  <h4 className="text-xl font-bold text-white ml-4 relative">
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                      Suivez-nous
                    </span>
                    <div className="h-0.5 w-20 bg-gradient-to-r from-yellow-400 to-transparent mt-2 rounded-full"></div>
                  </h4>
                </div>

                <p className="text-green-100/80 text-sm ml-4">
                  Suivez-nous sur les réseaux sociaux pour ne rien manquer de
                  nos actualités et offres.
                </p>

                {/* Social Media Icons */}
                <div className="flex flex-wrap gap-2 ml-4">
                  {[
                    {
                      icon: <FaFacebookF />,
                      label: "Facebook",
                      href: "https://facebook.com",
                      color:
                        "hover:bg-gradient-to-br hover:from-blue-600 hover:via-blue-700 hover:to-blue-800",
                    },
                    {
                      icon: <FaTwitter />,
                      label: "Twitter",
                      href: "https://twitter.com",
                      color:
                        "hover:bg-gradient-to-br hover:from-slate-700 hover:via-slate-800 hover:to-black",
                    },
                    {
                      icon: <FaInstagram />,
                      label: "Instagram",
                      href: "https://instagram.com",
                      color:
                        "hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500",
                    },
                    {
                      icon: <FaLinkedinIn />,
                      label: "LinkedIn",
                      href: "https://linkedin.com",
                      color:
                        "hover:bg-gradient-to-br hover:from-sky-600 hover:via-blue-700 hover:to-blue-800",
                    },
                    {
                      icon: <FaWhatsapp />,
                      label: "WhatsApp",
                      href: "https://wa.me/2250000000000",
                      color:
                        "hover:bg-gradient-to-br hover:from-green-500 hover:via-green-600 hover:to-green-700",
                    },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      aria-label={social.label}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
                      <div
                        className={`relative w-12 h-12 bg-gradient-to-br from-green-800 to-green-900 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-xl ${social.color}`}
                      >
                        <span className="text-green-200 group-hover:text-white transition-colors text-lg">
                          {social.icon}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Newsletter Section */}
              <div className="space-y-4 ml-4">
                <h5 className="text-lg font-semibold text-white relative">
                  <span className="bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                    Newsletter
                  </span>
                </h5>
                <p className="text-green-100/80 text-sm">
                  Inscrivez-vous pour recevoir nos dernières actualités
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-green-700/30 text-white placeholder-green-300/50 outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/30 transition-all duration-300"
                  />
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-green-900 font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
                    S'abonner
                  </button>
                </div>
              </div>
            </div>

            {/* ============================================
                COLONNE 4 : CONTACT
                ============================================ */}
            <div className="space-y-1">
              <div className="relative">
                <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full"></div>
                <h4 className="text-xl font-bold text-white ml-4 relative">
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                    Contactez-nous
                  </span>
                  <div className="h-0.5 w-20 bg-gradient-to-r from-yellow-400 to-transparent mt-2 rounded-full"></div>
                </h4>
              </div>

              <p className="text-green-100/80 text-sm ml-4">
                Nous sommes à votre écoute pour toute question ou information.
              </p>

              <div className="space-y-1 ml-1">
                {/* Contact Items */}
                {[
                  {
                    icon: <FaPhone />,
                    title: "Téléphone",
                    content: (
                      <>
                        <a
                          href="tel:+2250000000000"
                          className="block text-white hover:text-yellow-300 transition-colors font-medium"
                        >
                          +225 00 00 00 00 00
                        </a>
                        <a
                          href="tel:+2250000000000"
                          className="block text-white hover:text-yellow-300 transition-colors font-medium"
                        >
                          +225 00 00 00 00 00
                        </a>
                      </>
                    ),
                  },
                  {
                    icon: <FaEnvelope />,
                    title: "Email",
                    content: (
                      <>
                        <a
                          href="mailto:contact@approbat.com"
                          className="block text-white hover:text-yellow-300 transition-colors font-medium text-sm break-all"
                        >
                          contact@approbat.com
                        </a>
                        <a
                          href="mailto:support@approbat.com"
                          className="block text-white hover:text-yellow-300 transition-colors font-medium text-sm break-all"
                        >
                          support@approbat.com
                        </a>
                      </>
                    ),
                  },
                  {
                    icon: <FaMapMarkerAlt />,
                    title: "Adresse",
                    content: (
                      <p className="text-white font-medium">
                        Abidjan, Cocody Riviera
                        <br />
                        Côte d'Ivoire
                      </p>
                    ),
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-800 to-green-900 flex items-center justify-center flex-shrink-0 group-hover:from-yellow-500 group-hover:to-yellow-600 transition-all duration-300 shadow-lg">
                      <span className="text-yellow-400 group-hover:text-white transition-colors">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-green-300/70 uppercase mb-1">
                        {item.title}
                      </p>
                      <div className="space-y-1">{item.content}</div>
                    </div>
                  </div>
                ))}

                {/* Opening Hours */}
                <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-green-800/30 to-green-900/30 backdrop-blur-sm border border-green-700/30 shadow-xl">
                  <p className="text-xs text-green-300/70 uppercase mb-2">
                    Horaires d'ouverture
                  </p>
                  <div className="space-y-1">
                    <p className="text-white text-sm font-medium flex justify-between">
                      <span>Lun - Ven :</span>
                      <span className="text-yellow-300">8h00 - 18h00</span>
                    </p>
                    <p className="text-white text-sm font-medium flex justify-between">
                      <span>Sam :</span>
                      <span className="text-yellow-300">9h00 - 13h00</span>
                    </p>
                    <p className="text-green-300/70 text-sm flex justify-between">
                      <span>Dimanche :</span>
                      <span>Fermé</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================
            SECTION LÉGALE ET COPYRIGHT
            ============================================ */}
        <div className="border-t border-green-700/30 bg-gradient-to-r from-green-900/50 via-green-800/30 to-green-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 lg:px-8">
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-8 mb-6">
              {[
                {
                  to: "/privacy",
                  icon: <FaShieldAlt />,
                  text: "Politique de confidentialité",
                },
                {
                  to: "/terms",
                  icon: <FaFileContract />,
                  text: "Conditions d'utilisation",
                },
                {
                  to: "/cookies",
                  icon: <FaInfoCircle />,
                  text: "Politique des cookies",
                },
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="flex items-center gap-2 text-green-200/80 hover:text-yellow-300 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-800 to-green-900 flex items-center justify-center group-hover:from-yellow-500 group-hover:to-yellow-600 transition-all duration-300">
                    <span className="text-green-200 group-hover:text-white transition-colors text-sm">
                      {link.icon}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{link.text}</span>
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-green-300/70 text-sm mb-2">
                © {new Date().getFullYear()}{" "}
                <span className="font-bold bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                  SuperBe
                </span>
                . Tous droits réservés.
              </p>
              <p className="text-green-300/60 text-xs flex items-center justify-center gap-2">
                Fait avec
                <FaHeart className="text-red-400 animate-pulse" />
                par Khalil Sremmelife
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
