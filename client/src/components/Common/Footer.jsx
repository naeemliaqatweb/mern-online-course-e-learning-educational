import footerIcon from "/logo.png";
import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white py-10 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-300">
          {/* Logo & Contact Info */}
          <div className="py-1">
            <img src={footerIcon} className="mb-4 w-12 h-12" alt="Skillbridge Logo" />
            <div className="flex items-center gap-3 py-2">
              <Mail className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700">naeemliaqat@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 py-2">
              <Phone className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700">+91 91513 23 2309</span>
            </div>
            <div className="flex items-center gap-3 py-2">
              <MapPin className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700">Somewhere in the World</span>
            </div>
          </div>

          {/* Home Links */}
          <div className="py-1">
            <h3 className="font-bold text-lg text-gray-800 mb-3">Home</h3>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-base text-gray-600 hover:text-blue-600">Benefits</Link>
              <Link to="/" className="text-base text-gray-600 hover:text-blue-600">Our Courses</Link>
              <Link to="/" className="text-base text-gray-600 hover:text-blue-600">Our Testimonials</Link>
              <Link to="/" className="text-base text-gray-600 hover:text-blue-600">Our FAQ</Link>
            </div>
          </div>

          {/* About Us Links */}
          <div className="py-1">
            <h3 className="font-bold text-lg text-gray-800 mb-3">About Us</h3>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-base text-gray-600 hover:text-blue-600">Company</Link>
              <Link to="/" className="text-base text-gray-600 hover:text-blue-600">Achievements</Link>
              <Link to="/" className="text-base text-gray-600 hover:text-blue-600">Our Goals</Link>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="py-1">
            <h3 className="font-bold text-lg text-gray-800 mb-3">Social Profiles</h3>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="p-4 bg-[#F1F1F3] rounded-md hover:bg-blue-600 transition">
                <Facebook className="h-6 w-6 text-gray-700 hover:text-white" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="p-4 bg-[#F1F1F3] rounded-md hover:bg-blue-400 transition">
                <Twitter className="h-6 w-6 text-gray-700 hover:text-white" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="p-4 bg-[#F1F1F3] rounded-md hover:bg-blue-800 transition ">
                <Linkedin className="h-6 w-6 text-gray-700 hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          © 2025 Skillbridge. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
