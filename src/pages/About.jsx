import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Headphones,
  Globe,
  Target,
  Heart,
  ShoppingBag,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: ShieldCheck,
    title: "Trust & Security",
    description:
      "We focus on providing a reliable shopping experience with clear product information and transparent policies.",
  },
  {
    icon: Zap,
    title: "Fast & Simple",
    description:
      "Our goal is to make finding and purchasing digital products simple, convenient, and hassle-free.",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description:
      "We believe customers deserve helpful communication and support throughout their shopping journey.",
  },
  {
    icon: Globe,
    title: "Digital Access",
    description:
      "We bring different types of digital products together in one convenient marketplace.",
  },
];

const categories = [
  "AI Tools",
  "Gaming",
  "Subscriptions",
  "Gift Cards",
  "Software",
];

export default function About() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080711] text-white">
      {/* Hero Section */}
      <section className="relative px-4 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">
        <div className="absolute left-1/2 top-0 -z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute right-0 top-40 -z-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[110px]" />

        <div className="relative mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300"
          >
            <span className="h-2 w-2 rounded-full bg-purple-400" />
            Get to know AI-SaleBD
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-7xl"
          >
            Your Digital World,
            <span className="block bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
              One Marketplace.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-7 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg"
          >
            AI-SaleBD is a digital marketplace designed to bring digital
            products together in one convenient place. Explore software, AI
            tools, subscriptions, gaming products, and more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-7 py-3.5 font-semibold transition hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
            >
              Explore Marketplace
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/contact"
              className="rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 font-semibold text-gray-200 transition hover:border-purple-500/50 hover:bg-white/10"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-purple-400">
              Who We Are
            </p>

            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              Making the digital world more accessible.
            </h2>

            <p className="mt-6 leading-8 text-gray-400">
              AI-SaleBD aims to make digital shopping easier by bringing a
              variety of digital products into one marketplace. Instead of
              searching across multiple places, customers can explore different
              categories from a single platform.
            </p>

            <p className="mt-4 leading-8 text-gray-400">
              We are building AI-SaleBD with a focus on convenience, transparent
              information, and a smooth customer experience.
            </p>

            <div className="mt-7 space-y-3">
              {[
                "A convenient digital shopping experience",
                "Multiple digital product categories",
                "Customer-focused communication",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2
                    size={19}
                    className="shrink-0 text-purple-400"
                  />
                  <span className="text-sm text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 blur-2xl" />

            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#171329] to-[#0d1020] p-8 sm:p-10">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-600/20">
                <ShoppingBag size={30} />
              </div>

              <h3 className="text-2xl font-bold">Welcome to AI-SaleBD</h3>
              <p className="mt-3 leading-7 text-gray-400">
                Your destination for exploring digital products and services in
                one place.
              </p>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-gray-400">Our tagline</p>
                <p className="mt-2 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-xl font-bold text-transparent">
                  Your Digital World, One Marketplace.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-600/15 to-transparent p-8 sm:p-10"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-400">
              <Target size={28} />
            </div>
            <h3 className="text-2xl font-bold">Our Mission</h3>
            <p className="mt-4 leading-8 text-gray-400">
              To make digital products easier to discover and access through a
              convenient, user-friendly marketplace that values customer
              experience and transparency.
            </p>
          </motion.div>

          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/15 to-transparent p-8 sm:p-10"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400">
              <Heart size={28} />
            </div>
            <h3 className="text-2xl font-bold">Our Vision</h3>
            <p className="mt-4 leading-8 text-gray-400">
              To grow into a trusted digital marketplace where people can
              discover a wide range of useful digital products and enjoy a
              simple shopping experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-purple-400">
              What Matters to Us
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">
              The values behind AI-SaleBD
            </h2>
            <p className="mt-4 leading-7 text-gray-400">
              The principles that guide the experience we want to build.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-purple-500/40 hover:bg-purple-500/[0.05]"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold">{value.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-400">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-br from-[#171329] to-[#0e1323] px-6 py-12 text-center sm:px-12">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-purple-400">
            Explore AI-SaleBD
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Everything digital, in one place.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-400">
            Discover different digital product categories available through our
            marketplace.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-purple-500/20 bg-purple-500/10 px-5 py-2.5 text-sm text-purple-200"
              >
                {category}
              </span>
            ))}
          </div>

          <Link
            to="/shop"
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-7 py-3.5 font-semibold transition hover:scale-105"
          >
            Start Exploring
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
