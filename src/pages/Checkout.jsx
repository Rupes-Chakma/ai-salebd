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
  Copy,
} from "lucide-react";
import toast from "react-hot-toast";

import useCartStore from "../store/cartStore";
import useProductStore from "../store/useProductStore";
import paymentMethods from "../config/paymentMethods";
import { useTheme } from "../context/ThemeContext";

const WHATSAPP_NUMBER = "8801648582639";

const ADDRESS_KEY = "nexora-addresses";
const DEFAULT_ADDRESS_KEY = "nexora-default-address";

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
    phone = `0${phone.slice(3)}`;
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
  const { isDark } = useTheme();

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
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [senderNumber, setSenderNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isOpeningWhatsApp, setIsOpeningWhatsApp] = useState(false);

  const selectedAddress = addresses.find(
    (item) => item.id === selectedAddressId,
  );

  const selectedPaymentMethod = paymentMethods.find(
    (method) => method.id === paymentMethod,
  );

  const surfaceClass = isDark
    ? "border-white/10 bg-[#141A15]"
    : "border-gray-200 bg-white";

  const innerSurfaceClass = isDark
    ? "border-white/10 bg-[#101510]"
    : "border-gray-200 bg-gray-50";

  const inputClass = isDark
    ? "border-white/10 bg-[#101510] text-white placeholder:text-gray-500 focus:border-green-500"
    : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-green-600";

  const headingClass = isDark ? "text-white" : "text-gray-900";
  const mutedClass = isDark ? "text-gray-400" : "text-gray-500";

  const iconBoxClass = isDark
    ? "bg-green-500/10 text-green-400"
    : "bg-green-50 text-green-700";

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

  const handleSelectAddress = (item) => {
    setSelectedAddressId(item.id);
    setName(item.fullName);
    setPhone(normalizePhone(item.phone));
    toast.success("Delivery address selected!");
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const handleCopyPaymentNumber = async () => {
    if (!selectedPaymentMethod?.number) {
      toast.error("Payment number is not available.");
      return;
    }

    try {
      await navigator.clipboard.writeText(selectedPaymentMethod.number);
      toast.success("Payment number copied!");
    } catch {
      toast.error("Could not copy number. Please copy it manually.");
    }
  };

  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();

    if (isOpeningWhatsApp) return;

    if (safeCartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

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

      if (!Number.isFinite(price) || price < 0) {
        return true;
      }

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

      return hasStockLimit && stock <= 0;
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

    if (!selectedPaymentMethod?.number) {
      toast.error("Please select a valid payment method.");
      return;
    }

    if (!isValidPhone(senderNumber)) {
      toast.error("Enter a valid payment sender number.");
      return;
    }

    if (!transactionId.trim()) {
      toast.error("Please enter your payment Transaction ID.");
      return;
    }

    const orderId = `ASBD-${Date.now()}`;

    const orderLines = validatedItems.map((item, index) => {
      const itemTotal = item.currentPrice * item.quantity;

      return [
        `${index + 1}. ${item.currentProduct?.name || item.name}`,
        `   Category: ${getCategoryName(
          item.currentProduct?.category || item.category,
        )}`,
        `   Package: ${
          item.currentVariant?.name || item.variantName || "Default"
        }`,
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
      "----- ORDER INFORMATION -----",
      `Order ID: ${orderId}`,
      "Order Status: Pending Verification",
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
      "",
      "----- PAYMENT INFORMATION -----",
      `Payment Method: ${selectedPaymentMethod.name}`,
      `Payment Account: ${selectedPaymentMethod.number}`,
      `Account Type: ${selectedPaymentMethod.type || "Personal"}`,
      `Sender Number: ${normalizePhone(senderNumber)}`,
      `Transaction ID: ${transactionId.trim()}`,
      "Payment Status: Pending Manual Verification",
      "",
      "Please verify the payment and confirm my order.",
      "",
      "Thank you for choosing AI-SaleBD!",
    ].join("\n");

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;

    setIsOpeningWhatsApp(true);

    const whatsappWindow = window.open(whatsappURL, "_blank");

    if (!whatsappWindow) {
      setIsOpeningWhatsApp(false);
      toast.error("Please allow pop-ups and try again.");
      return;
    }

    toast.success("Order details are ready in WhatsApp.");

    setTimeout(() => {
      setIsOpeningWhatsApp(false);
    }, 1500);
  };

  if (safeCartItems.length === 0) {
    return (
      <section className="container-custom flex min-h-[60vh] flex-col items-center justify-center px-3 py-12 text-center">
        <div
          className={`flex h-20 w-20 items-center justify-center rounded-3xl border ${surfaceClass}`}
        >
          <ShoppingBag size={38} className="text-green-500" />
        </div>

        <h2 className={`mt-5 text-2xl font-bold ${headingClass}`}>
          Your Cart is Empty
        </h2>

        <p className={`mt-2 max-w-sm text-sm leading-6 ${mutedClass}`}>
          Add some products before proceeding to checkout.
        </p>

        <Link
          to="/shop"
          className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-700"
        >
          <ShoppingBag size={17} />
          Explore Products
        </Link>
      </section>
    );
  }

  return (
    <section className="container-custom max-w-6xl px-3 py-6 pb-12 sm:px-0 sm:py-10">
      <Link
        to="/cart"
        className={`mb-5 inline-flex min-h-10 items-center gap-2 text-sm transition ${
          isDark
            ? "text-gray-400 hover:text-green-400"
            : "text-gray-500 hover:text-green-700"
        }`}
      >
        <ArrowLeft size={17} />
        Back to Cart
      </Link>

      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-green-500 sm:text-xs">
          <ShoppingBag size={15} />
          AI-SaleBD Checkout
        </div>

        <h1
          className={`mt-3 text-2xl font-extrabold sm:text-3xl ${headingClass}`}
        >
          Complete Your Order
        </h1>

        <p className={`mt-2 text-xs leading-6 sm:text-sm ${mutedClass}`}>
          Provide your details and payment information to place your order.
        </p>
      </div>

      {hasUnavailableItems && (
        <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
          <AlertCircle size={20} className="mt-0.5 shrink-0 text-red-400" />

          <div className="min-w-0">
            <p className="text-sm font-semibold text-red-400">
              Some products need attention
            </p>

            <p className={`mt-1 text-xs leading-6 ${mutedClass}`}>
              {unavailableItems.length} item(s) are unavailable, have changed
              packages, or have insufficient stock. Please return to your cart
              and review these products.
            </p>

            <Link
              to="/cart"
              className="mt-2 inline-flex min-h-9 items-center text-xs font-bold text-red-400 underline"
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
          <div className={`rounded-2xl border p-4 sm:p-6 ${surfaceClass}`}>
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBoxClass}`}
                >
                  <MapPin size={20} />
                </div>

                <div>
                  <h2 className={`font-bold ${headingClass}`}>
                    Delivery Address
                  </h2>
                  <p className={`text-xs ${mutedClass}`}>
                    Optional for digital products
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAddressForm((prev) => !prev)}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2.5 text-xs font-semibold text-green-500 transition hover:bg-green-500/20"
              >
                <Plus size={16} />
                Add New Address
              </button>
            </div>

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
                          ? "border-green-500 bg-green-500/10"
                          : `${innerSurfaceClass} hover:border-green-500/40`
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconBoxClass}`}
                        >
                          <AddressIcon size={19} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className={`text-sm font-bold ${headingClass}`}>
                              {item.label}
                            </h3>

                            {isDefault && (
                              <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-semibold text-green-500">
                                Default
                              </span>
                            )}

                            {isSelected && (
                              <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-semibold text-green-500">
                                Selected
                              </span>
                            )}
                          </div>

                          <p
                            className={`mt-2 text-sm font-semibold ${headingClass}`}
                          >
                            {item.fullName}
                          </p>

                          <p className={`mt-1 text-xs ${mutedClass}`}>
                            {item.phone}
                          </p>

                          <p
                            className={`mt-2 flex items-start gap-2 text-xs leading-5 ${mutedClass}`}
                          >
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
                              className="text-green-500"
                            />
                          ) : (
                            <div
                              className={`h-5 w-5 rounded-full border ${isDark ? "border-white/30" : "border-gray-300"}`}
                            />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div
                className={`mt-5 rounded-xl border border-dashed px-4 py-6 text-center ${innerSurfaceClass}`}
              >
                <MapPin size={27} className="mx-auto text-green-500" />

                <p className={`mt-3 text-sm font-semibold ${headingClass}`}>
                  No Saved Address
                </p>

                <p className={`mt-1 text-xs ${mutedClass}`}>
                  You can add an address if needed.
                </p>
              </div>
            )}

            {showAddressForm && (
              <div
                className={`mt-5 space-y-4 rounded-xl border border-green-500/30 p-4 sm:p-5 ${innerSurfaceClass}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className={`font-bold ${headingClass}`}>
                    Add New Address
                  </h3>

                  <button
                    type="button"
                    onClick={() => {
                      setShowAddressForm(false);
                      setAddressForm(emptyAddress);
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-red-400 hover:bg-red-500/10"
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
                          ? "border-green-500 bg-green-500/10 text-green-500"
                          : `${mutedClass} ${isDark ? "border-white/10" : "border-gray-200"}`
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
                  className={`w-full rounded-lg border px-4 py-3.5 text-sm outline-none ${inputClass}`}
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
                  className={`w-full rounded-lg border px-4 py-3.5 text-sm outline-none ${inputClass}`}
                />

                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    name="district"
                    value={addressForm.district}
                    onChange={handleAddressChange}
                    placeholder="District"
                    maxLength={80}
                    className={`w-full rounded-lg border px-4 py-3.5 text-sm outline-none ${inputClass}`}
                  />

                  <input
                    type="text"
                    name="area"
                    value={addressForm.area}
                    onChange={handleAddressChange}
                    placeholder="Area / Upazila"
                    maxLength={100}
                    className={`w-full rounded-lg border px-4 py-3.5 text-sm outline-none ${inputClass}`}
                  />
                </div>

                <textarea
                  name="address"
                  value={addressForm.address}
                  onChange={handleAddressChange}
                  placeholder="House number, road, area and other details"
                  rows={3}
                  maxLength={500}
                  className={`w-full resize-y rounded-lg border px-4 py-3.5 text-sm outline-none ${inputClass}`}
                />

                <button
                  type="button"
                  onClick={handleSaveAddress}
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-green-700"
                >
                  <CheckCircle2 size={17} />
                  Save & Select Address
                </button>
              </div>
            )}

            <Link
              to="/addresses"
              className="mt-4 inline-flex min-h-9 items-center gap-2 text-xs font-semibold text-green-500 hover:text-green-400"
            >
              <Pencil size={14} />
              Manage Saved Addresses
            </Link>
          </div>

          {/* Customer Information */}
          <div className={`rounded-2xl border p-4 sm:p-6 ${surfaceClass}`}>
            <div className="mb-5 flex items-center gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBoxClass}`}
              >
                <UserRound size={20} />
              </div>

              <div>
                <h2 className={`font-bold ${headingClass}`}>
                  Customer Information
                </h2>
                <p className={`text-xs ${mutedClass}`}>
                  Confirm your contact details
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  className={`mb-2 block text-xs font-semibold ${headingClass}`}
                >
                  Full Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={80}
                  autoComplete="name"
                  className={`min-h-12 w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition ${inputClass}`}
                />
              </div>

              <div>
                <label
                  className={`mb-2 block text-xs font-semibold ${headingClass}`}
                >
                  Mobile Number <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Phone
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
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
                    className={`min-h-12 w-full rounded-xl border py-3.5 pl-11 pr-4 text-sm outline-none transition ${inputClass}`}
                  />
                </div>
              </div>

              <div>
                <label
                  className={`mb-2 block text-xs font-semibold ${headingClass}`}
                >
                  Email Address
                  <span className={`ml-2 font-normal ${mutedClass}`}>
                    (Optional)
                  </span>
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={120}
                    autoComplete="email"
                    className={`min-h-12 w-full rounded-xl border py-3.5 pl-11 pr-4 text-sm outline-none transition ${inputClass}`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Banking Payment */}
          <div className={`rounded-2xl border p-4 sm:p-6 ${surfaceClass}`}>
            <div className="mb-5 flex items-center gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBoxClass}`}
              >
                <CreditCard size={20} />
              </div>

              <div>
                <h2 className={`font-bold ${headingClass}`}>
                  Mobile Banking Payment
                </h2>
                <p className={`text-xs ${mutedClass}`}>
                  Choose your payment method
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
                      ? "border-green-500 bg-green-500/10 text-green-500"
                      : `${innerSurfaceClass} ${mutedClass} hover:border-green-500/40`
                  }`}
                >
                  {method.name}

                  {paymentMethod === method.id && (
                    <CheckCircle2
                      size={16}
                      className="mx-auto mt-2 text-green-500"
                    />
                  )}
                </button>
              ))}
            </div>

            {selectedPaymentMethod && (
              <div className="mt-5 rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                <p className={`text-xs font-semibold ${mutedClass}`}>
                  Send Money to this Personal Account
                </p>

                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className={`text-lg font-extrabold ${headingClass}`}>
                      {selectedPaymentMethod.number}
                    </p>

                    <p className="mt-1 text-xs text-green-500">
                      {selectedPaymentMethod.name}{" "}
                      {selectedPaymentMethod.type || "Personal"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyPaymentNumber}
                    className="inline-flex items-center gap-2 rounded-lg border border-green-500/30 px-3 py-2 text-xs font-semibold text-green-500 transition hover:bg-green-500/10"
                  >
                    <Copy size={14} />
                    Copy Number
                  </button>
                </div>

                <div className={`mt-4 rounded-lg p-3 ${innerSurfaceClass}`}>
                  <p className={`text-xs font-semibold ${headingClass}`}>
                    Payment Instructions
                  </p>

                  <ol
                    className={`mt-2 list-inside list-decimal space-y-1 text-xs leading-5 ${mutedClass}`}
                  >
                    <li>Open your {selectedPaymentMethod.name} app.</li>
                    <li>Choose Send Money.</li>
                    <li>Send the total amount shown in your order summary.</li>
                    <li>Enter your Sender Number and Transaction ID below.</li>
                  </ol>
                </div>
              </div>
            )}

            <div className="mt-5 space-y-4">
              <div>
                <label
                  className={`mb-2 block text-xs font-semibold ${headingClass}`}
                >
                  Sender Mobile Number <span className="text-red-500">*</span>
                </label>

                <input
                  type="tel"
                  value={senderNumber}
                  onChange={(e) =>
                    setSenderNumber(
                      e.target.value.replace(/\D/g, "").slice(0, 13),
                    )
                  }
                  placeholder="01XXXXXXXXX"
                  maxLength={13}
                  inputMode="numeric"
                  className={`min-h-12 w-full rounded-xl border px-4 py-3 text-sm outline-none ${inputClass}`}
                />
              </div>

              <div>
                <label
                  className={`mb-2 block text-xs font-semibold ${headingClass}`}
                >
                  Transaction ID (TrxID) <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) =>
                    setTransactionId(e.target.value.trimStart().slice(0, 100))
                  }
                  placeholder="Enter your Transaction ID"
                  maxLength={100}
                  className={`min-h-12 w-full rounded-xl border px-4 py-3 text-sm outline-none ${inputClass}`}
                />
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <ShieldCheck
                size={20}
                className="mt-0.5 shrink-0 text-amber-500"
              />

              <div>
                <p className="text-sm font-semibold text-amber-500">
                  Payment Verification Required
                </p>

                <p className={`mt-2 text-xs leading-6 ${mutedClass}`}>
                  Your payment will be verified manually by our team. Your order
                  will remain pending until payment is confirmed. Never share
                  your PIN or OTP.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <aside className="min-w-0 space-y-4 lg:sticky lg:top-24">
          <div className={`rounded-2xl border p-4 sm:p-6 ${surfaceClass}`}>
            <div className="flex items-center justify-between gap-3">
              <h2 className={`font-bold ${headingClass}`}>Order Summary</h2>

              <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold text-green-500">
                {totalQuantity} Items
              </span>
            </div>

            <div className="mt-5 max-h-72 space-y-4 overflow-y-auto pr-1">
              {validatedItems.map((item) => (
                <div key={item.cartId} className="flex min-w-0 gap-3">
                  <div
                    className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg ${innerSurfaceClass}`}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.currentProduct?.name || item.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-green-500">
                        <Package size={22} />
                      </div>
                    )}

                    <span className="absolute bottom-0 right-0 rounded-tl-md bg-green-600 px-1.5 py-0.5 text-[9px] font-bold text-white">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`line-clamp-2 text-xs font-bold ${headingClass}`}
                    >
                      {item.currentProduct?.name || item.name}
                    </p>

                    <p className="mt-1 truncate text-[10px] text-green-500">
                      {item.currentVariant?.name ||
                        item.variantName ||
                        "Default"}
                    </p>

                    <p className={`mt-1 text-[10px] ${mutedClass}`}>
                      {formatPrice(item.currentPrice)} × {item.quantity}
                    </p>

                    {item.issue && (
                      <p className="mt-1 text-[10px] font-semibold text-red-500">
                        Needs attention
                      </p>
                    )}
                  </div>

                  <p className={`shrink-0 text-xs font-bold ${headingClass}`}>
                    {formatPrice(item.currentPrice * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div
              className={`my-5 border-t ${isDark ? "border-white/10" : "border-gray-200"}`}
            />

            <div className="space-y-3">
              <div
                className={`flex justify-between gap-3 text-sm ${mutedClass}`}
              >
                <span>Subtotal</span>
                <span className={`font-semibold ${headingClass}`}>
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div
                className={`flex justify-between gap-3 text-sm ${mutedClass}`}
              >
                <span>Delivery Fee</span>
                <span className="font-semibold text-green-500">Free</span>
              </div>

              <div
                className={`border-t pt-4 ${isDark ? "border-white/10" : "border-gray-200"}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`font-bold ${headingClass}`}>
                    Total Amount
                  </span>

                  <span className="text-xl font-extrabold text-green-500">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>
            </div>

            {selectedAddress && (
              <div
                className={`mt-5 rounded-xl border p-3 ${innerSurfaceClass}`}
              >
                <p className="text-xs font-bold text-green-500">
                  Selected Address
                </p>

                <p className={`mt-2 text-sm font-semibold ${headingClass}`}>
                  {selectedAddress.fullName}
                </p>

                <p className={`mt-1 text-xs leading-5 ${mutedClass}`}>
                  {selectedAddress.address}, {selectedAddress.area},{" "}
                  {selectedAddress.district}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isOpeningWhatsApp || hasUnavailableItems}
              className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-950/20 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-60"
            >
              <MessageCircle size={19} />

              {isOpeningWhatsApp
                ? "Opening WhatsApp..."
                : hasUnavailableItems
                  ? "Review Cart Items First"
                  : "Continue to WhatsApp"}
            </button>

            <p
              className={`mt-3 text-center text-[10px] leading-5 ${mutedClass}`}
            >
              Your order and payment details will be prepared in WhatsApp.
              Payment will be verified manually by our team.
            </p>

            <div
              className={`mt-5 flex items-center justify-center gap-2 text-center text-[11px] ${mutedClass}`}
            >
              <ShieldCheck size={15} className="text-green-500" />
              Manual payment verification
            </div>
          </div>

          {/* Delivery Information */}
          <div className={`rounded-xl border p-4 ${surfaceClass}`}>
            <div className="flex items-start gap-3">
              <Package size={18} className="mt-0.5 shrink-0 text-green-500" />

              <div>
                <p className={`text-xs font-bold ${headingClass}`}>
                  Digital Product Delivery
                </p>

                <p className={`mt-1 text-xs leading-5 ${mutedClass}`}>
                  After order and payment confirmation, our team will arrange
                  delivery through WhatsApp, Email or both.
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
