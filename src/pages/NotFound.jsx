import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-[75vh] items-center justify-center overflow-hidden bg-[#11101C] px-4 py-16 text-white">
      <div className="relative mx-auto max-w-2xl text-center">
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/15 blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <h1 className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-[120px] font-black leading-none text-transparent sm:text-[180px]">
            404
          </h1>

          <h2 className="mt-6 text-2xl font-bold sm:text-3xl">
            Page Not Found
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#AAA3C1] sm:text-base">
            Sorry! The page you are looking for doesn't exist or may have been
            moved. Let's get you back to NEXORA.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold transition hover:bg-purple-700"
            >
              <Home size={18} />
              Back to Home
            </Link>

            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold transition hover:border-purple-500 hover:bg-purple-500/10"
            >
              <Search size={18} />
              Explore Products
            </Link>
          </div>

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 text-sm text-[#AAA3C1] transition hover:text-purple-400"
          >
            <ArrowLeft size={16} />
            Return to homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
