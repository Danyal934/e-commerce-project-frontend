import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../utils/axiosConfig';
import { addToCart } from '../../store/slices/cartSlice';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import { FaStar, FaShoppingCart, FaArrowLeft, FaMapMarkerAlt, FaLeaf, FaAward, FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { wishlistItems } = useSelector((state) => state.wishlist);
    const { userInfo } = useSelector((state) => state.auth);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch product:', error);
                toast.error('Failed to load product');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const addToCartHandler = () => {
        dispatch(addToCart({
            productId: product._id,
            quantity
        }));
        toast.success(`${product.name} added to cart!`);
    };

    const buyNowHandler = () => {
        dispatch(addToCart({
            productId: product._id,
            quantity
        }));
        navigate('/cart');
    };

    const isInWishlist = wishlistItems?.some((item) => item._id === product?._id);

    const wishlistHandler = () => {
        if (!userInfo) {
            toast.error('Please login to add to wishlist');
            return;
        }
        dispatch(toggleWishlist(product._id));
        if (isInWishlist) {
            toast.info('Removed from wishlist');
        } else {
            toast.success('Added to wishlist');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
                <Link to="/products" className="text-blue-600 hover:text-blue-700">
                    Back to Products
                </Link>
            </div>
        );
    }

    // Mock additional images - in real app, these would come from backend
    const productImages = [
        product.image,
        product.image,
        product.image
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition"
                >
                    <FaArrowLeft className="mr-2" />
                    Back
                </button>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-8 p-8">
                        {/* Product Images */}
                        <div>
                            {/* Main Image */}
                            <div className="mb-4 rounded-2xl overflow-hidden bg-gray-100 relative">
                                <img
                                    src={productImages[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-96 object-cover"
                                />
                                <button
                                    onClick={wishlistHandler}
                                    className="absolute top-4 right-4 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition z-10"
                                >
                                    {isInWishlist ? (
                                        <FaHeart className="w-6 h-6 text-red-500" />
                                    ) : (
                                        <FaRegHeart className="w-6 h-6 text-gray-500 hover:text-red-500" />
                                    )}
                                </button>
                            </div>

                            {/* Thumbnail Images */}
                            <div className="grid grid-cols-3 gap-4">
                                {productImages.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`rounded-lg overflow-hidden border-2 transition ${selectedImage === index
                                                ? 'border-blue-600'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-24 object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col">
                            {/* Category Badge */}
                            <div className="text-sm text-blue-600 font-semibold mb-2 uppercase tracking-wider">
                                {product.category}
                            </div>

                            {/* Product Name */}
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                {product.name}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center mb-6">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(product.rating || 4)
                                                    ? 'text-yellow-400'
                                                    : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="ml-2 text-gray-600">
                                    {product.rating || 4.0} ({product.numReviews || 0} reviews)
                                </span>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-gray-900">
                                    ${product.price.toFixed(2)}
                                </span>
                            </div>

                            {/* Product Badges */}
                            <div className="flex flex-wrap gap-3 mb-6">
                                {product.origin && (
                                    <span className="flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                                        <FaMapMarkerAlt className="mr-2" />
                                        {product.origin}
                                    </span>
                                )}
                                <span className="flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                                    <FaLeaf className="mr-2" />
                                    100% Organic
                                </span>
                                <span className="flex items-center bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium">
                                    <FaAward className="mr-2" />
                                    Premium Quality
                                </span>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Stock Status */}
                            <div className="mb-6">
                                {product.countInStock > 0 ? (
                                    <span className="text-green-600 font-semibold">
                                        In Stock ({product.countInStock} available)
                                    </span>
                                ) : (
                                    <span className="text-red-600 font-semibold">Out of Stock</span>
                                )}
                            </div>

                            {/* Quantity Selector */}
                            {product.countInStock > 0 && (
                                <div className="mb-6">
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        Quantity
                                    </label>
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-blue-600 transition flex items-center justify-center font-bold"
                                        >
                                            -
                                        </button>
                                        <span className="text-xl font-bold w-12 text-center">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                setQuantity(Math.min(product.countInStock, quantity + 1))
                                            }
                                            className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-blue-600 transition flex items-center justify-center font-bold"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                <button
                                    onClick={addToCartHandler}
                                    disabled={product.countInStock === 0}
                                    className="flex-1 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-4 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    <FaShoppingCart className="mr-2" />
                                    Add to Cart
                                </button>
                                <button
                                    onClick={buyNowHandler}
                                    disabled={product.countInStock === 0}
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="border-t border-gray-200 p-8">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <FaLeaf className="w-6 h-6 text-blue-600" />
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">100% Natural</h4>
                                <p className="text-gray-600 text-sm">
                                    No artificial additives or preservatives
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <FaAward className="w-6 h-6 text-blue-600" />
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">Premium Quality</h4>
                                <p className="text-gray-600 text-sm">
                                    Carefully selected and quality tested
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <FaMapMarkerAlt className="w-6 h-6 text-blue-600" />
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">Direct Sourcing</h4>
                                <p className="text-gray-600 text-sm">
                                    Straight from European farms
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
