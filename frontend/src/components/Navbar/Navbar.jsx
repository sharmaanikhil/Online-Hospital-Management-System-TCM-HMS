import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../store/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { role } = useAuth();

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white shadow-xl sticky top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600">
            <Link to="/" onClick={closeMenu}>
              TCM HMS
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>

            <Link
              to="/all-doctors"
              className="text-gray-700 hover:text-blue-600"
            >
              All Doctors
            </Link>

            {role === "patient" && (
              <Link
                to="/become-doctor"
                className="bg-red-400 text-white px-4 py-2 rounded-full hover:bg-red-500 transition"
              >
                Become A Doctor
              </Link>
            )}

            {role === "user" ? (
              <Link
                to="/get-started"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            ) : (
              <Link
                to="/profile"
                className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
              >
                Profile
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen((prev) => !prev)}>
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 bg-white border-t space-y-2">
          <Link
            to="/"
            className="block text-gray-700 hover:text-blue-600"
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            to="/all-doctors"
            className="block text-gray-700 hover:text-blue-600"
            onClick={closeMenu}
          >
            All Doctors
          </Link>

          {role === "patient" && (
            <Link
              to="/become-doctor"
              className="block text-center bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition"
              onClick={closeMenu}
            >
              Become A Doctor
            </Link>
          )}

          {role === "user" ? (
            <Link
              to="/get-started"
              className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={closeMenu}
            >
              Get Started
            </Link>
          ) : (
            <Link
              to="/profile"
              className="block text-center border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
              onClick={closeMenu}
            >
              Profile
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
