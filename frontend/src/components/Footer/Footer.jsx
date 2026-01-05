import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/">TCM HMS</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-sm">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/all-doctors" className="hover:underline">
            All Doctors
          </Link>
        </div>

        {/* Social Media */}
        <div className="flex space-x-4">
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-blue-200"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-blue-200"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-blue-200"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      <div className="text-center text-sm mt-6 text-blue-200">
        © {new Date().getFullYear()} TCM HMS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
