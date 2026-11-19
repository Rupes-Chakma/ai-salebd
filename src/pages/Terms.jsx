import { motion } from "framer-motion";
import {
  FileText,
  ShieldCheck,
  ShoppingBag,
  CreditCard,
  UserCheck,
  AlertTriangle,
  Scale,
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
      icon: MessageCircleIcon,
      title: "10. Contact Information",
      content:
        "If you have questions about these Terms & Conditions, please contact our support team through the Contact page.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#11101C] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#211344] via-[#17132b] to-[#11101C] px-4 py-20">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-purple-600/20 blur-[100px]" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-blue-600/20 blur-[100px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-400/30 bg-purple-500/15"
          >
            <FileText size={32} className="text-purple-400" />
          </motion.div>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Terms & <span className="text-purple-400">Conditions</span>
          </h1>

          <p className="mx-auto max-w-2xl text-gray-300">
            Please read these terms carefully before using AI-SaleBD or
            purchasing any digital product from our marketplace.
          </p>

          <p className="mt-5 text-sm text-gray-500">
            Last Updated: November 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-4 py-14">
        <div className="mb-8 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6">
          <h2 className="mb-3 text-xl font-semibold">Welcome to AI-SaleBD</h2>
          <p className="leading-7 text-gray-300">
            These Terms & Conditions explain the general rules for accessing and
            using the AI-SaleBD website and its digital marketplace. By visiting
            our website or placing an order, you agree to these terms, subject
            to applicable laws.
          </p>
        </div>

        <div className="space-y-5">
          {sections.map((section, index) => {
            const Icon = section.icon;

            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="rounded-2xl border border-white/10 bg-[#191827] p-6 md:p-7"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-xl bg-purple-500/10 p-3">
                    <Icon size={22} className="text-purple-400" />
                  </div>
                  <h2 className="text-lg font-semibold md:text-xl">
                    {section.title}
                  </h2>
                </div>

                <p className="text-sm leading-7 text-gray-300">
                  {section.content}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Important Notice */}
        <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
          <div className="mb-3 flex items-center gap-3">
            <AlertTriangle className="text-yellow-400" size={23} />
            <h2 className="text-lg font-semibold">Important Notice</h2>
          </div>

          <p className="text-sm leading-7 text-gray-300">
            These terms are general website usage guidelines and do not replace
            any rights or protections available under applicable consumer
            protection and other laws of Bangladesh.
          </p>
        </div>

        {/* Links */}
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/refund-policy"
            className="rounded-xl border border-white/10 bg-[#191827] px-6 py-3 text-center font-medium transition hover:border-purple-500 hover:text-purple-400"
          >
            Refund Policy
          </Link>

          <Link
            to="/contact"
            className="rounded-xl bg-purple-600 px-6 py-3 text-center font-semibold transition hover:bg-purple-700"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  );
};

// Small icon component for the contact section
const MessageCircleIcon = ({ size = 22, className = "" }) => (
  <FileText size={size} className={className} />
);

export default Terms;
