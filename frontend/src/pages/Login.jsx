import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { setToken, setUser } from '../utils/auth';
import Logo from '../components/Logo';

const Login = ({ setUser }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(usernameOrEmail, password);
      setToken(response.data.token);
      setUser(response.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Gradient Background with Design */}
      <div className="hidden lg:flex lg:w-2/3 bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-600 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        
        {/* Decorative Shapes */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-32 left-32 w-4 h-4 bg-white rounded-full animate-bounce"></div>
          <div className="absolute top-64 left-64 w-6 h-6 bg-white rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-32 right-32 w-5 h-5 bg-white rounded-full animate-bounce delay-500"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-white rounded-full animate-bounce delay-700"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
          <div className="max-w-md animate-fade-in">
            <Logo size="lg" />
            <h1 className="text-6xl font-extrabold mt-6 mb-4 animate-slide-up">
              Welcome back!
            </h1>
            <p className="text-2xl text-white/90 font-bold animate-slide-up delay-200">
              Sign in to continue your ISL learning journey
            </p>
            <div className="mt-12 space-y-5">
              <div className="flex items-center gap-4 text-white font-bold text-lg">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span>Interactive 3D Avatar</span>
              </div>
              <div className="flex items-center gap-4 text-white font-bold text-lg">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span>Real-time Voice Input</span>
              </div>
              <div className="flex items-center gap-4 text-white font-bold text-lg">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span>AI-Powered Learning</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/3 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md animate-fade-in">
          <div className="mb-8">
            <Logo size="md" />
            <h2 className="text-4xl font-extrabold text-gray-800 mt-4 mb-3">Sign In</h2>
            <p className="text-gray-700 text-lg font-bold">Enter your credentials to access your account</p>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-lg font-extrabold text-gray-800 mb-3">
                Username or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-5 py-4 border-4 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all text-lg font-semibold"
                  placeholder="Username or email"
                />
              </div>
            </div>

            <div>
              <label className="block text-lg font-extrabold text-gray-800 mb-3">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-5 py-4 border-4 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all text-lg font-semibold"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span className="ml-3 text-base text-gray-700 font-bold">Remember me</span>
              </label>
              <a href="#" className="text-base text-blue-600 hover:text-blue-800 font-extrabold">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-600 text-white py-5 px-6 rounded-xl font-extrabold text-xl hover:from-blue-700 hover:via-cyan-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-xl"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-base text-gray-700 font-bold">
            New here?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-extrabold">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
