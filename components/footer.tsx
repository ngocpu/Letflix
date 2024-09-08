// components/Footer.tsx

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className=" text-gray-400 text-xs py-8">
      <div className="container mx-auto flex flex-col items-center">
        {/* Social Icons */}
        <div className="flex space-x-6 mb-6">
          <a href="#" aria-label="Facebook" className="hover:text-white">
            <Facebook size={24} />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-white">
            <Instagram size={24} />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-white">
            <Twitter size={24} />
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-white">
            <Youtube size={24} />
          </a>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs">
          <a href="#" className="hover:text-white">
            Audio Description
          </a>
          <a href="#" className="hover:text-white">
            Help Center
          </a>
          <a href="#" className="hover:text-white">
            Investor Relations
          </a>
          <a href="#" className="hover:text-white">
            Jobs
          </a>
          <a href="#" className="hover:text-white">
            Legal Notices
          </a>
          <a href="#" className="hover:text-white">
            Cookie Preferences
          </a>
          <a href="#" className="hover:text-white">
            Gift Cards
          </a>
          <a href="#" className="hover:text-white">
            Terms of Use
          </a>
          <a href="#" className="hover:text-white">
            Corporate Information
          </a>
          <a href="#" className="hover:text-white">
            Media Center
          </a>
          <a href="#" className="hover:text-white">
            Privacy
          </a>
          <a href="#" className="hover:text-white">
            Contact Us
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-xs">
          © 2024 Netflix clone
        </div>
      </div>
    </footer>
  );
};

export default Footer;
