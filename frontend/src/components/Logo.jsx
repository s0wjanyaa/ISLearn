const Logo = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-2xl',
    md: 'w-14 h-14 text-3xl',
    lg: 'w-20 h-20 text-4xl'
  };

  return (
    <div className={`flex items-center gap-3 ${sizeClasses[size]}`}>
      <div className="bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-600 rounded-xl p-3 shadow-xl transform hover:rotate-12 transition-transform">
        <span className="text-white font-extrabold">ISL</span>
      </div>
      <span className="font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
        Learning
      </span>
    </div>
  );
};

export default Logo;

