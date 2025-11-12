import React from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaCar,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-linear-to-b from-[#002f6c] to-[#001f3f] text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16 border-b border-white/10">
          {/* About Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-linear-to-br from-[#0ea5e9] to-[#14b8a6] p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <FaCar className="h-6 w-6 text-white" />
              </div>
              <span
                className="text-2xl font-bold"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-teal-300">
                  Travel
                </span>
                <span className="text-white">Ease</span>
              </span>
            </Link>
            <p
              className="text-slate-300 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Your trusted partner for seamless vehicle booking. Providing
              reliable one-stop vehicle solutions since 2025.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="bg-white/10 hover:bg-linear-to-r hover:from-[#0ea5e9] hover:to-[#14b8a6] p-3 rounded-xl transition-all duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-white" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-linear-to-r hover:from-[#0ea5e9] hover:to-[#14b8a6] p-3 rounded-xl transition-all duration-300 transform hover:scale-110"
                aria-label="Twitter"
              >
                <FaTwitter className="text-white" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-linear-to-r hover:from-[#0ea5e9] hover:to-[#14b8a6] p-3 rounded-xl transition-all duration-300 transform hover:scale-110"
                aria-label="YouTube"
              >
                <FaYoutube className="text-white" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-linear-to-r hover:from-[#0ea5e9] hover:to-[#14b8a6] p-3 rounded-xl transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram className="text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h6
              className="text-lg font-bold mb-4 text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-teal-300"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Quick Links
            </h6>
            <ul
              className="space-y-3"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <li>
                <Link
                  to="/"
                  className="text-slate-300 hover:text-cyan-300 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-linear-to-r from-[#0ea5e9] to-[#14b8a6] transition-all duration-300"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/allVehicles"
                  className="text-slate-300 hover:text-cyan-300 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-linear-to-r from-[#0ea5e9] to-[#14b8a6] transition-all duration-300"></span>
                  All Vehicles
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-slate-300 hover:text-cyan-300 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-linear-to-r from-[#0ea5e9] to-[#14b8a6] transition-all duration-300"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/myVehicles"
                  className="text-slate-300 hover:text-cyan-300 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-linear-to-r from-[#0ea5e9] to-[#14b8a6] transition-all duration-300"></span>
                  My Vehicles
                </Link>
              </li>
              <li>
                <Link
                  to="/addVehicle"
                  className="text-slate-300 hover:text-cyan-300 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-linear-to-r from-[#0ea5e9] to-[#14b8a6] transition-all duration-300"></span>
                  Add Vehicle
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h6
              className="text-lg font-bold mb-4 text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-teal-300"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Support
            </h6>
            <ul
              className="space-y-3"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <li>
                <Link
                  to="/help"
                  className="text-slate-300 hover:text-cyan-300 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-linear-to-r from-[#0ea5e9] to-[#14b8a6] transition-all duration-300"></span>
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-slate-300 hover:text-cyan-300 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-linear-to-r from-[#0ea5e9] to-[#14b8a6] transition-all duration-300"></span>
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-slate-300 hover:text-cyan-300 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-linear-to-r from-[#0ea5e9] to-[#14b8a6] transition-all duration-300"></span>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-slate-300 hover:text-cyan-300 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-linear-to-r from-[#0ea5e9] to-[#14b8a6] transition-all duration-300"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-300 hover:text-cyan-300 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-linear-to-r from-[#0ea5e9] to-[#14b8a6] transition-all duration-300"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h6
              className="text-lg font-bold mb-4 text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-teal-300"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Contact Info
            </h6>
            <ul
              className="space-y-4"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-cyan-400 mt-1 flex-shrink-0" />
                <span className="text-slate-300">
                  123 Travel Street,
                  <br />
                  Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-teal-400 flex-shrink-0" />
                <a
                  href="tel:+8801234567890"
                  className="text-slate-300 hover:text-cyan-300 transition-colors duration-300"
                >
                  +880 123 456 7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-cyan-400 flex-shrink-0" />
                <a
                  href="mailto:info@travelease.com"
                  className="text-slate-300 hover:text-cyan-300 transition-colors duration-300"
                >
                  info@travelease.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p
            className="text-slate-400 text-sm"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            © 2025 TravelEase Ltd. All rights reserved.
          </p>
          <div
            className="flex gap-6 text-sm"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <Link
              to="/privacy"
              className="text-slate-400 hover:text-cyan-300 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-slate-400 hover:text-cyan-300 transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className="text-slate-400 hover:text-cyan-300 transition-colors duration-300"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
