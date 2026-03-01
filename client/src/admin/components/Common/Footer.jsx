import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white text-gray-600 text-sm py-4 px-6 mt-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <span>&copy; {new Date().getFullYear()} Admin Panel. All rights reserved.</span>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <a href="/admin/privacy-policy" className="hover:text-gray-800">Privacy Policy</a>
          <a href="/admin/terms" className="hover:text-gray-800">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
