import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaHeart } from 'react-icons/fa';
import { logout } from '../../store/slices/authSlice';
import { getWishlist } from '../../store/slices/wishlistSlice';
import logo from '../../assets/logo.png';

const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (userInfo && userInfo.role !== 'admin') {
      dispatch(getWishlist());
    }
  }, [dispatch, userInfo]);

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="WorldPantry" className="h-10 w-auto" />
            <span className="text-2xl font-bold text-gray-800">
              WorldPantry
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary-600 font-medium transition">
              Home
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-primary-600 font-medium transition">
              Products
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-primary-600 font-medium transition">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-primary-600 font-medium transition">
              Contact
            </Link>
            <Link to="/wishlist" className="text-gray-600 hover:text-primary-600 font-medium transition md:hidden">
              Wishlist
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-6">
            {/* Wishlist - Desktop */}
            <Link to="/wishlist" className="relative group hidden md:block" title="Wishlist">
              <FaHeart className="w-6 h-6 text-gray-700 hover:text-red-500 transition" />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <FaShoppingCart className="w-6 h-6 text-gray-700 hover:text-primary-600 transition" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {userInfo ? (
              <div className="relative group pb-2">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <FaUser className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="text-gray-700 font-medium hidden md:inline">
                    {userInfo.name.split(' ')[0]}
                  </span>
                </button>

                <div className="absolute right-0 top-full pt-2 w-48 hidden group-hover:block">
                  <div className="bg-white rounded-lg shadow-xl py-2">
                    {userInfo.role === 'admin' ? (
                      <Link to="/admin/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                        Admin Dashboard
                      </Link>
                    ) : (
                      <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                        Dashboard
                      </Link>
                    )}
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                      My Profile
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                      My Orders
                    </Link>
                    <Link to="/wishlist" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                      My Wishlist
                    </Link>
                    <button
                      onClick={logoutHandler}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-primary-600 font-medium">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
