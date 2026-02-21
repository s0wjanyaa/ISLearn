const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-cyan-800 to-emerald-900 text-white mt-auto">
      <div className="max-w-full mx-auto px-6 lg:px-16 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-extrabold mb-6">ISL Learning Assistant</h3>
            <p className="text-gray-200 text-lg font-semibold">
              Learn Indian Sign Language interactively with AI-powered assistance and 3D avatar demonstrations.
            </p>
          </div>
          <div>
            <h4 className="font-extrabold text-xl mb-6">Quick Links</h4>
            <ul className="space-y-3 text-lg text-gray-200">
              <li><a href="#" className="hover:text-yellow-300 transition-colors font-bold">About</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors font-bold">Features</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors font-bold">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold text-xl mb-6">Contact</h4>
            <p className="text-lg text-gray-200 font-semibold">
              Email: support@isllearning.com<br />
              © 2024 ISL Learning. All rights reserved.
            </p>
          </div>
        </div>
        <div className="border-t border-white/20 mt-10 pt-8 text-center text-lg text-gray-200 font-bold">
          <p>Made with ❤️ for inclusive learning</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

