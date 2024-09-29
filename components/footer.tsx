// components/Footer.tsx

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className=" text-gray-400 py-8 text-[12px] 2xl:text-base  flex justify-center items-center m-auto text-center">
      <div className="container  mx-auto justify-center px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
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
        <div className="mt-6 text-gray-600 ">
          <p>© Letflix, Inc.</p>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
