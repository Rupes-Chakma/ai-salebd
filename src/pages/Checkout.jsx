import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  ShoppingBag,
  ShieldCheck,
  UserRound,
  Phone,
  Mail,
  CreditCard,
  AlertCircle,
  Package,
  MapPin,
  Plus,
  Home,
  BriefcaseBusiness,
  Pencil,
  MapPinned,
  MessageCircle,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

import useCartStore from "../store/cartStore";
import useProductStore from "../store/useProductStore";

const WHATSAPP_NUMBER = "8801648582639";

const ADDRESS_KEY = "nexora-addresses";
const DEFAULT_ADDRESS_KEY = "nexora-default-address";

const paymentMethods = [
  { id: "bKash", name: "bKash", color: "border-pink-500" },
  { id: "Nagad", name: "Nagad", color: "border-orange-500" },
  { id: "Rocket", name: "Rocket", color: "border-purple-500" },
];

const emptyAddress = {
  fullName: "",
  phone: "",
  district: "",
  area: "",
  address: "",
  label: "Home",
};

const formatPrice = (price) => `৳${Number(price || 0).toLocaleString("en-BD")}`;

const safeQuantity = (value) => {
  const quantity = Math.floor(Number(value));

  return Number.isFinite(quantity) ? Math.max(1, Math.min(99, quantity)) : 1;
};

const normalizePhone = (value) => {
  let phone = String(value || "").replace(/\D/g, "");

  if (phone.startsWith("880")) {
    phone = phone.slice(2);
  }

  return phone;
};

const isValidPhone = (value) => /^01[3-9]\d{8}$/.test(normalizePhone(value));

