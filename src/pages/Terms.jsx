import { motion } from "framer-motion";
import {
  FileText,
  ShieldCheck,
  ShoppingBag,
  CreditCard,
  UserCheck,
  AlertTriangle,
  Scale,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
  const sections = [
    {
      icon: UserCheck,
      title: "1. Acceptance of Terms",
      content:
        "By accessing or using AI-SaleBD, you agree to follow these Terms & Conditions. If you do not agree with these terms, please do not use our website or services.",
    },
    {
      icon: ShoppingBag,
      title: "2. Products & Services",
      content:
        "AI-SaleBD offers digital products and services, including gaming products, AI tools, subscriptions, gift cards, and software. Product descriptions, features, availability, and prices are subject to change without prior notice.",
    },
    {
      icon: CreditCard,
      title: "3. Orders & Payments",
      content:
        "Customers are responsible for providing accurate order and payment information. An order is not considered confirmed until it has been reviewed and accepted by AI-SaleBD. Payment instructions and available payment methods will be communicated where applicable.",
    },
    {
      icon: ShieldCheck,
      title: "4. Digital Delivery",
      content:
        "Digital products may be delivered through the contact or delivery method specified for the order. Delivery time can vary depending on product availability and verification. Customers should provide correct contact and account information.",
    },
    {
      icon: AlertTriangle,
      title: "5. Customer Responsibilities",
      content:
        "You agree to use purchased products and services lawfully and according to their applicable terms. You must not misuse products, attempt unauthorized access, engage in fraudulent activity, or provide false information.",
    },
    {
      icon: FileText,
      title: "6. Refund & Cancellation",
      content:
        "Refund and cancellation requests are handled according to our Refund Policy. Some digital products may not be refundable after successful delivery, activation, or redemption. Please review product details before placing an order.",
    },
    {
      icon: Scale,
      title: "7. Third-Party Services",
      content:
        "Some products or services may be provided or supported by third-party platforms. Their own terms, policies, availability, and restrictions may apply. AI-SaleBD does not control third-party platforms.",
    },
    {
      icon: ShieldCheck,
      title: "8. Limitation of Responsibility",
      content:
        "AI-SaleBD will make reasonable efforts to provide accurate product information and reliable service. However, uninterrupted availability, error-free operation, and compatibility with every device or platform cannot be guaranteed.",
    },
    {
      icon: FileText,
      title: "9. Changes to These Terms",
      content:
        "AI-SaleBD may update these Terms & Conditions when necessary. Updated terms will be published on this page with a revised update date. Continued use of the website after changes indicates acceptance of the updated terms.",
    },
    {
      icon: MessageCircle,
      title: "10. Contact Information",
      content:
        "If you have questions about these Terms & Conditions, please contact our support team through the Contact page.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0B0F0C] text-[#F5F7F5]">
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.08] bg-[#0E140F] px-4 py-16 sm:py-20 md:py-24">
        <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-green-500/[0.08] blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-rose-500/[0.06] blur-[100px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-green-500/20 bg-green-500/10 shadow-lg shadow-green-950/20"
          >
            <FileText size={32} className="text-green-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Terms & <span className="text-green-400">Conditions</span>
          </motion.h1>

          <p className="mx-auto max-w-2xl text-sm leading-7 text-[#A3ADA4] sm:text-base">
            Please read these terms carefully before using AI-SaleBD or
            purchasing any digital product from our marketplace.
          </p>

          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs text-[#A3ADA4] sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Last Updated: November 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        {/* Introduction */}
        <div className="mb-8 rounded-2xl border border-green-500/15 bg-[#111711] p-5 sm:p-7">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-xl bg-green-500/10 p-2.5">
              <FileText size={21} className="text-green-400" />
            </div>

            <h2 className="text-lg font-semibold sm:text-xl">
              Welcome to AI-SaleBD
            </h2>
          </div>

          <p className="text-sm leading-7 text-[#A3ADA4]">
            These Terms & Conditions explain the general rules for accessing and
            using the AI-SaleBD website and its digital marketplace. By visiting
            our website or placing an order, you agree to these terms, subject
            to applicable laws.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-4 sm:space-y-5">
          {sections.map((section, index) => {
            const Icon = section.icon;

            return (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="group rounded-2xl border border-white/[0.07] bg-[#111711] p-5 transition-colors duration-300 hover:border-green-500/20 hover:bg-[#141A15] sm:p-7"
              >
                <div className="mb-4 flex items-start gap-3 sm:gap-4">
                  <div className="shrink-0 rounded-xl border border-green-500/10 bg-green-500/[0.08] p-3 transition-colors group-hover:bg-green-500/15">
                    <Icon size={21} className="text-green-400" />
                  </div>

                  <h2 className="pt-2 text-base font-semibold leading-6 text-[#F5F7F5] sm:text-lg">
                    {section.title}
                  </h2>
                </div>

                <p className="text-sm leading-7 text-[#A3ADA4] sm:pl-[60px]">
                  {section.content}
                </p>
              </motion.article>
            );
          })}
        </div>

        {/* Important Notice */}
        <div className="mt-8 rounded-2xl border border-rose-500/15 bg-[#141311] p-5 sm:p-7">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-xl bg-rose-500/10 p-2.5">
              <AlertTriangle size={22} className="text-rose-400" />
            </div>

            <h2 className="text-lg font-semibold">Important Notice</h2>
          </div>

          <p className="text-sm leading-7 text-[#A3ADA4]">
            These terms are general website usage guidelines and do not replace
            any rights or protections available under applicable consumer
            protection and other laws of Bangladesh.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row">
          <Link
            to="/refund-policy"
            className="rounded-xl border border-white/[0.08] bg-[#111711] px-6 py-3 text-center text-sm font-medium text-[#F5F7F5] transition duration-200 hover:border-green-500/30 hover:text-green-400"
          >
            Refund Policy
          </Link>

          <Link
            to="/contact"
            className="rounded-xl bg-green-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-green-950/20 transition duration-200 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-[#0B0F0C]"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Terms;
