import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaChartLine, FaBox, FaUsers, FaClipboardList } from 'react-icons/fa';
import { fetchDashboardStats } from '../../store/slices/adminSlice';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const { stats, loading } = useSelector((state) => state.admin);

    useEffect(() => {
        if (!userInfo || userInfo.role !== 'admin') {
            navigate('/login');
        } else {
            dispatch(fetchDashboardStats());
        }
    }, [navigate, userInfo, dispatch]);

    if (!userInfo) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar could go here, but for now using a layout wrapper or just updating content */}
            <div className="flex-1 p-8">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                        <p className="text-gray-600 mt-2">Welcome back, {userInfo.name}</p>
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold">
                        {new Date().toLocaleDateString()}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm">Total Revenue</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">${stats?.stats?.totalRevenue?.toFixed(2) || '0.00'}</h3>
                            </div>
                            <div className="bg-green-100 p-3 rounded-lg">
                                <FaChartLine className="text-green-600 w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm">Total Orders</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats?.stats?.totalOrders || 0}</h3>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <FaClipboardList className="text-blue-600 w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm">Total Products</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats?.stats?.totalProducts || 0}</h3>
                            </div>
                            <div className="bg-purple-100 p-3 rounded-lg">
                                <FaBox className="text-purple-600 w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm">Total Users</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats?.stats?.totalUsers || 0}</h3>
                            </div>
                            <div className="bg-orange-100 p-3 rounded-lg">
                                <FaUsers className="text-orange-600 w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <h2 className="text-xl font-bold text-gray-800 mb-6">Management</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link to="/admin/products" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 group">
                        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600">Product Management</h3>
                        <p className="text-gray-500 mb-4">Add, edit or delete products from your store inventory.</p>
                        <span className="text-blue-600 font-medium">Manage Products &rarr;</span>
                    </Link>

                    <Link to="/admin/users" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 group">
                        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600">User Management</h3>
                        <p className="text-gray-500 mb-4">View and manage registered users and administrators.</p>
                        <span className="text-blue-600 font-medium">Manage Users &rarr;</span>
                    </Link>

                    <Link to="/admin/orders" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 group">
                        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600">Order Management</h3>
                        <p className="text-gray-500 mb-4">View and update order status and shipping details.</p>
                        <span className="text-blue-600 font-medium">View Orders &rarr;</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
