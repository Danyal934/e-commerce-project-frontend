import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const OrderSuccessPage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl text-center">
        <div className="flex justify-center">
          <FaCheckCircle className="text-green-500 w-24 h-24" />
        </div>

        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Order Confirmed!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for your purchase. Your order <span className="font-bold text-gray-900">#{id?.slice(-6)}</span> has been placed successfully.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-700">
              We'll send you a confirmation email shortly.
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <Link
              to="/"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              to="/orders"
              className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
