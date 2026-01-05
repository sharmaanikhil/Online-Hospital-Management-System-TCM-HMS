import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../store/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, role } = useAuth();

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white shadow-xl sticky top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="text-2xl font-bold text-blue-600">
            <Link to="/" onClick={closeMenu}>
              TCM HMS
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>

            <Link to="/all-doctors" className="text-gray-700 hover:text-blue-600">
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

            {!user ? (
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

          <div className="md:hidden">
            <button onClick={() => setMenuOpen((p) => !p)}>
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 bg-white border-t space-y-2">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/all-doctors" onClick={closeMenu}>All Doctors</Link>

          {role === "patient" && (
            <Link
              to="/become-doctor"
              onClick={closeMenu}
              className="block bg-red-400 text-white text-center py-2 rounded"
            >
              Become A Doctor
            </Link>
          )}

          {!user ? (
            <Link
              to="/get-started"
              onClick={closeMenu}
              className="block bg-blue-600 text-white text-center py-2 rounded"
            >
              Get Started
            </Link>
          ) : (
            <Link
              to="/profile"
              onClick={closeMenu}
              className="block border text-blue-600 text-center py-2 rounded"
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
