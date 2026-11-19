import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  MessageCircle,
  Mail,
  Headphones,
  Send,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";

const WHATSAPP_NUMBER = "8801648582639";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const whatsappMessage = `
Hello AI-SaleBD!

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
    `.trim();

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      whatsappMessage,
    )}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");

    toast.success("WhatsApp message is ready. Please press Send there.");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "WhatsApp Support",
      description: "Contact us directly through WhatsApp.",
      action: "Chat on WhatsApp",
      link: `https://wa.me/${WHATSAPP_NUMBER}`,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "You can prepare your message through our contact form.",
      action: "Use Contact Form",
      link: "#contact-form",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      icon: Headphones,
      title: "Customer Assistance",
      description: "Need help with an order or product? Contact our support.",
      action: "Get Support",
      link: `https://wa.me/${WHATSAPP_NUMBER}`,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#080711] text-white">
      {/* HERO */}
      <section className="relative px-4 pb-16 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        <div className="absolute left-1/2 top-0 -z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300">
            <MessageCircle size={16} />
            We're Here to Help
          </span>

          <h1 className="mt-7 text-4xl font-extrabold sm:text-5xl md:text-6xl">
            Get in
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {" "}
              Touch
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-gray-400 sm:text-base">
            Have a question about a product, order, or service? We'd love to
            hear from you. Contact our support team and we'll do our best to
            assist you.
          </p>
        </div>
      </section>

      {/* CONTACT OPTIONS */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {contactOptions.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-[#171426] p-6 transition hover:-translate-y-1 hover:border-purple-500/40"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg} ${item.color}`}
                >
                  <Icon size={27} />
                </div>

                <h2 className="mt-5 text-lg font-bold">{item.title}</h2>

                <p className="mt-2 min-h-12 text-sm leading-6 text-gray-400">
                  {item.description}
                </p>

                <a
                  href={item.link}
                  target={
                    item.link.startsWith("https://") ? "_blank" : undefined
                  }
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-purple-300 transition hover:text-white"
                >
                  {item.action}
                  <ArrowRight size={16} />
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact-form" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-5">
          {/* LEFT INFORMATION */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-purple-400">
              Contact Us
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              Let's start a
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Conversation.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-8 text-gray-400">
              Whether you need product information, order assistance, or general
              support, send us a message through the form.
            </p>

            <div className="mt-9 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  <Clock size={21} />
                </div>

                <div>
                  <h3 className="font-semibold">Support Availability</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Contact us through WhatsApp for support and inquiries.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <h3 className="font-semibold">Customer Assistance</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Please include your order details when requesting
                    order-related assistance.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-purple-500/20 bg-purple-500/[0.07] p-5">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-purple-400" size={21} />
                  <h3 className="font-semibold">Quick Support</h3>
                </div>

                <p className="mt-3 text-sm leading-7 text-gray-400">
                  For a quicker conversation, you can contact us directly
                  through WhatsApp.
                </p>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-500"
                >
                  <MessageCircle size={18} />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/10 bg-[#171426] p-6 shadow-2xl shadow-purple-950/10 sm:p-9"
            >
              <h3 className="text-2xl font-bold">Send Us a Message</h3>

              <p className="mt-2 text-sm text-gray-400">
                Fill out the form below to prepare your WhatsApp message.
              </p>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Your Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#0e0c19] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Email Address *
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#0e0c19] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Subject *
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is your inquiry about?"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0e0c19] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500"
                />
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Your Message *
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows={6}
                  required
                  className="w-full resize-y rounded-xl border border-white/10 bg-[#0e0c19] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500"
                />
              </div>

              <button
                type="submit"
                className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-purple-950/20 transition hover:brightness-110 active:scale-[0.99]"
              >
                Prepare WhatsApp Message
                <Send size={17} />
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-gray-500">
                Your message will open in WhatsApp. You must press Send in
                WhatsApp to submit it.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-r from-purple-600/15 to-blue-600/15 px-6 py-12 text-center sm:px-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Explore the AI-SaleBD Marketplace
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-400">
            Discover digital products, explore categories, and find what you
            need in one place.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-7 py-3.5 text-sm font-bold text-white transition hover:scale-105"
          >
            Explore Products
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Contact;
