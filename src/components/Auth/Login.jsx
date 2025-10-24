import React, { useState } from 'react';
import { MessageCircle, Mail, Lock, Sparkles, Loader2, LogIn, UserPlus, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
} from '../../firebase/auth';

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const saveProfile = (user) => {
    const profile = {
      name: user.displayName || name || user.email?.split('@')[0] || 'User',
      email: user.email || '',
      photoURL: user.photoURL || '',
    };
    localStorage.setItem('arogyam_profile', JSON.stringify(profile));
    // Let other parts of UI refresh immediately
    window.dispatchEvent(new Event('profileUpdated'));
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let res;
      if (isSignup) {
        res = await signUpWithEmail(email, password, name);
      } else {
        res = await signInWithEmail(email, password);
      }
      if (!res.success) throw new Error(res.error || 'Authentication failed');
      saveProfile(res.user);
      navigate('/dashboard/d');
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await signInWithGoogle();
      if (!res.success) throw new Error(res.error || 'Google sign-in failed');
      saveProfile(res.user);
      navigate('/dashboard/d');
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Brand / Back */}
      <div className="absolute top-8 left-8 z-30 flex items-center gap-3">
        <Link to="/" className="group inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back</span>
        </Link>
      </div>

      {/* Decorative background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/40 to-purple-200/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-teal-200/30 to-green-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10 grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
        {/* Left: brand pitch matching hero */}
        <div className="text-center lg:text-left space-y-8">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-full px-6 py-3 text-gray-700">
            <div className="relative">
              <MessageCircle className="h-6 w-6 text-blue-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            </div>
            <span className="font-semibold">Arogyam</span>
            <div className="flex items-center gap-1 ml-2">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-gray-500">Powered by AI</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            {isSignup ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-gray-600 text-lg max-w-xl">
            Sign {isSignup ? 'up' : 'in'} to access your dashboard, health records, and personalized insights.
          </p>
        </div>

        {/* Right: Card */}
        <div className="relative bg-white/90 backdrop-blur-2xl rounded-3xl p-8 border border-gray-200 shadow-2xl max-w-md w-full mx-auto">
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {isSignup && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">Full name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-4 pr-4 py-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none"
                    placeholder="Jane Doe"
                    required
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Processing…</span>
                </>
              ) : (
                <>
                  {isSignup ? <UserPlus className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
                  <span>{isSignup ? 'Create account' : 'Sign in'}</span>
                </>
              )}
            </button>
          </form>

          <div className="my-4 flex items-center gap-3">
            <div className="h-px bg-gray-200 flex-1" />
            <span className="text-xs text-gray-400">or</span>
            <div className="h-px bg-gray-200 flex-1" />
          </div>

          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              className="text-blue-600 hover:text-blue-700 font-semibold"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? 'Sign in' : 'Create one'}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
