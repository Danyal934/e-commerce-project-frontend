import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAdminProducts, createProduct, updateProduct, deleteProduct, resetStatus } from '../../store/slices/adminSlice';
import { FaTrash, FaEdit, FaPlus, FaTimes } from 'react-icons/fa';

const AdminProducts = () => {
    const dispatch = useDispatch();
    const { products, loading, error, success } = useSelector((state) => state.admin);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        stock: '',
        image: ''
    });

    // Auth check
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo || userInfo.role !== 'admin') {
            navigate('/login');
        } else {
            dispatch(fetchAdminProducts());
        }
    }, [dispatch, navigate, userInfo]);

    useEffect(() => {
        if (success) {
            setShowModal(false);
            setFormData({ name: '', price: '', description: '', category: '', stock: '', image: '' });
            setEditId(null);
            dispatch(resetStatus());
        }
    }, [success, dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id));
        }
    };

    const handleEdit = (product) => {
        setEditId(product._id);
        setFormData({
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            stock: product.countInStock || product.stock || 0,
            image: product.image
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditId(null);
        setFormData({ name: '', price: '', description: '', category: '', stock: '', image: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            dispatch(updateProduct({ id: editId, productData: formData }));
        } else {
            dispatch(createProduct(formData));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
                <button
                    onClick={() => {
                        setEditId(null);
                        setFormData({ name: '', price: '', description: '', category: '', stock: '', image: '' });
                        setShowModal(true);
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                >
                    <FaPlus className="mr-2" /> Add Product
                </button>
            </div>

            {loading && <div className="text-center py-4">Loading...</div>}
            {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">{error}</div>}

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 text-gray-600 font-semibold">Image</th>
                            <th className="p-4 text-gray-600 font-semibold">Name</th>
                            <th className="p-4 text-gray-600 font-semibold">Category</th>
                            <th className="p-4 text-gray-600 font-semibold">Price</th>
                            <th className="p-4 text-gray-600 font-semibold">Stock</th>
                            <th className="p-4 text-gray-600 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50">
                                <td className="p-4">
                                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                                </td>
                                <td className="p-4 font-medium text-gray-800">{product.name}</td>
                                <td className="p-4 text-gray-600">{product.category}</td>
                                <td className="p-4 text-gray-600">${product.price}</td>
                                <td className="p-4 text-gray-600">{product.stock || product.countInStock || 0}</td>
                                <td className="p-4">
                                    <div className="flex space-x-3">
                                        <button onClick={() => handleEdit(product)} className="text-blue-500 hover:text-blue-700">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:text-red-700">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl max-w-lg w-full p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">{editId ? 'Edit Product' : 'Add New Product'}</h2>
                            <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input name="name" value={formData.name} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                    <input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                                    <input name="stock" type="number" value={formData.stock} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <input name="category" value={formData.category} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                <input name="image" value={formData.image} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" rows="3" required />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 mt-4">
                                {editId ? 'Update Product' : 'Create Product'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
