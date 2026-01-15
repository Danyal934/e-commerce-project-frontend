import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

import logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="WorldPantry" className="h-10 w-auto" />
              <span className="text-2xl font-bold">WorldPantry</span>
            </div>
            <p className="text-gray-400 mb-6">
              Providing the finest natural products straight from nature's bounty.
              Pure quality, pure taste, pure goodness.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-6">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/category/honey" className="text-gray-400 hover:text-white transition">
                  Honey & Sweets
                </Link>
              </li>
              <li>
                <Link to="/category/dates" className="text-gray-400 hover:text-white transition">
                  Dry Fruits
                </Link>
              </li>
              <li>
                <Link to="/category/oils" className="text-gray-400 hover:text-white transition">
                  Oils
                </Link>
              </li>
              <li>
                <Link to="/category/olives" className="text-gray-400 hover:text-white transition">
                  Olives
                </Link>
              </li>
              <li>
                <Link to="/category/dairy" className="text-gray-400 hover:text-white transition">
                  Dairy Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="w-5 h-5 text-primary-500 mt-1" />
                <span className="text-gray-400">
                  123 Nature Street, Farmville<br />
                  Organic City, OC 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="w-5 h-5 text-primary-500" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="w-5 h-5 text-primary-500" />
                <span className="text-gray-400">info@WorldPantry.com</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="text-lg font-bold mb-4">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none"
                />
                <button className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-r-lg transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} WorldPantry. All rights reserved.
          </p>
          <div className="mt-4 space-x-6 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition">
              Terms of Service
            </Link>
            <Link to="/shipping" className="hover:text-white transition">
              Shipping Policy
            </Link>
            <Link to="/returns" className="hover:text-white transition">
              Returns & Refunds
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
