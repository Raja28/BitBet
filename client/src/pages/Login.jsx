
import { useEffect, useState } from "react";
import { Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Use Link instead of <a> for SPA navigation
import ErrorMessage from "../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { error, loading, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center md:px-4 my-4">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md border border-slate-300 rounded-2xl shadow-2xl p-8 z-10">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl  font-extrabold text-white tracking-tight">
            <span className="text-slate-900">Welcome</span>
            <span className="text-blue-500">Back</span>
          </h1>
          <p className="text-slate-400 text-sm">
            Securely access your account
          </p>
        </div>

        {/* Error Message
        {error && (
          <div className="mb-6 flex items-center gap-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 p-3 rounded-lg animate-shake">
            <div className="w-1 h-1 bg-red-400 rounded-full"></div>
            {error}
          </div>
        )} */}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full  rounded-xl pl-10 pr-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full  rounded-xl pl-10 pr-12 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-300 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <ErrorMessage>{error}</ErrorMessage>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white py-2 rounded-xl text-sm md:text-lg transition-all duration-200 shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Verifying...
              </>
            ) : (
              "Login to Account"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 pt-6 border-t border-slate-800 text-center">
          <p className="text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-500 font-semibold hover:text-blue-400 transition">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}