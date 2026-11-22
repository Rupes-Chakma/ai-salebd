import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  return (
    <div className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-[#11101C] px-4 py-12 text-white sm:py-16">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/15 blur-[100px] sm:h-72 sm:w-72" />

      <div className="relative mx-auto w-full max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <h1 className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-[clamp(6rem,25vw,11.25rem)] font-black leading-none text-transparent">
            404
          </h1>

          <h2 className="mt-5 text-2xl font-bold sm:mt-6 sm:text-3xl">
            Page Not Found
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#AAA3C1] sm:mt-4 sm:text-base">
            Sorry! The page you are looking for doesn't exist or may have been
            moved. Let's get you back to AI-SaleBD.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row">
            <Link
              to="/"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold transition hover:bg-purple-700 active:scale-[0.98]"
            >
              <Home size={18} />
              Back to Home
            </Link>

            <Link
              to="/shop"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold transition hover:border-purple-500 hover:bg-purple-500/10 active:scale-[0.98]"
            >
              <Search size={18} />
              Explore Products
            </Link>
          </div>

          <Link
            to="/"
            className="mt-7 inline-flex min-h-10 items-center justify-center gap-2 text-sm text-[#AAA3C1] transition hover:text-purple-400 sm:mt-8"
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
