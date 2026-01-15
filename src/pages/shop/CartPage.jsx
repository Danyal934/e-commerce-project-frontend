import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCartItems, removeFromCart, updateCartQuantity } from '../../store/slices/cartSlice';
import { FaTrash, FaArrowLeft, FaShoppingBag, FaPlus, FaMinus } from 'react-icons/fa';
import axios from '../../utils/axiosConfig';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { cartItems, loading } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (userInfo) {
      dispatch(getCartItems());
    } else {
      navigate('/login');
    }
  }, [dispatch, userInfo, navigate]);
  
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };
  
  const updateQuantityHandler = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartQuantity({ productId, quantity: newQuantity }));
    }
  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.product?.price || 0) * item.quantity,
      0
    ).toFixed(2);
  };
  
  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08; // 8% tax
    return (subtotal + shipping + tax).toFixed(2);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Shopping Cart</h1>
          <p className="text-gray-600">
            {cartItems.length === 0 
              ? 'Your cart is empty' 
              : `You have ${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in your cart`}
          </p>
        </div>
        
        {cartItems.length === 0 ? (
          // Empty Cart
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Add some delicious European natural products to get started!
            </p>
            <Link 
              to="/products"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              <FaArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </div>
        ) : (
          // Cart with Items
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900">Cart Items</h2>
                </div>
                
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item._id} className="p-6">
                      <div className="flex items-center">
                        {/* Product Image */}
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={item.product?.image} 
                            alt={item.product?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Product Info */}
                        <div className="ml-6 flex-grow">
                          <div className="flex justify-between">
                            <div>
                              <Link 
                                to={`/product/${item.product?._id}`}
                                className="text-lg font-bold text-gray-900 hover:text-blue-600 transition"
                              >
                                {item.product?.name}
                              </Link>
                              <p className="text-gray-600 text-sm mt-1">
                                {item.product?.origin || 'Europe'}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-gray-900">
                                ${(item.product?.price * item.quantity).toFixed(2)}
                              </p>
                              <p className="text-sm text-gray-500">
                                ${item.product?.price?.toFixed(2)} each
                              </p>
                            </div>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                              <button
                                onClick={() => updateQuantityHandler(item.product?._id, item.quantity - 1)}
                                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-l flex items-center justify-center"
                              >
                                <FaMinus className="w-3 h-3" />
                              </button>
                              <div className="w-12 h-8 bg-gray-50 flex items-center justify-center">
                                {item.quantity}
                              </div>
                              <button
                                onClick={() => updateQuantityHandler(item.product?._id, item.quantity + 1)}
                                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-r flex items-center justify-center"
                              >
                                <FaPlus className="w-3 h-3" />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeFromCartHandler(item.product?._id)}
                              className="text-red-500 hover:text-red-700 flex items-center text-sm"
                            >
                              <FaTrash className="w-4 h-4 mr-2" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Continue Shopping */}
                <div className="p-6 border-t">
                  <Link 
                    to="/products"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <FaArrowLeft className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                {/* Order Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${calculateSubtotal()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {parseFloat(calculateSubtotal()) > 50 ? 'Free' : '$5.99'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-medium">
                      ${(parseFloat(calculateSubtotal()) * 0.08).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                {/* Total */}
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        ${calculateTotal()}
                      </div>
                      <p className="text-sm text-gray-500 text-right">
                        {parseFloat(calculateSubtotal()) > 50 
                          ? 'Free shipping applied!' 
                          : 'Add ${(50 - parseFloat(calculateSubtotal())).toFixed(2)} for free shipping'}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Checkout Button */}
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-xl transition-all duration-300 mb-4"
                >
                  Proceed to Checkout
                </button>
                
                {/* Payment Methods */}
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">We accept</p>
                  <div className="flex justify-center space-x-4">
                    <div className="w-12 h-8 bg-gray-100 rounded"></div>
                    <div className="w-12 h-8 bg-gray-100 rounded"></div>
                    <div className="w-12 h-8 bg-gray-100 rounded"></div>
                    <div className="w-12 h-8 bg-gray-100 rounded"></div>
                  </div>
                </div>
                
                {/* Security Note */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    🔒 Your payment information is encrypted and secure.
                    We never store your credit card details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
