// src/components/Footer.js
import React from 'react';

export default function Footer() {
    return (
        <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between bg-white p-6 shadow-lg fixed bottom-0 left-0 w-full bg-gray-200 text-center py-4 shadow-inner z-50">
            <p className="text-blue-gray-600 font-normal">
                &copy; 2023 Material Tailwind
            </p>
            <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                <li>
                    <a
                        href="#"
                        className="text-blue-gray-600 font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                    >
                        About Us
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="text-blue-gray-600 font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                    >
                        License
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="text-blue-gray-600 font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                    >
                        Contribute
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="text-blue-gray-600 font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                    >
                        Contact Us
                    </a>
                </li>
            </ul>
        </footer>
    );
}