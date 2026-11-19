import { motion } from "framer-motion";
import {
  ShieldCheck,
  User,
  Database,
  Cookie,
  Lock,
  Share2,
  RefreshCw,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: User,
      title: "1. Information We May Collect",
      content:
        "When you use AI-SaleBD or place an order, we may collect information you provide, such as your name, contact number, email address, delivery details, and order information. Please do not share passwords or sensitive account credentials unless a specific process requires them and you understand the risks.",
    },
    {
      icon: Database,
      title: "2. How We Use Your Information",
      content:
        "Information may be used to process and manage orders, communicate with customers, respond to support requests, verify transactions, improve our services, and help prevent fraudulent activity.",
    },
    {
      icon: Lock,
      title: "3. Information Security",
      content:
        "We aim to take reasonable steps to protect customer information against unauthorized access, misuse, or disclosure. However, no website or electronic transmission method can guarantee absolute security.",
    },
    {
      icon: Share2,
      title: "4. Sharing of Information",
      content:
        "We do not intend to sell customers' personal information. Information may be shared with relevant service providers or payment partners when necessary to process orders, provide services, or comply with applicable legal requirements.",
    },
    {
      icon: Cookie,
      title: "5. Cookies & Website Data",
      content:
        "Our website may use browser storage, cookies, or similar technologies to support essential features and improve the browsing experience. You can manage cookies through your browser settings, although some website features may not work properly if they are disabled.",
    },
    {
      icon: ShieldCheck,
      title: "6. Third-Party Services",
      content:
        "Some products, payment methods, or services may involve third-party platforms. Those platforms have their own privacy policies and practices. We encourage customers to review the relevant policies before using external services.",
    },
    {
      icon: User,
      title: "7. Your Choices",
      content:
        "You may contact us to ask about personal information associated with your orders or request correction of inaccurate details where applicable. We may need to retain certain records for legitimate business or legal purposes.",
    },
    {
      icon: RefreshCw,
      title: "8. Changes to This Policy",
      content:
        "We may update this Privacy Policy from time to time. Any updated version will be published on this page with a revised update date.",
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
            <ShieldCheck size={32} className="text-purple-400" />
          </motion.div>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Privacy <span className="text-purple-400">Policy</span>
          </h1>

          <p className="mx-auto max-w-2xl text-gray-300">
            Your privacy matters to us. Learn how AI-SaleBD may collect, use,
            and protect your information when you use our website.
          </p>

          <p className="mt-5 text-sm text-gray-500">
            Last Updated: November 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-4 py-14">
        <div className="mb-8 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6">
          <h2 className="mb-3 text-xl font-semibold">
            Welcome to AI-SaleBD Privacy Policy
          </h2>

          <p className="text-sm leading-7 text-gray-300">
            This policy describes how information may be handled when you visit
            our website, contact our team, or purchase digital products through
            AI-SaleBD. By using our website, you acknowledge this policy.
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
                transition={{ delay: index * 0.05 }}
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

        {/* Contact */}
        <div className="mt-10 rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-600/15 to-blue-600/10 p-8 text-center">
          <Mail className="mx-auto mb-4 text-purple-400" size={32} />

          <h2 className="mb-3 text-2xl font-bold">
            Questions About Your Privacy?
          </h2>

          <p className="mb-6 text-gray-300">
            Contact our support team if you have questions about this policy or
            your personal information.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold transition hover:bg-purple-700"
          >
            Contact Support
            <Mail size={18} />
          </Link>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <Link to="/terms" className="transition hover:text-purple-400">
            Read our Terms & Conditions
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
