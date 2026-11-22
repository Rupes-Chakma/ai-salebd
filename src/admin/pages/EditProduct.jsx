import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Plus,
  Trash2,
  ArrowLeft,
  Save,
  Image as ImageIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import useProductStore from "../../store/useProductStore";

const initialVariant = {
  name: "",
  price: "",
  stock: "",
  sku: "",
};

const initialForm = {
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
};

const getCategoryName = (category) => {
  if (typeof category === "string") return category;
  return category?.name || category?.title || "";
};

const createSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const products = useProductStore((state) => state.products);
  const updateProduct = useProductStore((state) => state.updateProduct);

  const safeProducts = Array.isArray(products) ? products : [];

  const product = safeProducts.find((item) => String(item.id) === String(id));

  const [form, setForm] = useState(initialForm);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load existing product
  useEffect(() => {
    if (!product) return;

    setForm({
      name: product.name || "",
      category: getCategoryName(product.category),
      brand: product.brand || "",
      image: product.image || "",
      description: product.description || "",
      price: product.price ?? "",
      oldPrice: product.oldPrice ?? "",
      badge: product.badge || "",
      status: product.status || "Active",
      deliveryType: product.deliveryType || "Manual",

      variants:
        Array.isArray(product.variants) && product.variants.length > 0
          ? product.variants.map((variant) => ({
              ...variant,
              name: variant.name || "",
              price: variant.price ?? "",
              stock: variant.stock ?? "",
              sku: variant.sku || "",
            }))
          : [{ ...initialVariant }],
    });

    setIsLoaded(true);
  }, [product]);

  // Handle basic input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle variant changes
  const handleVariantChange = (index, field, value) => {
    setForm((prev) => ({
      ...prev,
      variants: prev.variants.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant,
      ),
    }));
  };

  // Add variant
  const addVariant = () => {
    setForm((prev) => ({
      ...prev,
      variants: [...prev.variants, { ...initialVariant }],
    }));
  };

  // Remove variant
  const removeVariant = (index) => {
    setForm((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  // Save product
  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSaving) return;

    if (!form.name.trim() || !form.category.trim() || form.price === "") {
      toast.error("Please fill in Product Name, Category and Price");
      return;
    }

    const productPrice = Number(form.price);
    const oldPrice = form.oldPrice === "" ? null : Number(form.oldPrice);

    if (!Number.isFinite(productPrice) || productPrice < 0) {
      toast.error("Please enter a valid Product Price");
      return;
    }

    if (oldPrice !== null && (!Number.isFinite(oldPrice) || oldPrice < 0)) {
      toast.error("Please enter a valid Old Price");
      return;
    }

    // Validate every variant before saving
    const validVariants = [];

    for (let index = 0; index < form.variants.length; index += 1) {
      const variant = form.variants[index];

      const hasName = variant.name.trim() !== "";
      const hasPrice = variant.price !== "";
      const hasAnyValue =
        hasName ||
        hasPrice ||
        String(variant.stock).trim() !== "" ||
        variant.sku.trim() !== "";

      // Ignore a completely empty extra variant
      if (!hasAnyValue) continue;

      if (!hasName || !hasPrice) {
        toast.error(
          `Variant ${index + 1}: Package Name and Price are required`,
        );
        return;
      }

      const variantPrice = Number(variant.price);
      const variantStock = variant.stock === "" ? 0 : Number(variant.stock);

      if (!Number.isFinite(variantPrice) || variantPrice < 0) {
        toast.error(`Variant ${index + 1}: Invalid price`);
        return;
      }

      if (!Number.isInteger(variantStock) || variantStock < 0) {
        toast.error(
          `Variant ${index + 1}: Stock must be a non-negative whole number`,
        );
        return;
      }

      validVariants.push({
        ...variant,
        name: variant.name.trim(),
        price: variantPrice,
        stock: variantStock,
        sku: variant.sku.trim(),
      });
    }

    const name = form.name.trim();
    const slug = createSlug(name) || product.slug || String(product.id);

    const updatedData = {
      ...form,
      name,
      category: form.category.trim(),
      brand: form.brand.trim(),
      image: form.image.trim(),
      description: form.description.trim(),
      slug,
      price: productPrice,
      oldPrice,
      variants: validVariants,
      path: `/category/${slug}`,
      status: form.status,
      deliveryType: form.deliveryType,
    };

    try {
      setIsSaving(true);

      updateProduct(product.id, updatedData);

      toast.success("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Product update error:", error);
      toast.error("Failed to update product");
      setIsSaving(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-[#171326] px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500";

  const labelClass = "text-sm font-medium text-[#AAA3C1]";

  // Product not found
  if (!product) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#211B3B] p-10 text-center">
        <h2 className="text-xl font-bold">Product Not Found</h2>

        <p className="mt-2 text-sm text-[#AAA3C1]">
          This product may have been deleted or the product ID is invalid.
        </p>

        <button
          type="button"
          onClick={() => navigate("/admin/products")}
          className="mt-5 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold"
        >
          Back to Products
        </button>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="p-10 text-center text-[#AAA3C1]">
        Loading product information...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <button
          type="button"
          onClick={() => navigate("/admin/products")}
          className="mb-3 flex items-center gap-2 text-sm text-[#AAA3C1] hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Products
        </button>

        <h1 className="text-2xl font-bold">Edit Product</h1>

        <p className="mt-1 text-sm text-[#AAA3C1]">
          Update product information in your AI-SaleBD marketplace.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <section className="rounded-2xl border border-white/10 bg-[#211B3B] p-5 sm:p-6">
          <h2 className="mb-5 text-lg font-semibold">Basic Information</h2>

          <div className="grid gap-5 sm:grid-cols-2">
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
                <option value="AI Tools">AI Tools</option>
                <option value="Subscriptions">Subscriptions</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Software">Software</option>
                <option value="Gift Cards">Gift Cards</option>
                <option value="Gaming">Gaming</option>
                <option value="Gaming Subscriptions">
                  Gaming Subscriptions
                </option>
                <option value="Other">Other</option>
              </select>
            </label>

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
            </label>
          </div>

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

              <div className="mt-3 flex items-center gap-4 rounded-xl border border-white/10 bg-[#171326] p-3">
                <img
                  key={form.image}
                  src={form.image}
                  alt={form.name || "Product preview"}
                  className="h-28 w-28 rounded-xl border border-white/10 object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                  onLoad={(event) => {
                    event.currentTarget.style.display = "block";
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

        {/* Packages / Variants */}
        <section className="rounded-2xl border border-white/10 bg-[#211B3B] p-5 sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Packages / Variants</h2>
              <p className="mt-1 text-xs text-[#AAA3C1]">
                Manage each package's price, stock and SKU separately.
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
                    Package Name *
                    <input
                      value={variant.name}
                      onChange={(event) =>
                        handleVariantChange(index, "name", event.target.value)
                      }
                      placeholder="1 Month"
                      className={inputClass}
                    />
                  </label>

                  <label className={labelClass}>
                    Price (৳) *
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={variant.price}
                      onChange={(event) =>
                        handleVariantChange(index, "price", event.target.value)
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
                      step="1"
                      value={variant.stock}
                      onChange={(event) =>
                        handleVariantChange(index, "stock", event.target.value)
                      }
                      placeholder="10"
                      className={inputClass}
                    />
                  </label>

                  <label className={labelClass}>
                    SKU
                    <input
                      value={variant.sku}
                      onChange={(event) =>
                        handleVariantChange(index, "sku", event.target.value)
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

        {/* Delivery & Product Status */}
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

        {/* Actions */}
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
            disabled={isSaving}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 text-sm font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={18} />
            {isSaving ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
