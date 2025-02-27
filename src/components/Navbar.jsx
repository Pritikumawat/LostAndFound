import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import './navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="w-screen bg-[#72ffbdb4] shadow-md fixed top-0 left-0 w-full shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h2 className="text-xl font-bold py-2">Lost & Found</h2>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              <Link
                to="/home"
                id="linkTag"
              >
                Home
              </Link>
              <Link
                to="/lost"
                id="linkTag"
              >
                Lost Items
              </Link>
              <Link
                to="/found"
                id="linkTag"
              >
                Found Items
              </Link>
              <Link
                to="/login"
                id="linkTag"
              >
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="shadow-lg p-1 rounded bg-white"
              >
                {isOpen ? (
                  <X size={24} className="text-[#72ffbdb4]" />
                ) : (
                  <Menu size={24} className="text-[#72ffbdb4]" />
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-[#FAF3DD] text-center py-4 space-y-4">
            <Link
              to="/home"
              className="block text-blue-800 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/lost"
              className="block text-blue-800 hover:text-blue-600 transition-colors"
            >
              Lost Items
            </Link>
            <Link
              to="/found"
              className="block text-blue-800 hover:text-blue-600 transition-colors"
            >
              Found Items
            </Link>
            <Link
              to="/login"
              className="block text-blue-800 hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition"
            >
              Login
            </Link>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
