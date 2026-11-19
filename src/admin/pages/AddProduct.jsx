import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Trash2,
  ArrowLeft,
  Save,
  Image as ImageIcon,
} from "lucide-react";
import toast from "react-hot-toast";

import useProductStore from "../../store/useProductStore";
import useCategoryStore from "../../store/useCategoryStore";

const initialVariant = {
  name: "",
  price: "",
  stock: "",
  sku: "",
};

function AddProduct() {
  const navigate = useNavigate();

  const addProduct = useProductStore((state) => state.addProduct);
  const categories = useCategoryStore((state) => state.categories);

  const activeCategories = Array.isArray(categories)
    ? categories.filter((category) => category.status === "Active")
    : [];

  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "",
    brand: "",
    image: "",
    description: "",
    price: "",
    oldPrice: "",
    badge: "",
    status: "Active",
    deliveryType: "Manual",
    variants: [{ ...initialVariant }],
  });

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-[#171326] px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500";

  const labelClass = "text-sm font-medium text-[#AAA3C1]";

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Variant Change
  const handleVariantChange = (index, field, value) => {
    setForm((prev) => ({
      ...prev,
      variants: prev.variants.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant,
      ),
    }));
  };

  // Add Variant
  const addVariant = () => {
    setForm((prev) => ({
      ...prev,
      variants: [...prev.variants, { ...initialVariant }],
    }));
  };

  // Remove Variant
  const removeVariant = (index) => {
    setForm((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  // Submit Product
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSaving) return;

    if (!form.name.trim() || !form.category || form.price === "") {
      toast.error("Please fill in Product Name, Category and Price");
      return;
    }

    if (Number(form.price) < 0) {
      toast.error("Price cannot be negative");
      return;
    }

    if (form.oldPrice !== "" && Number(form.oldPrice) < 0) {
      toast.error("Old Price cannot be negative");
      return;
    }

    // Verify selected category is still Active
    const selectedCategory = activeCategories.find(
      (category) => category.name === form.category,
    );

    if (!selectedCategory) {
      toast.error("Please select an active category");
      return;
    }

    // Prepare Variants
    const validVariants = form.variants
      .filter((variant) => variant.name.trim() !== "" && variant.price !== "")
      .map((variant) => ({
        ...variant,
        name: variant.name.trim(),
        price: Number(variant.price),
        stock: Number(variant.stock || 0),
        sku: variant.sku.trim(),
      }));

    // Generate Slug
    const slug = form.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const newProduct = {
      ...form,
      name: form.name.trim(),
      brand: form.brand.trim(),
      image: form.image.trim(),
      description: form.description.trim(),
      slug,
      price: Number(form.price),
      oldPrice: form.oldPrice !== "" ? Number(form.oldPrice) : null,
      variants: validVariants,
      path: `/category/${selectedCategory.slug}`,
      category: selectedCategory.name,
      status: form.status,
      deliveryType: form.deliveryType,
    };

    try {
      setIsSaving(true);

      // Store automatically generates Product ID
      addProduct(newProduct);

      toast.success("Product added successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Add Product Error:", error);
      toast.error("Failed to add product");
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="mb-3 flex items-center gap-2 text-sm text-[#AAA3C1] hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Products
          </button>

          <h1 className="text-2xl font-bold">Add New Product</h1>

          <p className="mt-1 text-sm text-[#AAA3C1]">
            Add a new product to your AI-SaleBD marketplace.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <section className="rounded-2xl border border-white/10 bg-[#211B3B] p-5 sm:p-6">
          <h2 className="mb-5 text-lg font-semibold">Basic Information</h2>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Product Name */}
            <label className={labelClass}>
              Product Name *
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. ChatGPT Plus"
                className={inputClass}
                required
              />
            </label>

            {/* Category */}
            <label className={labelClass}>
              Category *
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">Select Category</option>

                {activeCategories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              {activeCategories.length === 0 && (
                <p className="mt-2 text-xs text-red-400">
                  No active categories found. Please create a category first.
                </p>
              )}
            </label>

            {/* Brand */}
            <label className={labelClass}>
              Brand
              <input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                placeholder="e.g. OpenAI"
                className={inputClass}
              />
            </label>

            {/* Product Image */}
            <label className={labelClass}>
              Product Image URL
              <input
                name="image"
                type="text"
                value={form.image}
                onChange={handleChange}
                placeholder="/images/products/chatgpt-plus.png"
                className={inputClass}
              />
              <span className="mt-2 block text-xs text-[#817995]">
                Enter a local image path or a complete image URL.
              </span>
            </label>
          </div>

          {/* Description */}
          <label className={`${labelClass} mt-5 block`}>
            Product Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Write product details..."
              className={inputClass}
            />
          </label>

          {/* Image Preview */}
          {form.image.trim() ? (
            <div className="mt-5">
              <p className={labelClass}>Image Preview</p>

              <div className="mt-3 flex flex-wrap items-center gap-4 rounded-xl border border-white/10 bg-[#171326] p-3">
                <img
                  key={form.image}
                  src={form.image}
                  alt={form.name || "Product preview"}
                  className="h-28 w-28 rounded-xl border border-white/10 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  onLoad={(e) => {
                    e.currentTarget.style.display = "block";
                  }}
                />

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">
                    {form.name || "Product Image"}
                  </p>

                  <p className="mt-1 break-all text-xs text-[#AAA3C1]">
                    {form.image}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 flex items-center gap-2 text-sm text-[#AAA3C1]">
              <ImageIcon size={18} />
              No product image selected.
            </div>
          )}
        </section>

        {/* Pricing */}
        <section className="rounded-2xl border border-white/10 bg-[#211B3B] p-5 sm:p-6">
          <h2 className="mb-5 text-lg font-semibold">Pricing</h2>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Regular Price (৳) *
              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                placeholder="500"
                className={inputClass}
                required
              />
            </label>

            <label className={labelClass}>
              Old Price (৳)
              <input
                name="oldPrice"
                type="number"
                min="0"
                step="0.01"
                value={form.oldPrice}
                onChange={handleChange}
                placeholder="600"
                className={inputClass}
              />
            </label>
          </div>

          {/* Product Badge */}
          <label className={`${labelClass} mt-5 block`}>
            Product Badge
            <select
              name="badge"
              value={form.badge}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">No Badge</option>
              <option value="Popular">Popular</option>
              <option value="Featured">Featured</option>
              <option value="New">New</option>
              <option value="Special">Special</option>
            </select>
          </label>
        </section>

        {/* Variants */}
        <section className="rounded-2xl border border-white/10 bg-[#211B3B] p-5 sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Packages / Variants</h2>

              <p className="mt-1 text-xs text-[#AAA3C1]">
                Add different packages with independent prices and stock.
              </p>
            </div>

            <button
              type="button"
              onClick={addVariant}
              className="flex items-center gap-2 rounded-lg bg-purple-600/20 px-3 py-2 text-sm text-[#B99AFF] hover:bg-purple-600/30"
            >
              <Plus size={17} />
              Add Variant
            </button>
          </div>

          <div className="space-y-4">
            {form.variants.map((variant, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/10 bg-[#171326] p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold">Variant {index + 1}</p>

                  {form.variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="rounded-lg p-2 text-red-400 hover:bg-red-500/10"
                      aria-label={`Remove variant ${index + 1}`}
                    >
                      <Trash2 size={17} />
                    </button>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <label className={labelClass}>
                    Package Name
                    <input
                      value={variant.name}
                      onChange={(e) =>
                        handleVariantChange(index, "name", e.target.value)
                      }
                      placeholder="1 Month"
                      className={inputClass}
                    />
                  </label>

                  <label className={labelClass}>
                    Price (৳)
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={variant.price}
                      onChange={(e) =>
                        handleVariantChange(index, "price", e.target.value)
                      }
                      placeholder="350"
                      className={inputClass}
                    />
                  </label>

                  <label className={labelClass}>
                    Stock
                    <input
                      type="number"
                      min="0"
                      value={variant.stock}
                      onChange={(e) =>
                        handleVariantChange(index, "stock", e.target.value)
                      }
                      placeholder="10"
                      className={inputClass}
                    />
                  </label>

                  <label className={labelClass}>
                    SKU
                    <input
                      value={variant.sku}
                      onChange={(e) =>
                        handleVariantChange(index, "sku", e.target.value)
                      }
                      placeholder="AIS-001"
                      className={inputClass}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Delivery & Status */}
        <section className="rounded-2xl border border-white/10 bg-[#211B3B] p-5 sm:p-6">
          <h2 className="mb-5 text-lg font-semibold">
            Delivery & Product Status
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Delivery Type
              <select
                name="deliveryType"
                value={form.deliveryType}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Manual">Manual Delivery</option>
                <option value="Automatic">Automatic Delivery</option>
                <option value="Custom">Custom Delivery</option>
              </select>
            </label>

            <label className={labelClass}>
              Product Status
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>
          </div>
        </section>

        {/* Submit */}
        <div className="flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-[#AAA3C1] hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSaving || activeCategories.length === 0}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 text-sm font-semibold hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={18} />
            {isSaving ? "Saving..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
