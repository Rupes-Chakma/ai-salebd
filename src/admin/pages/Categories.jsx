import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Tags,
  X,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  Package,
} from "lucide-react";
import toast from "react-hot-toast";

import useCategoryStore from "../../store/useCategoryStore";
import useProductStore from "../../store/useProductStore";

const initialForm = {
  name: "",
  slug: "",
  image: "",
  status: "Active",
};

const createSlug = (value = "") =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalize = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const getCategoryName = (category) => {
  if (typeof category === "string") return category;

  if (category && typeof category === "object") {
    return category.name || category.title || category.slug || "";
  }

  return "";
};

function Categories() {
  const categories = useCategoryStore((state) => state.categories);
  const addCategory = useCategoryStore((state) => state.addCategory);
  const updateCategory = useCategoryStore((state) => state.updateCategory);
  const deleteCategory = useCategoryStore((state) => state.deleteCategory);
  const toggleCategoryStatus = useCategoryStore(
    (state) => state.toggleCategoryStatus,
  );

  const products = useProductStore((state) => state.products);

  const safeCategories = Array.isArray(categories) ? categories : [];
  const safeProducts = Array.isArray(products) ? products : [];

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ ...initialForm });

  const getProductCount = (categoryName) =>
    safeProducts.filter(
      (product) =>
        normalize(getCategoryName(product.category)) ===
        normalize(categoryName),
    ).length;

  const activeCount = safeCategories.filter(
    (category) => category.status === "Active",
  ).length;

  const inactiveCount = safeCategories.filter(
    (category) => category.status === "Inactive",
  ).length;

  const filteredCategories = useMemo(() => {
    const query = normalize(search);

    return safeCategories.filter((category) =>
      `${category.name || ""} ${category.slug || ""}`
        .toLowerCase()
        .includes(query),
    );
  }, [safeCategories, search]);

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ ...initialForm });
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ ...initialForm });
    setShowModal(true);
  };

  const openEditModal = (category) => {
    setEditingId(category.id);
    setFormData({
      name: category.name || "",
      slug: category.slug || "",
      image: category.image || "",
      status: category.status || "Active",
    });
    setShowModal(true);
  };

  const handleNameChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: createSlug(value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = formData.name.trim();
    const slug = createSlug(formData.slug);

    if (!name || !slug) {
      toast.error("Category name and slug are required");
      return;
    }

    const duplicate = safeCategories.some(
      (category) =>
        String(category.id) !== String(editingId) &&
        (normalize(category.name) === normalize(name) ||
          normalize(category.slug) === normalize(slug)),
    );

    if (duplicate) {
      toast.error("Category name or slug already exists");
      return;
    }

    const categoryData = {
      name,
      slug,
      image: formData.image.trim(),
      status: formData.status === "Inactive" ? "Inactive" : "Active",
    };

    if (editingId !== null) {
      updateCategory(editingId, categoryData);
      toast.success("Category updated successfully");
    } else {
      addCategory(categoryData);
      toast.success("Category added successfully");
    }

    closeModal();
  };

  const handleDelete = (category) => {
    const productCount = getProductCount(category.name);

    if (productCount > 0) {
      toast.error(
        `Cannot delete: ${productCount} product(s) use this category. Reassign them first.`,
        { duration: 4500 },
      );
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`,
    );

    if (!confirmed) return;

    deleteCategory(category.id);
    toast.success("Category deleted successfully");
  };

  const toggleStatus = (category) => {
    const productCount = getProductCount(category.name);

    if (category.status === "Active" && productCount > 0) {
      const confirmed = window.confirm(
        `${productCount} product(s) use this category. Making it inactive will hide it from active category selections. Continue?`,
      );

      if (!confirmed) return;
    }

    toggleCategoryStatus(category.id);
    toast.success("Category status updated");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Categories</h1>
          <p className="mt-1 text-sm text-[#AAA3C1]">
            Manage your product categories
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#171326] p-5">
          <Tags className="mb-3 text-purple-400" size={23} />
          <p className="text-sm text-[#AAA3C1]">Total Categories</p>
          <h2 className="mt-1 text-2xl font-bold text-white">
            {safeCategories.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#171326] p-5">
          <CheckCircle className="mb-3 text-green-400" size={23} />
          <p className="text-sm text-[#AAA3C1]">Active Categories</p>
          <h2 className="mt-1 text-2xl font-bold text-white">{activeCount}</h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#171326] p-5">
          <XCircle className="mb-3 text-red-400" size={23} />
          <p className="text-sm text-[#AAA3C1]">Inactive Categories</p>
          <h2 className="mt-1 text-2xl font-bold text-white">
            {inactiveCount}
          </h2>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAA3C1]"
          size={18}
        />
        <input
          type="search"
          placeholder="Search categories..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-[#171326] py-3 pl-11 pr-4 text-sm text-white outline-none focus:border-purple-500"
        />
      </div>

      {/* Category Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#171326]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead className="border-b border-white/10 bg-white/[0.03]">
              <tr className="text-xs uppercase tracking-wider text-[#AAA3C1]">
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Slug</th>
                <th className="px-5 py-4">Products</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {filteredCategories.map((category) => {
                const productCount = getProductCount(category.name);
                const isActive = category.status === "Active";

                return (
                  <tr key={category.id} className="text-sm">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/5">
                          {category.image ? (
                            <img
                              src={category.image}
                              alt={category.name}
                              className="h-full w-full object-cover"
                              onError={(event) => {
                                event.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <ImageIcon className="text-purple-400" size={20} />
                          )}
                        </div>

                        <span className="font-medium text-white">
                          {category.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-[#AAA3C1]">
                      {category.slug}
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400">
                        <Package size={13} />
                        {productCount} Products
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => toggleStatus(category)}
                        aria-label={`Change ${category.name} status`}
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          isActive
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {isActive ? "Active" : "Inactive"}
                      </button>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(category)}
                          title="Edit"
                          aria-label={`Edit ${category.name}`}
                          className="rounded-lg border border-white/10 p-2 text-blue-400 transition hover:bg-blue-500/10"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(category)}
                          title="Delete"
                          aria-label={`Delete ${category.name}`}
                          className="rounded-lg border border-white/10 p-2 text-red-400 transition hover:bg-red-500/10"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredCategories.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-[#AAA3C1]"
                  >
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-black/70 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div className="my-auto w-full max-w-lg rounded-2xl border border-white/10 bg-[#1B1730] p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {editingId !== null ? "Edit Category" : "Add New Category"}
              </h2>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
                className="rounded-lg p-2 text-[#AAA3C1] hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-[#AAA3C1]">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(event) => handleNameChange(event.target.value)}
                  placeholder="e.g. Gaming"
                  className="w-full rounded-xl border border-white/10 bg-[#11101C] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-[#AAA3C1]">
                  Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      slug: createSlug(event.target.value),
                    }))
                  }
                  placeholder="e.g. gaming"
                  className="w-full rounded-xl border border-white/10 bg-[#11101C] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                />
                <p className="mt-1 text-xs text-[#817995]">
                  URL-friendly category identifier.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm text-[#AAA3C1]">
                  Category Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      image: event.target.value,
                    }))
                  }
                  placeholder="/images/categories/gaming.png"
                  className="w-full rounded-xl border border-white/10 bg-[#11101C] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                />
              </div>

              {formData.image.trim() && (
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#11101C] p-3">
                  <img
                    src={formData.image}
                    alt="Category preview"
                    className="h-16 w-16 rounded-lg object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                  <span className="break-all text-xs text-[#AAA3C1]">
                    {formData.image}
                  </span>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm text-[#AAA3C1]">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#11101C] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm text-white hover:bg-white/5"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white hover:bg-purple-700"
                >
                  {editingId !== null ? "Update Category" : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