const getSavedAddresses = () => {
  try {
    const data = JSON.parse(localStorage.getItem(ADDRESS_KEY) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

const getCategoryName = (category) => {
  if (!category) return "Digital Product";

  if (typeof category === "string") return category;

  return category.name || category.title || category.slug || "Digital Product";
};

function Checkout() {
  const cartItems = useCartStore((state) => state.cartItems);
  const products = useProductStore((state) => state.products);

  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
  const safeProducts = Array.isArray(products) ? products : [];

  const [addresses, setAddresses] = useState(getSavedAddresses);

  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    const saved = getSavedAddresses();
    const defaultId = localStorage.getItem(DEFAULT_ADDRESS_KEY);

    if (saved.some((item) => item.id === defaultId)) {
      return defaultId;
    }

    return saved[0]?.id || "";
  });

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState(emptyAddress);

  const [name, setName] = useState(() => {
    const saved = getSavedAddresses();
    const defaultId = localStorage.getItem(DEFAULT_ADDRESS_KEY);
    const selected = saved.find((item) => item.id === defaultId) || saved[0];

    return selected?.fullName || "";
  });

  const [phone, setPhone] = useState(() => {
    const saved = getSavedAddresses();
    const defaultId = localStorage.getItem(DEFAULT_ADDRESS_KEY);
    const selected = saved.find((item) => item.id === defaultId) || saved[0];

    return normalizePhone(selected?.phone || "");
  });

  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bKash");
  const [isOpeningWhatsApp, setIsOpeningWhatsApp] = useState(false);

  const selectedAddress = addresses.find(
    (item) => item.id === selectedAddressId,
  );

  // Validate products, variants, prices and stock.
  const validatedItems = useMemo(() => {
    return safeCartItems.map((item) => {
      const product = safeProducts.find(
        (current) => String(current.id) === String(item.productId),
      );

      const quantity = safeQuantity(item.quantity);

      if (!product || (product.status && product.status !== "Active")) {
        return {
          ...item,
          currentProduct: product,
          currentVariant: null,
          currentPrice: 0,
          quantity,
          issue: "unavailable",
        };
      }

      const variants = Array.isArray(product.variants) ? product.variants : [];

      let currentVariant = null;

      if (variants.length > 0) {
        currentVariant = variants.find(
          (variant) =>
            String(variant.id ?? variant.name) === String(item.variantId) ||
            String(variant.name) === String(item.variantName),
        );

        if (!currentVariant) {
          return {
            ...item,
            currentProduct: product,
            currentVariant: null,
            currentPrice: 0,
            quantity,
            issue: "variant-unavailable",
          };
        }
      }

      const currentPrice = Number(currentVariant?.price ?? product.price);

      if (!Number.isFinite(currentPrice) || currentPrice < 0) {
        return {
          ...item,
          currentProduct: product,
          currentVariant,
          currentPrice: 0,
          quantity,
          issue: "invalid-price",
        };
      }

      const stockValue = currentVariant ? currentVariant.stock : product.stock;

      const stock = Number(stockValue);

      const hasStockLimit =
        stockValue !== undefined &&
        stockValue !== null &&
        stockValue !== "" &&
        Number.isFinite(stock);

      if (hasStockLimit && stock <= 0) {
        return {
          ...item,
          currentProduct: product,
          currentVariant,
          currentPrice,
          quantity,
          issue: "out-of-stock",
        };
      }

      if (hasStockLimit && quantity > stock) {
        return {
          ...item,
          currentProduct: product,
          currentVariant,
          currentPrice,
          quantity,
          availableStock: Math.floor(stock),
          issue: "insufficient-stock",
        };
      }

      return {
        ...item,
        currentProduct: product,
        currentVariant,
        currentPrice,
        quantity,
        issue: null,
      };
    });
  }, [safeCartItems, safeProducts]);

  const unavailableItems = validatedItems.filter((item) => item.issue !== null);

  const hasUnavailableItems = unavailableItems.length > 0;

  const totalQuantity = validatedItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const subtotal = validatedItems.reduce((sum, item) => {
    if (item.issue) return sum;

    return sum + item.currentPrice * item.quantity;
  }, 0);

  // Select a saved address.
  const handleSelectAddress = (item) => {
    setSelectedAddressId(item.id);
    setName(item.fullName);
    setPhone(normalizePhone(item.phone));

    toast.success("Delivery address selected!");
  };

  // Address form input.
  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save a new address.
  const handleSaveAddress = () => {
    const cleanedPhone = normalizePhone(addressForm.phone);

    if (!addressForm.fullName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!isValidPhone(cleanedPhone)) {
      toast.error("Please enter a valid Bangladesh phone number.");
      return;
    }

    if (!addressForm.district.trim() || !addressForm.area.trim()) {
      toast.error("Please enter your district and area.");
      return;
    }

    if (!addressForm.address.trim()) {
      toast.error("Please enter your address details.");
      return;
    }

    const newAddress = {
      id: Date.now().toString(),
      ...addressForm,
      fullName: addressForm.fullName.trim(),
      phone: cleanedPhone,
      district: addressForm.district.trim(),
      area: addressForm.area.trim(),
      address: addressForm.address.trim(),
    };

    const updatedAddresses = [...addresses, newAddress];

    try {
      localStorage.setItem(ADDRESS_KEY, JSON.stringify(updatedAddresses));

      if (addresses.length === 0) {
        localStorage.setItem(DEFAULT_ADDRESS_KEY, newAddress.id);
      }

      setAddresses(updatedAddresses);
      setSelectedAddressId(newAddress.id);
      setName(newAddress.fullName);
      setPhone(newAddress.phone);
      setAddressForm(emptyAddress);
      setShowAddressForm(false);

      toast.success("New address saved and selected!");
    } catch (error) {
      console.error("Address save error:", error);
      toast.error("Could not save address. Please try again.");
    }
  };

  // WhatsApp Checkout.
  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();

    if (isOpeningWhatsApp) return;

    if (safeCartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // Recheck the latest product data before checkout.
    const currentProducts = useProductStore.getState().products || [];

    const latestIssues = safeCartItems.some((item) => {
      const product = currentProducts.find(
        (current) => String(current.id) === String(item.productId),
      );

      if (!product || (product.status && product.status !== "Active")) {
        return true;
      }

      const variants = Array.isArray(product.variants) ? product.variants : [];

      let variant = null;

      if (variants.length > 0) {
        variant = variants.find(
          (current) =>
            String(current.id ?? current.name) === String(item.variantId) ||
            String(current.name) === String(item.variantName),
        );

        if (!variant) return true;
      }

      const price = Number(variant?.price ?? product.price);

      if (!Number.isFinite(price) || price < 0) return true;

      const stockValue = variant ? variant.stock : product.stock;
      const stock = Number(stockValue);

      const hasStockLimit =
        stockValue !== undefined &&
        stockValue !== null &&
        stockValue !== "" &&
        Number.isFinite(stock);

      if (hasStockLimit && stock < safeQuantity(item.quantity)) {
        return true;
      }

      if (hasStockLimit && stock <= 0) {
        return true;
      }

      return false;
    });

    if (hasUnavailableItems || latestIssues) {
      toast.error("Some products need attention. Please review your cart.");
      return;
    }

    if (!name.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!isValidPhone(phone)) {
      toast.error("Enter a valid Bangladesh mobile number.");
      return;
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Enter a valid email address.");
      return;
    }

    const orderLines = validatedItems.map((item, index) => {
      const itemTotal = item.currentPrice * item.quantity;

      return [
        `${index + 1}. ${item.currentProduct.name || item.name}`,
        `   Category: ${getCategoryName(item.currentProduct.category || item.category)}`,
        `   Package: ${item.currentVariant?.name || item.variantName || "Default"}`,
        `   Unit Price: ${formatPrice(item.currentPrice)}`,
        `   Quantity: ${item.quantity}`,
        `   Subtotal: ${formatPrice(itemTotal)}`,
      ].join("\n");
    });

    const addressLines = selectedAddress
      ? [
          "----- DELIVERY ADDRESS -----",
          `Name: ${selectedAddress.fullName}`,
          `Phone: ${selectedAddress.phone}`,
          `Address: ${selectedAddress.address}`,
          `Area: ${selectedAddress.area}`,
          `District: ${selectedAddress.district}`,
        ]
      : ["Delivery Address: Not provided (Digital Product)"];

    const message = [
      "Hello AI-SaleBD! I want to place an order.",
      "",
      "----- CUSTOMER DETAILS -----",
      `Name: ${name.trim()}`,
      `Mobile: ${normalizePhone(phone)}`,
      `Email: ${email.trim() || "Not provided"}`,
      "",
      ...addressLines,
      "",
      "----- ORDER DETAILS -----",
      "",
      ...orderLines,
      "",
      "---------------------------",
      `Total Products: ${totalQuantity}`,
      `Grand Total: ${formatPrice(subtotal)}`,
      `Payment Preference: ${paymentMethod}`,
      "",
      "Please confirm product availability and payment instructions.",
      "",
      "Thank you!",
    ].join("\n");

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    setIsOpeningWhatsApp(true);

    const whatsappWindow = window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer",
    );

    if (!whatsappWindow) {
      setIsOpeningWhatsApp(false);
      toast.error(
        "WhatsApp could not open. Please allow pop-ups and try again.",
      );
      return;
    }

    toast.success("Order details are ready in WhatsApp.");

    // Cart is intentionally not cleared here.
    // The customer should confirm the order with the store first.
    setTimeout(() => setIsOpeningWhatsApp(false), 1500);
  };

  // Empty Cart.
  if (safeCartItems.length === 0) {
    return (
      <section className="container-custom flex min-h-[60vh] flex-col items-center justify-center px-3 py-12 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-[#211B3B]">
          <ShoppingBag size={38} className="text-[#8B5CF6]" />
        </div>

        <h2 className="mt-5 text-2xl font-bold text-white">
          Your Cart is Empty
        </h2>

        <p className="mt-2 max-w-sm text-sm leading-6 text-[#AAA3C1]">
          Add some products before proceeding to checkout.
        </p>

        <Link
          to="/shop"
          className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#8B5CF6] px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
        >
          <ShoppingBag size={17} />
          Explore Products
        </Link>
      </section>
    );
  }

  return (
    <section className="container-custom max-w-6xl px-3 py-6 pb-12 sm:px-0 sm:py-10">
      {/* Back to Cart */}
      <Link
        to="/cart"
        className="mb-5 inline-flex min-h-10 items-center gap-2 text-sm text-[#AAA3C1] transition hover:text-white"
      >
        <ArrowLeft size={17} />
        Back to Cart
      </Link>

      {/* Page Heading */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B99AFF] sm:text-xs">
          <ShoppingBag size={15} />
          AI-SaleBD Checkout
        </div>

        <h1 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
          Complete Your Order
        </h1>

        <p className="mt-2 text-xs leading-6 text-[#AAA3C1] sm:text-sm">
          Provide your details to send your order through WhatsApp.
        </p>
      </div>

      {/* Unavailable Products */}
      {hasUnavailableItems && (
        <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
          <AlertCircle size={20} className="mt-0.5 shrink-0 text-red-400" />

          <div className="min-w-0">
            <p className="text-sm font-semibold text-red-300">
              Some products need attention
            </p>

            <p className="mt-1 text-xs leading-6 text-[#AAA3C1]">
              {unavailableItems.length} item(s) are unavailable, have changed
              packages, or have insufficient stock. Please return to your cart
              and review these products.
            </p>

            <Link
              to="/cart"
              className="mt-2 inline-flex min-h-9 items-center text-xs font-bold text-red-300 underline"
            >
              Return to Cart
            </Link>
          </div>
        </div>
      )}

      <form
        onSubmit={handleWhatsAppCheckout}
        className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_370px] lg:gap-6"
      >
        <div className="min-w-0 space-y-4 sm:space-y-5">
          {/* Delivery Address */}
          <div className="rounded-2xl border border-white/10 bg-[#211B3B] p-4 sm:p-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8B5CF6]/15 text-[#B99AFF]">
                  <MapPin size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-white">Delivery Address</h2>

                  <p className="text-xs text-[#AAA3C1]">
                    Optional for digital products
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAddressForm((prev) => !prev)}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 px-4 py-2.5 text-xs font-semibold text-[#B99AFF] transition hover:bg-[#8B5CF6]/20"
              >
                <Plus size={16} />
                Add New Address
              </button>
            </div>

            {/* Saved Addresses */}
            {addresses.length > 0 ? (
              <div className="mt-5 space-y-3">
                {addresses.map((item) => {
                  const isSelected = selectedAddressId === item.id;

                  const isDefault =
                    localStorage.getItem(DEFAULT_ADDRESS_KEY) === item.id;

                  const AddressIcon =
                    item.label === "Work" ? BriefcaseBusiness : Home;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectAddress(item)}
                      className={`w-full rounded-xl border p-3.5 text-left transition sm:p-4 ${
                        isSelected
                          ? "border-[#8B5CF6] bg-[#8B5CF6]/10"
                          : "border-white/10 bg-[#171329] hover:border-white/30"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#8B5CF6]/15 text-[#B99AFF]">
                          <AddressIcon size={19} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-bold text-white">
                              {item.label}
                            </h3>

                            {isDefault && (
                              <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-semibold text-green-400">
                                Default
                              </span>
                            )}

                            {isSelected && (
                              <span className="rounded-full bg-[#8B5CF6]/20 px-2 py-0.5 text-[10px] font-semibold text-[#B99AFF]">
                                Selected
                              </span>
                            )}
                          </div>

                          <p className="mt-2 text-sm font-semibold text-white">
                            {item.fullName}
                          </p>

                          <p className="mt-1 text-xs text-[#AAA3C1]">
                            {item.phone}
                          </p>

                          <p className="mt-2 flex items-start gap-2 text-xs leading-5 text-[#AAA3C1]">
                            <MapPinned size={14} className="mt-0.5 shrink-0" />
                            <span>
                              {item.address}, {item.area}, {item.district}
                            </span>
                          </p>
                        </div>

                        <div className="shrink-0 pt-1">
                          {isSelected ? (
                            <CheckCircle2
                              size={21}
                              className="text-[#B99AFF]"
                            />
                          ) : (
                            <div className="h-5 w-5 rounded-full border border-white/30" />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-dashed border-white/15 bg-[#171329] px-4 py-6 text-center">
                <MapPin size={27} className="mx-auto text-[#B99AFF]" />

                <p className="mt-3 text-sm font-semibold text-white">
                  No Saved Address
                </p>

                <p className="mt-1 text-xs text-[#AAA3C1]">
                  You can add an address if needed.
                </p>
              </div>
            )}

            {/* Address Form */}
            {showAddressForm && (
              <div className="mt-5 space-y-4 rounded-xl border border-[#8B5CF6]/30 bg-[#171329] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-bold text-white">Add New Address</h3>

                  <button
                    type="button"
                    onClick={() => {
                      setShowAddressForm(false);
                      setAddressForm(emptyAddress);
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-[#AAA3C1] hover:bg-white/10 hover:text-white"
                    aria-label="Close address form"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {["Home", "Work"].map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() =>
                        setAddressForm((prev) => ({
                          ...prev,
                          label,
                        }))
                      }
                      className={`flex min-h-11 items-center justify-center gap-2 rounded-lg border text-sm font-semibold transition ${
                        addressForm.label === label
                          ? "border-[#8B5CF6] bg-[#8B5CF6]/15 text-[#B99AFF]"
                          : "border-white/10 text-[#AAA3C1]"
                      }`}
                    >
                      {label === "Home" ? (
                        <Home size={16} />
                      ) : (
                        <BriefcaseBusiness size={16} />
                      )}
                      {label}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  name="fullName"
                  value={addressForm.fullName}
                  onChange={handleAddressChange}
                  placeholder="Full Name"
                  maxLength={100}
                  autoComplete="name"
                  className="w-full rounded-lg border border-white/10 bg-[#211B3B] px-4 py-3.5 text-sm text-white outline-none focus:border-[#8B5CF6] placeholder:text-[#77718E]"
                />

                <input
                  type="tel"
                  name="phone"
                  value={addressForm.phone}
                  onChange={(e) =>
                    setAddressForm((prev) => ({
                      ...prev,
                      phone: e.target.value.slice(0, 15),
                    }))
                  }
                  placeholder="Phone Number (01XXXXXXXXX)"
                  maxLength={15}
                  inputMode="numeric"
                  className="w-full rounded-lg border border-white/10 bg-[#211B3B] px-4 py-3.5 text-sm text-white outline-none focus:border-[#8B5CF6] placeholder:text-[#77718E]"
                />

                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    name="district"
                    value={addressForm.district}
                    onChange={handleAddressChange}
                    placeholder="District"
                    maxLength={80}
                    className="w-full rounded-lg border border-white/10 bg-[#211B3B] px-4 py-3.5 text-sm text-white outline-none focus:border-[#8B5CF6] placeholder:text-[#77718E]"
                  />

                  <input
                    type="text"
                    name="area"
                    value={addressForm.area}
                    onChange={handleAddressChange}
                    placeholder="Area / Upazila"
                    maxLength={100}
                    className="w-full rounded-lg border border-white/10 bg-[#211B3B] px-4 py-3.5 text-sm text-white outline-none focus:border-[#8B5CF6] placeholder:text-[#77718E]"
                  />
                </div>

                <textarea
                  name="address"
                  value={addressForm.address}
                  onChange={handleAddressChange}
                  placeholder="House number, road, area and other details"
                  rows={3}
                  maxLength={500}
                  className="w-full resize-y rounded-lg border border-white/10 bg-[#211B3B] px-4 py-3.5 text-sm text-white outline-none focus:border-[#8B5CF6] placeholder:text-[#77718E]"
                />

                <button
                  type="button"
                  onClick={handleSaveAddress}
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#2563EB] px-4 py-3 text-sm font-bold text-white transition hover:opacity-90"
                >
                  <CheckCircle2 size={17} />
                  Save & Select Address
                </button>
              </div>
            )}

            <Link
              to="/addresses"
              className="mt-4 inline-flex min-h-9 items-center gap-2 text-xs font-semibold text-[#38BDF8] hover:text-white"
            >
              <Pencil size={14} />
              Manage Saved Addresses
            </Link>
          </div>

          {/* Customer Information */}
          <div className="rounded-2xl border border-white/10 bg-[#211B3B] p-4 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8B5CF6]/15 text-[#B99AFF]">
                <UserRound size={20} />
              </div>

              <div>
                <h2 className="font-bold text-white">Customer Information</h2>

                <p className="text-xs text-[#AAA3C1]">
                  Confirm your contact details
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-semibold text-white">
                  Full Name <span className="text-red-400">*</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={80}
                  autoComplete="name"
                  className="min-h-12 w-full rounded-xl border border-white/10 bg-[#171329] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[#8B5CF6] placeholder:text-[#77718E]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-white">
                  Mobile Number <span className="text-red-400">*</span>
                </label>

                <div className="relative">
                  <Phone
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAA3C1]"
                  />

                  <input
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 13))
                    }
                    required
                    inputMode="numeric"
                    autoComplete="tel"
                    className="min-h-12 w-full rounded-xl border border-white/10 bg-[#171329] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition focus:border-[#8B5CF6] placeholder:text-[#77718E]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-white">
                  Email Address
                  <span className="ml-2 font-normal text-[#AAA3C1]">
                    (Optional)
                  </span>
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAA3C1]"
                  />

                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={120}
                    autoComplete="email"
                    className="min-h-12 w-full rounded-xl border border-white/10 bg-[#171329] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition focus:border-[#8B5CF6] placeholder:text-[#77718E]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Preference */}
          <div className="rounded-2xl border border-white/10 bg-[#211B3B] p-4 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8B5CF6]/15 text-[#B99AFF]">
                <CreditCard size={20} />
              </div>

              <div>
                <h2 className="font-bold text-white">Payment Preference</h2>

                <p className="text-xs text-[#AAA3C1]">
                  Select your preferred payment method
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  aria-pressed={paymentMethod === method.id}
                  className={`min-h-[76px] rounded-xl border-2 px-2 py-3 text-xs font-bold transition sm:text-sm ${
                    paymentMethod === method.id
                      ? `${method.color} bg-[#171329] text-white`
                      : "border-white/10 bg-[#171329] text-[#AAA3C1] hover:border-white/30"
                  }`}
                >
                  {method.name}

                  {paymentMethod === method.id && (
                    <CheckCircle2
                      size={16}
                      className="mx-auto mt-2 text-[#B99AFF]"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-3.5 sm:p-4">
              <AlertCircle
                size={19}
                className="mt-0.5 shrink-0 text-yellow-400"
              />

              <div>
                <p className="text-sm font-semibold text-yellow-300">
                  Payment Instructions
                </p>

                <p className="mt-1 text-xs leading-6 text-[#AAA3C1]">
                  This is only your preferred payment method. Do not send money
                  now. Our team will confirm product availability and provide
                  payment instructions through WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <aside className="min-w-0 space-y-4 lg:sticky lg:top-24">
          <div className="rounded-2xl border border-white/10 bg-[#211B3B] p-4 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-bold text-white">Order Summary</h2>

              <span className="rounded-full bg-[#8B5CF6]/15 px-3 py-1 text-xs font-bold text-[#B99AFF]">
                {totalQuantity} Items
              </span>
            </div>

            {/* Products */}
            <div className="mt-5 max-h-72 space-y-4 overflow-y-auto pr-1">
              {validatedItems.map((item) => (
                <div key={item.cartId} className="flex min-w-0 gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#171329]">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#B99AFF]">
                        <Package size={22} />
                      </div>
                    )}

                    <span className="absolute bottom-0 right-0 rounded-tl-md bg-[#8B5CF6] px-1.5 py-0.5 text-[9px] font-bold text-white">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-xs font-bold text-white">
                      {item.name}
                    </p>

                    <p className="mt-1 truncate text-[10px] text-[#B99AFF]">
                      {item.currentVariant?.name ||
                        item.variantName ||
                        "Default"}
                    </p>

                    <p className="mt-1 text-[10px] text-[#AAA3C1]">
                      {formatPrice(item.currentPrice)} × {item.quantity}
                    </p>

                    {item.issue && (
                      <p className="mt-1 text-[10px] font-semibold text-amber-300">
                        Needs attention
                      </p>
                    )}
                  </div>

                  <p className="shrink-0 text-xs font-bold text-white">
                    {formatPrice(item.currentPrice * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="my-5 border-t border-white/10" />

            {/* Price Details */}
            <div className="space-y-3">
              <div className="flex justify-between gap-3 text-sm text-[#AAA3C1]">
                <span>Subtotal</span>

                <span className="font-semibold text-white">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="flex justify-between gap-3 text-sm text-[#AAA3C1]">
                <span>Delivery Fee</span>
                <span className="font-semibold text-[#38BDF8]">Free</span>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-bold text-white">Total Amount</span>

                  <span className="text-xl font-extrabold text-[#B99AFF]">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>
            </div>

            {/* Selected Address */}
            {selectedAddress && (
              <div className="mt-5 rounded-xl border border-white/10 bg-[#171329] p-3">
                <p className="text-xs font-bold text-[#B99AFF]">
                  Selected Address
                </p>

                <p className="mt-2 text-sm font-semibold text-white">
                  {selectedAddress.fullName}
                </p>

                <p className="mt-1 text-xs leading-5 text-[#AAA3C1]">
                  {selectedAddress.address}, {selectedAddress.area},{" "}
                  {selectedAddress.district}
                </p>
              </div>
            )}

            {/* WhatsApp Button */}
            <button
              type="submit"
              disabled={isOpeningWhatsApp || hasUnavailableItems}
              className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-950/20 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:opacity-60"
            >
              <MessageCircle size={19} />

              {isOpeningWhatsApp
                ? "Opening WhatsApp..."
                : hasUnavailableItems
                  ? "Review Cart Items First"
                  : "Continue to WhatsApp"}
            </button>

            <p className="mt-3 text-center text-[10px] leading-5 text-[#AAA3C1]">
              Your order details will be prepared in WhatsApp. The store will
              confirm your order manually.
            </p>

            <div className="mt-5 flex items-center justify-center gap-2 text-center text-[11px] text-[#AAA3C1]">
              <ShieldCheck size={15} className="text-[#38BDF8]" />
              Manual order confirmation
            </div>
          </div>

          {/* Delivery Information */}
          <div className="rounded-xl border border-white/10 bg-[#211B3B] p-4">
            <div className="flex items-start gap-3">
              <Package size={18} className="mt-0.5 shrink-0 text-[#38BDF8]" />

              <div>
                <p className="text-xs font-bold text-white">
                  Digital Product Delivery
                </p>

                <p className="mt-1 text-xs leading-5 text-[#AAA3C1]">
                  After order confirmation, our team will arrange delivery
                  through WhatsApp, Email or both.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </form>
    </section>
  );
}

export default Checkout;
