// components/Footer.tsx

import { Facebook, Instagram} from "lucide-react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className=" text-gray-400 py-8 text-[10px] ml-10">
      <div className="container mx-auto justify-center px-4">
        <div className="flex justify-start mb-6">
          <a href="#" className="mr-4">
            <Facebook size={15} fill="white"/>
          </a>
          <a href="#" className="mr-4">
            <Instagram size={15} fill="white" />
          </a>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-[10px]">
          <div>
            <a href="#" className="block mb-2">Audio Description</a>
            <a href="#" className="block mb-2">Investor Relations</a>
            <a href="#" className="block">Legal Notices</a>
          </div>
          <div>
            <a href="#" className="block mb-2">Help Center</a>
            <a href="#" className="block mb-2">Jobs</a>
            <a href="#" className="block">Cookie Preferences</a>
          </div>
          <div>
            <a href="#" className="block mb-2">Gift Cards</a>
            <a href="#" className="block mb-2">Terms of Use</a>
            <a href="#" className="block">Corporate Information</a>
          </div>
          <div>
            <a href="#" className="block mb-2">Media Center</a>
            <a href="#" className="block mb-2">Privacy</a>
            <a href="#" className="block">Contact Us</a>
          </div>
        </div>
        <div className="mt-6 text-gray-600 text-[10px]">
          <p>© Letflix, Inc.</p>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
