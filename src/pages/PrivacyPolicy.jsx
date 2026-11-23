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
            <ShieldCheck size={32} className="text-green-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Privacy <span className="text-green-400">Policy</span>
          </motion.h1>

          <p className="mx-auto max-w-2xl text-sm leading-7 text-[#A3ADA4] sm:text-base">
            Your privacy matters to us. Learn how AI-SaleBD may collect, use,
            and protect your information when you use our website.
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
              <ShieldCheck size={21} className="text-green-400" />
            </div>

            <h2 className="text-lg font-semibold sm:text-xl">
              Welcome to AI-SaleBD Privacy Policy
            </h2>
          </div>

          <p className="text-sm leading-7 text-[#A3ADA4]">
            This policy describes how information may be handled when you visit
            our website, contact our team, or purchase digital products through
            AI-SaleBD. By using our website, you acknowledge this policy.
          </p>
        </div>

        {/* Policy Sections */}
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

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-8 rounded-2xl border border-green-500/15 bg-[#111711] p-6 text-center sm:mt-10 sm:p-9"
        >
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-green-500/15 bg-green-500/10">
            <Mail size={27} className="text-green-400" />
          </div>

          <h2 className="mb-3 text-xl font-bold sm:text-2xl">
            Questions About Your Privacy?
          </h2>

          <p className="mx-auto mb-6 max-w-xl text-sm leading-7 text-[#A3ADA4]">
            Contact our support team if you have questions about this policy or
            your personal information.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-950/20 transition duration-200 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-[#111711]"
          >
            Contact Support
            <Mail size={17} />
          </Link>
        </motion.div>

        {/* Terms Link */}
        <div className="mt-7 text-center">
          <Link
            to="/terms"
            className="inline-flex items-center gap-2 text-sm text-[#A3ADA4] transition-colors hover:text-green-400"
          >
            Read our Terms & Conditions
            <span className="text-rose-400">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
