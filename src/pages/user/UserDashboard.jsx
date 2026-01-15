import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FaShoppingBag, FaHeart, FaUser } from 'react-icons/fa';

const UserDashboard = () => {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
    }, [navigate, userInfo]);

    if (!userInfo) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-10 text-white">
                        <div className="flex items-center space-x-4">
                            <div className="bg-white/20 p-4 rounded-full">
                                <FaUser className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">Hello, {userInfo.name}!</h1>
                                <p className="opacity-90 mt-1">{userInfo.email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-gray-800">My Dashboard</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* User Cards */}
                        <Link to="/orders" className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition group border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition">My Orders</h3>
                                <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200 transition">
                                    <FaShoppingBag className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                            <p className="text-gray-600">Track your active orders and view your purchase history.</p>
                        </Link>

                        <Link to="/wishlist" className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition group border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-red-500 transition">My Wishlist</h3>
                                <div className="bg-red-100 p-3 rounded-full group-hover:bg-red-200 transition">
                                    <FaHeart className="w-6 h-6 text-red-500" />
                                </div>
                            </div>
                            <p className="text-gray-600">View and manage items you've saved for later.</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
