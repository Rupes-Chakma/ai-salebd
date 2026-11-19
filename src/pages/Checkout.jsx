import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
} from "lucide-react";
import toast from "react-hot-toast";

import useCartStore from "../store/cartStore";
import useProductStore from "../store/useProductStore";

const paymentMethods = [
  { id: "bKash", name: "bKash", color: "border-pink-500" },
  { id: "Nagad", name: "Nagad", color: "border-orange-500" },
  { id: "Rocket", name: "Rocket", color: "border-purple-500" },
];

const ADDRESS_KEY = "nexora-addresses";
const DEFAULT_ADDRESS_KEY = "nexora-default-address";
const ORDER_KEY = "nexora-orders";

const emptyAddress = {
  fullName: "",
  phone: "",
  district: "",
  area: "",
  address: "",
  label: "Home",
};

const formatPrice = (price) => `৳${Number(price || 0).toLocaleString("en-BD")}`;

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

const Checkout = () => {
  const navigate = useNavigate();

  const cartItems = useCartStore((state) => state.cartItems);
  const getCartTotal = useCartStore((state) => state.getCartTotal);
  const clearCart = useCartStore((state) => state.clearCart);

  const products = useProductStore((state) => state.products);

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

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState(() => {
    const saved = getSavedAddresses();
    const defaultId = localStorage.getItem(DEFAULT_ADDRESS_KEY);
    const selected = saved.find((item) => item.id === defaultId) || saved[0];

    return normalizePhone(selected?.phone || "");
  });

  const [paymentMethod, setPaymentMethod] = useState("bKash");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = getCartTotal();

  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0,
  );

  // Check current product availability from Zustand store.
  const unavailableItems = cartItems.filter((item) => {
    const product = products.find(
      (product) => String(product.id) === String(item.productId),
    );

    return !product || product.status === "Inactive";
  });

  const hasUnavailableItems = unavailableItems.length > 0;

  const selectedAddress = addresses.find(
    (item) => item.id === selectedAddressId,
  );

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // Recheck product availability before creating an order.
    const currentProducts = useProductStore.getState().products;

    const unavailable = cartItems.filter((item) => {
      const product = currentProducts.find(
        (product) => String(product.id) === String(item.productId),
      );

      return !product || product.status === "Inactive";
    });

    if (unavailable.length > 0) {
      toast.error("Some products are unavailable. Please update your cart.");
      return;
    }

    if (!name.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!isValidPhone(phone)) {
      toast.error("Enter a valid customer mobile number.");
      return;
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderId = `AIS-${Date.now().toString().slice(-8)}`;

      const orderDetails = {
        orderId,
        customerName: name.trim(),
        email: email.trim(),
        phone: normalizePhone(phone),
        deliveryAddress: selectedAddress ? { ...selectedAddress } : null,
        addressId: selectedAddress?.id || null,
        paymentMethod,

        // Payment integration is not configured yet.
        senderNumber: "",
        transactionId: "",

        items: cartItems.map((item) => ({ ...item })),
        total: Number(total),

        status: "Pending Verification",
        paymentStatus: "Not Paid",
        deliveryMethod: "Not Selected",
        deliveryStatus: "Pending",
        createdAt: new Date().toISOString(),
      };

      const existingOrders = JSON.parse(
        localStorage.getItem(ORDER_KEY) || "[]",
      );

      if (!Array.isArray(existingOrders)) {
        throw new Error("Invalid order storage");
      }

      localStorage.setItem(
        ORDER_KEY,
        JSON.stringify([orderDetails, ...existingOrders]),
      );

      clearCart();

      toast.success("Your order has been submitted!");

      navigate("/order-success", {
        state: { order: orderDetails },
      });
    } catch (error) {
      console.error("AI-SaleBD order error:", error);
      toast.error("Could not save your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <section className="container-custom flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#211B3B]">
          <ShoppingBag size={38} className="text-[#8B5CF6]" />
        </div>

        <h2 className="mt-5 text-2xl font-bold text-white">
          Your Cart is Empty
        </h2>

        <p className="mt-2 text-sm text-[#AAA3C1]">
          Add some products before proceeding to checkout.
        </p>

        <Link
          to="/shop"
          className="mt-6 rounded-xl bg-[#8B5CF6] px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
        >
          Explore Products
        </Link>
      </section>
    );
  }

  return (
    <section className="container-custom max-w-6xl py-7 pb-28 sm:py-10">
      <Link
        to="/cart"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[#AAA3C1] transition hover:text-white"
      >
        <ArrowLeft size={17} />
        Back to Cart
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B99AFF]">
          <ShoppingBag size={15} />
          AI-SaleBD Checkout
        </div>

        <h1 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
          Complete Your Order
        </h1>

        <p className="mt-2 text-sm text-[#AAA3C1]">
          Provide your details to submit your digital product order.
        </p>
      </div>

      {hasUnavailableItems && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="mt-0.5 shrink-0 text-red-400" />

            <div>
              <p className="text-sm font-semibold text-red-300">
                Some products are unavailable
              </p>

              <p className="mt-1 text-xs leading-5 text-[#AAA3C1]">
                {unavailableItems.length} item(s) in your cart are inactive or
                no longer available. Remove them before placing your order.
              </p>

              <Link
                to="/cart"
                className="mt-3 inline-block text-xs font-bold text-red-300 underline"
              >
                Return to Cart
              </Link>
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid items-start gap-6 lg:grid-cols-[1fr_370px]"
      >
        <div className="space-y-5">
          {/* Delivery Address */}
          <div className="rounded-2xl border border-white/10 bg-[#211B3B] p-5 sm:p-6">
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8B5CF6]/15 text-[#B99AFF]">
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
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 px-4 py-2.5 text-xs font-semibold text-[#B99AFF] transition hover:bg-[#8B5CF6]/20"
              >
                <Plus size={16} />
                Add New Address
              </button>
            </div>

            {addresses.length > 0 ? (
              <div className="space-y-3">
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
                      className={`w-full rounded-xl border p-4 text-left transition ${
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
                            {item.address}, {item.area}, {item.district}
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
              <div className="rounded-xl border border-dashed border-white/15 bg-[#171329] px-4 py-7 text-center">
                <MapPin size={28} className="mx-auto text-[#B99AFF]" />

                <p className="mt-3 text-sm font-semibold text-white">
                  No Saved Address
                </p>

                <p className="mt-1 text-xs text-[#AAA3C1]">
                  You can add an address if needed.
                </p>

                <Link
                  to="/addresses"
                  className="mt-4 inline-block text-xs font-semibold text-[#38BDF8] hover:text-white"
                >
                  Manage My Addresses
                </Link>
              </div>
            )}

            {/* Address Form */}
            {showAddressForm && (
              <div className="mt-5 space-y-4 rounded-xl border border-[#8B5CF6]/30 bg-[#171329] p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white">Add New Address</h3>

                  <button
                    type="button"
                    onClick={() => {
                      setShowAddressForm(false);
                      setAddressForm(emptyAddress);
                    }}
                    className="text-xs text-[#AAA3C1] hover:text-white"
                  >
                    Close
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
                      className={`flex items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-semibold ${
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
                  className="w-full rounded-lg border border-white/10 bg-[#211B3B] px-4 py-3 text-sm text-white outline-none focus:border-[#8B5CF6] placeholder:text-[#77718E]"
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
                  className="w-full rounded-lg border border-white/10 bg-[#211B3B] px-4 py-3 text-sm text-white outline-none focus:border-[#8B5CF6] placeholder:text-[#77718E]"
                />

                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    name="district"
                    value={addressForm.district}
                    onChange={handleAddressChange}
                    placeholder="District"
                    maxLength={80}
                    className="w-full rounded-lg border border-white/10 bg-[#211B3B] px-4 py-3 text-sm text-white outline-none focus:border-[#8B5CF6] placeholder:text-[#77718E]"
                  />

                  <input
                    type="text"
                    name="area"
                    value={addressForm.area}
                    onChange={handleAddressChange}
                    placeholder="Area / Upazila"
                    maxLength={100}
                    className="w-full rounded-lg border border-white/10 bg-[#211B3B] px-4 py-3 text-sm text-white outline-none focus:border-[#8B5CF6] placeholder:text-[#77718E]"
                  />
                </div>

                <textarea
                  name="address"
                  value={addressForm.address}
                  onChange={handleAddressChange}
                  placeholder="House number, road, area and other details"
                  rows={3}
                  maxLength={500}
                  className="w-full resize-y rounded-lg border border-white/10 bg-[#211B3B] px-4 py-3 text-sm text-white outline-none focus:border-[#8B5CF6] placeholder:text-[#77718E]"
                />

                <button
                  type="button"
                  onClick={handleSaveAddress}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#2563EB] px-4 py-3 text-sm font-bold text-white transition hover:opacity-90"
                >
                  <CheckCircle2 size={17} />
                  Save & Select Address
                </button>
              </div>
            )}

            <Link
              to="/addresses"
              className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#38BDF8] hover:text-white"
            >
              <Pencil size={14} />
              Manage Saved Addresses
            </Link>
          </div>

          {/* Customer Information */}
          <div className="rounded-2xl border border-white/10 bg-[#211B3B] p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8B5CF6]/15 text-[#B99AFF]">
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
                  className="w-full rounded-xl border border-white/10 bg-[#171329] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[#8B5CF6] placeholder:text-[#77718E]"
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
                    className="w-full rounded-xl border border-white/10 bg-[#171329] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition focus:border-[#8B5CF6] placeholder:text-[#77718E]"
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
                    className="w-full rounded-xl border border-white/10 bg-[#171329] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition focus:border-[#8B5CF6] placeholder:text-[#77718E]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-2xl border border-white/10 bg-[#211B3B] p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8B5CF6]/15 text-[#B99AFF]">
                <CreditCard size={20} />
              </div>

              <div>
                <h2 className="font-bold text-white">Payment Preference</h2>
                <p className="text-xs text-[#AAA3C1]">
                  Select your preferred payment method
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  aria-pressed={paymentMethod === method.id}
                  className={`rounded-xl border-2 px-2 py-4 text-sm font-bold transition ${
                    paymentMethod === method.id
                      ? `${method.color} bg-[#171329] text-white`
                      : "border-white/10 bg-[#171329] text-[#AAA3C1] hover:border-white/30"
                  }`}
                >
                  {method.name}

                  {paymentMethod === method.id && (
                    <CheckCircle2
                      size={15}
                      className="mx-auto mt-2 text-[#B99AFF]"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-5 flex gap-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
              <AlertCircle
                size={19}
                className="mt-0.5 shrink-0 text-yellow-400"
              />

              <div>
                <p className="text-sm font-semibold text-yellow-300">
                  Demo Payment System
                </p>

                <p className="mt-1 text-xs leading-5 text-[#AAA3C1]">
                  Payment integration is not configured yet. Do not send money
                  or enter a Transaction ID. Your preferred payment method will
                  be saved with your order.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <aside className="h-fit space-y-4 lg:sticky lg:top-24">
          <div className="rounded-2xl border border-white/10 bg-[#211B3B] p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-white">Order Summary</h2>

              <span className="rounded-full bg-[#8B5CF6]/15 px-3 py-1 text-xs font-bold text-[#B99AFF]">
                {totalQuantity} Items
              </span>
            </div>

            <div className="mt-5 max-h-64 space-y-4 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.cartId} className="flex gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#171329]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />

                    <span className="absolute bottom-0 right-0 rounded-tl-md bg-[#8B5CF6] px-1.5 py-0.5 text-[9px] font-bold text-white">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-xs font-bold text-white">
                      {item.name}
                    </p>

                    <p className="mt-1 text-[10px] text-[#B99AFF]">
                      {item.variantName}
                    </p>

                    <p className="mt-1 text-xs text-[#AAA3C1]">
                      {formatPrice(item.price)} × {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 text-xs font-bold text-white">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="my-5 border-t border-white/10" />

            <div className="space-y-3">
              <div className="flex justify-between text-sm text-[#AAA3C1]">
                <span>Subtotal</span>
                <span className="font-semibold text-white">
                  {formatPrice(total)}
                </span>
              </div>

              <div className="flex justify-between text-sm text-[#AAA3C1]">
                <span>Delivery Fee</span>
                <span className="font-semibold text-[#38BDF8]">Free</span>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-bold text-white">Total Amount</span>

                  <span className="text-xl font-extrabold text-[#B99AFF]">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>

            {selectedAddress && (
              <div className="mt-5 rounded-xl border border-white/10 bg-[#171329] p-3">
                <p className="text-xs font-bold text-[#B99AFF]">
                  Saved Address
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

            <button
              type="submit"
              disabled={isSubmitting || hasUnavailableItems}
              className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] px-4 py-3.5 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <ShoppingBag size={18} />
              {isSubmitting
                ? "Processing..."
                : hasUnavailableItems
                  ? "Remove Unavailable Products"
                  : "Confirm Order"}
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-[#AAA3C1]">
              <ShieldCheck size={15} className="text-[#38BDF8]" />
              Order saved locally for demo
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#211B3B] p-4">
            <div className="flex items-start gap-3">
              <Package size={18} className="mt-0.5 text-[#38BDF8]" />

              <div>
                <p className="text-xs font-bold text-white">
                  Digital Product Delivery
                </p>

                <p className="mt-1 text-xs leading-5 text-[#AAA3C1]">
                  After order review, the store will choose WhatsApp, Email or
                  both for product delivery.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </form>
    </section>
  );
};

export default Checkout;
