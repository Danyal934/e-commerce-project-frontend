import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/slices/authSlice';
import { FaUser, FaEnvelope, FaLock, FaCheck } from 'react-icons/fa';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { userInfo, loading, error } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
    
    // Check password strength
    const strength = calculatePasswordStrength(formData.password);
    setPasswordStrength(strength);
  }, [userInfo, navigate, formData.password]);
  
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const submitHandler = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    dispatch(register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    }));
  };
  
  const getPasswordStrengthColor = () => {
    switch(passwordStrength) {
      case 0: return 'bg-gray-200';
      case 1: return 'bg-red-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-blue-500';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-200';
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
            <span className="text-3xl font-bold text-gray-800">WorldPantry</span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join WorldPantry for the finest natural products
          </p>
        </div>
        
        {/* Register Form */}
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}
          
          <form onSubmit={submitHandler} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  className="input-field pl-10"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  className="input-field pl-10"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  className="input-field pl-10 pr-10"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="text-sm text-gray-500 hover:text-gray-700">
                    {showPassword ? 'Hide' : 'Show'}
                  </span>
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Password strength</span>
                    <span className="text-xs font-medium">
                      {passwordStrength === 0 && 'Very Weak'}
                      {passwordStrength === 1 && 'Weak'}
                      {passwordStrength === 2 && 'Fair'}
                      {passwordStrength === 3 && 'Good'}
                      {passwordStrength === 4 && 'Strong'}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                      style={{ width: `${passwordStrength * 25}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  className="input-field pl-10"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {formData.password && formData.confirmPassword && (
                <div className="mt-2 flex items-center">
                  {formData.password === formData.confirmPassword ? (
                    <>
                      <FaCheck className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-green-600">Passwords match</span>
                    </>
                  ) : (
                    <span className="text-sm text-red-600">Passwords do not match</span>
                  )}
                </div>
              )}
            </div>
            
            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <Link to="/terms" className="text-primary-600 hover:text-primary-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </Link>
              </label>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-lg font-medium"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
            
            {/* Already have account */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
