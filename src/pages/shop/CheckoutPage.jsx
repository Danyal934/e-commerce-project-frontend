import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axiosConfig';
import { clearCart } from '../../store/slices/cartSlice';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('stripe');

  const calculateTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + (item.product?.price || 0) * item.quantity,
      0
    ).toFixed(2);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const orderItems = cartItems.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        product: item.product._id
      }));

      const orderData = {
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice: calculateTotal()
      };

      // Create order in backend
      const { data: order } = await axios.post('/api/orders', orderData);

      // Clear cart
      dispatch(clearCart());

      // Redirect to success page with order ID
      navigate(`/order-success/${order._id}`);
    } catch (error) {
      toast.error('Failed to create order');
    }
  };

  if (!userInfo) {
    navigate('/login');
    return null;
  }

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Address</h2>

              <form onSubmit={submitHandler}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({
                      ...shippingAddress,
                      address: e.target.value
                    })}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({
                        ...shippingAddress,
                        city: e.target.value
                      })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={shippingAddress.postalCode}
                      onChange={(e) => setShippingAddress({
                        ...shippingAddress,
                        postalCode: e.target.value
                      })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={shippingAddress.country}
                      onChange={(e) => setShippingAddress({
                        ...shippingAddress,
                        country: e.target.value
                      })}
                      required
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <input
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                      type="radio"
                      name="paymentMethod"
                      value="stripe"
                      checked={paymentMethod === 'stripe'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label className="ml-3 text-gray-700">
                      Credit/Debit Card (Stripe)
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label className="ml-3 text-gray-700">
                      PayPal
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label className="ml-3 text-gray-700">
                      Cash on Delivery
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-lg text-lg transition duration-300"
                >
                  Place Order - ${calculateTotal()}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">
                        {item.product?.name} × {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        ${item.product?.price?.toFixed(2)} each
                      </p>
                    </div>
                    <p className="font-bold text-gray-900">
                      ${(item.product?.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6">
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${calculateTotal()}</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">
                    ${(parseFloat(calculateTotal()) * 0.08).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center border-t pt-6">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${(parseFloat(calculateTotal()) * 1.08).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  🔒 Your payment information is encrypted and secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
