import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  MapPin,
  Plus,
  Home,
  BriefcaseBusiness,
  MapPinned,
  Pencil,
  Trash2,
  Star,
  X,
  UserRound,
  Phone,
  CheckCircle2,
} from "lucide-react";

const STORAGE_KEY = "nexora-addresses";

const emptyForm = {
  fullName: "",
  phone: "",
  district: "",
  area: "",
  address: "",
  label: "Home",
};

const Addresses = () => {
  const [addresses, setAddresses] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  const [formData, setFormData] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [defaultId, setDefaultId] = useState(() => {
    try {
      return localStorage.getItem("nexora-default-address") || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    if (defaultId) {
      localStorage.setItem("nexora-default-address", defaultId);
    } else {
      localStorage.removeItem("nexora-default-address");
    }
  }, [defaultId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openAddForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (item) => {
    setFormData({
      fullName: item.fullName,
      phone: item.phone,
      district: item.district,
      area: item.area,
      address: item.address,
      label: item.label,
    });

    setEditingId(item.id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const phone = formData.phone.replace(/[\s-]/g, "");

    if (!/^(\+?88)?01[3-9]\d{8}$/.test(phone)) {
      toast.error("Please enter a valid Bangladesh phone number.");
      return;
    }

    const cleanedData = {
      ...formData,
      fullName: formData.fullName.trim(),
      phone,
      district: formData.district.trim(),
      area: formData.area.trim(),
      address: formData.address.trim(),
    };

    if (editingId) {
      setAddresses((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...cleanedData } : item,
        ),
      );

      toast.success("Address updated successfully!");
    } else {
      const newAddress = {
        id: Date.now().toString(),
        ...cleanedData,
      };

      setAddresses((prev) => [...prev, newAddress]);

      if (addresses.length === 0) {
        setDefaultId(newAddress.id);
      }

      toast.success("New address added successfully!");
    }

    closeForm();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?",
    );

    if (!confirmed) return;

    const updated = addresses.filter((item) => item.id !== id);
    setAddresses(updated);

    if (defaultId === id) {
      setDefaultId(updated[0]?.id || null);
    }

    toast.success("Address deleted successfully!");
  };

  const handleDefault = (id) => {
    setDefaultId(id);
    toast.success("Default address updated!");
  };

  const getIcon = (label) => {
    if (label === "Work") return BriefcaseBusiness;
    return Home;
  };

  return (
    <section className="min-h-[75vh] px-4 py-10 sm:py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-white">
              My <span className="gradient-text">Addresses</span>
            </h1>
            <p className="mt-2 text-sm text-[#AAA3C1]">
              Manage your delivery addresses.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddForm}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#2563EB] px-5 py-3 font-semibold text-white transition hover:opacity-90"
          >
            <Plus size={19} />
            Add New Address
          </button>
        </div>

        {/* Address Form */}
        {showForm && (
          <div className="mb-8 rounded-2xl border border-[#8B5CF6]/30 bg-[#211B3B] p-5 shadow-xl sm:p-7">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {editingId ? "Edit Address" : "Add New Address"}
              </h2>

              <button
                type="button"
                onClick={closeForm}
                aria-label="Close form"
                className="rounded-lg p-2 text-[#AAA3C1] hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Address Label */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Address Type
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {["Home", "Work"].map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, label }))
                      }
                      className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition ${
                        formData.label === label
                          ? "border-[#8B5CF6] bg-[#8B5CF6]/15 text-[#B99AFF]"
                          : "border-white/10 bg-[#11101C] text-[#AAA3C1] hover:border-white/30"
                      }`}
                    >
                      {label === "Home" ? (
                        <Home size={17} />
                      ) : (
                        <BriefcaseBusiness size={17} />
                      )}
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Full Name
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#11101C] px-4">
                  <UserRound size={18} className="text-[#AAA3C1]" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    maxLength={100}
                    className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-[#77718D]"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Phone Number
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#11101C] px-4">
                  <Phone size={18} className="text-[#AAA3C1]" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                    required
                    maxLength={15}
                    className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-[#77718D]"
                  />
                </div>
              </div>

              {/* District and Area */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    District
                  </label>

                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="e.g. Chattogram"
                    required
                    maxLength={80}
                    className="w-full rounded-xl border border-white/10 bg-[#11101C] px-4 py-3.5 text-sm text-white outline-none placeholder:text-[#77718D] focus:border-[#8B5CF6]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Area / Upazila
                  </label>

                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="e.g. Agrabad"
                    required
                    maxLength={100}
                    className="w-full rounded-xl border border-white/10 bg-[#11101C] px-4 py-3.5 text-sm text-white outline-none placeholder:text-[#77718D] focus:border-[#8B5CF6]"
                  />
                </div>
              </div>

              {/* Full Address */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Full Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House number, road, area and other details..."
                  rows={3}
                  required
                  maxLength={500}
                  className="w-full resize-y rounded-xl border border-white/10 bg-[#11101C] px-4 py-3.5 text-sm text-white outline-none placeholder:text-[#77718D] focus:border-[#8B5CF6]"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-[#AAA3C1] transition hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#2563EB] px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
                >
                  {editingId ? "Update Address" : "Save Address"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Address List */}
        {addresses.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-white">Saved Addresses</h2>
              <span className="text-xs text-[#AAA3C1]">
                {addresses.length} address(es)
              </span>
            </div>

            {addresses.map((item) => {
              const Icon = getIcon(item.label);
              const isDefault = defaultId === item.id;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border bg-[#211B3B] p-5 transition sm:p-6 ${
                    isDefault ? "border-[#8B5CF6]/60" : "border-white/10"
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#8B5CF6]/15 text-[#B99AFF]">
                      <Icon size={23} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-white">{item.label}</h3>

                        {isDefault && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-1 text-[11px] font-semibold text-green-400">
                            <CheckCircle2 size={12} />
                            Default
                          </span>
                        )}
                      </div>

                      <p className="mt-3 text-sm font-semibold text-white">
                        {item.fullName}
                      </p>

                      <p className="mt-1 text-sm text-[#AAA3C1]">
                        {item.phone}
                      </p>

                      <p className="mt-2 flex items-start gap-2 text-sm leading-6 text-[#AAA3C1]">
                        <MapPinned size={16} className="mt-1 shrink-0" />
                        {item.address}, {item.area}, {item.district}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-3">
                        {!isDefault && (
                          <button
                            type="button"
                            onClick={() => handleDefault(item.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B99AFF] hover:text-white"
                          >
                            <Star size={15} />
                            Set as Default
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => openEditForm(item)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8] hover:text-white"
                        >
                          <Pencil size={15} />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          !showForm && (
            <div className="rounded-2xl border border-dashed border-white/15 bg-[#211B3B]/60 px-5 py-12 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#8B5CF6]/10 text-[#B99AFF]">
                <MapPin size={30} />
              </div>

              <h2 className="text-lg font-bold text-white">
                No Saved Addresses
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#AAA3C1]">
                You haven't added any delivery addresses yet. Add an address to
                make your checkout experience easier.
              </p>

              <button
                type="button"
                onClick={openAddForm}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#2563EB] px-6 py-3 font-semibold text-white transition hover:opacity-90"
              >
                <Plus size={18} />
                Add Your First Address
              </button>
            </div>
          )
        )}

        <p className="mt-7 text-center text-xs text-[#77718D]">
          Your Digital World, One Marketplace.
        </p>
      </div>
    </section>
  );
};

export default Addresses;
