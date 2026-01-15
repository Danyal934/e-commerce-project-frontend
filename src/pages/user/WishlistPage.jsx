import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getWishlist, toggleWishlist } from '../../store/slices/wishlistSlice';
import ProductCard from '../../components/Product/ProductCard';
import { FaHeartBroken } from 'react-icons/fa';

const WishlistPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { wishlistItems, loading } = useSelector((state) => state.wishlist);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            dispatch(getWishlist());
        }
    }, [dispatch, navigate, userInfo]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">My Wishlist</h1>

                {wishlistItems.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                        <FaHeartBroken className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Your wishlist is empty
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Save items you love to revisit later
                        </p>
                        <Link
                            to="/products"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {wishlistItems.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
