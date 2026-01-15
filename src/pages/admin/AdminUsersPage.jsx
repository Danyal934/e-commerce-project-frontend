import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, deleteUser } from '../../store/slices/adminSlice';
import { FaTrash, FaUserShield } from 'react-icons/fa';

const AdminUsers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users, loading, error } = useSelector((state) => state.admin);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!userInfo || userInfo.role !== 'admin') {
            navigate('/login');
        } else {
            dispatch(fetchUsers());
        }
    }, [dispatch, userInfo, navigate]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            dispatch(deleteUser(id));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">User Management</h1>

            {loading && <div className="text-center py-4">Loading...</div>}
            {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">{error}</div>}

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 text-gray-600 font-semibold">ID</th>
                            <th className="p-4 text-gray-600 font-semibold">Name</th>
                            <th className="p-4 text-gray-600 font-semibold">Email</th>
                            <th className="p-4 text-gray-600 font-semibold">Role</th>
                            <th className="p-4 text-gray-600 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="p-4 text-sm text-gray-500 font-mono">{user._id.substring(0, 10)}...</td>
                                <td className="p-4 font-medium text-gray-800">{user.name}</td>
                                <td className="p-4 text-gray-600">
                                    <a href={`mailto:${user.email}`} className="hover:text-blue-600">{user.email}</a>
                                </td>
                                <td className="p-4">
                                    {user.role === 'admin' ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                            <FaUserShield className="mr-1" /> Admin
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            User
                                        </span>
                                    )}
                                </td>
                                <td className="p-4">
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="text-red-500 hover:text-red-700 disabled:opacity-50"
                                        disabled={user.role === 'admin'}
                                        title={user.role === 'admin' ? "Cannot delete admin" : "Delete User"}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
