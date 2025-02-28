import React from "react";

export default function Footer() {
  return (
    <div className="fixed bottom-0 shadow-[0_-4px_6px_rgba(0,0,0,0.1)] w-full px-6 py-4 border-none z-[9999]" style={{ background: "rgba(187, 242, 230, 0.9)" }}>
      <footer className="flex flex-col md:flex-row items-center justify-between">
        {/* Left Side - Copyright */}
        <p className="text-sm md:text-base font-semibold text-[#28527a]">
          &copy; 2025 TrackBack | All Rights Reserved
        </p>

        {/* Right Side - Navigation Links */}
        <ul className="flex flex-wrap justify-center md:justify-end gap-x-6 text-sm md:text-base font-medium text-[#28527a]">
          <li>
            <a
              href="#"
              className="no-underline hover:text-[#ff686b] transition-colors"
              style={{ color: "#28527a" }}
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-[#ff686b] transition-colors"
              style={{ color: "#28527a" }}
            >
              License
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-[#ff686b] transition-colors"
              style={{ color: "#28527a" }}
            >
              Contribute
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-[#ff686b] transition-colors"
              style={{ color: "#28527a" }}
            >
              Contact Us
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
