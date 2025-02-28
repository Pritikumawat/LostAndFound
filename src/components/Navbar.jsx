import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="navbar w-screen fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 navhead">
              <p className="text-xl font-bold py-2 ">
                TrackBack
              </p>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              <Link to="/home">Home</Link>
              <Link to="/lost">Lost Items</Link>
              <Link to="/found">Found Items</Link>
              <Link to="/feedback">Feedback</Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="menu-button shadow-lg"
              >
                {isOpen ? (
                  <X size={24} className="text-[#se6472]" />
                ) : (
                  <Menu size={24} className="text-[#se6472]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mobile-menu md:hidden text-center space-y-2 z-[9999]">
            <Link to="/home">Home</Link>
            <Link to="/lost">Lost Items</Link>
            <Link to="/found">Found Items</Link>
            <Link to="/feedback">Feedback</Link>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
