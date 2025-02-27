import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

    return (
      <>
    <nav className="w-screen bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">Lost & Found</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/home" className="hover:text-gray-200">
              Home
            </Link>
            <Link to="/lost" className="hover:text-gray-200">
              Lost Items
            </Link>
            <Link to="/found" className="hover:text-gray-200">
              Found Items
            </Link>
            <Link
              to="/login"
              className="hover:bg-white hover:text-blue-600 px-4 py-2 rounded transition"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 text-center py-4 space-y-4">
          <Link to="/" className="block hover:text-gray-200">
            Home
          </Link>
          <Link to="/lost" className="block hover:text-gray-200">
            Lost Items
          </Link>
          <Link to="/found" className="block hover:text-gray-200">
            Found Items
          </Link>
          <Link
            to="/login"
            className="block hover:bg-white hover:text-blue-600 px-4 py-2 rounded transition"
          >
            Login
          </Link>
        </div>
      )}
      </nav>
      <Outlet/>
      </>
  );
};

export default Navbar;
