import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialCategories = [
  { id: 1, name: "Gaming", slug: "gaming", status: "Active" },
  { id: 2, name: "AI Tools", slug: "ai-tools", status: "Active" },
  { id: 3, name: "Subscriptions", slug: "subscriptions", status: "Active" },
  { id: 4, name: "Entertainment", slug: "entertainment", status: "Active" },
  { id: 5, name: "Software", slug: "software", status: "Active" },
  { id: 6, name: "Gift Cards", slug: "gift-cards", status: "Active" },
];

const useCategoryStore = create(
  persist(
    (set) => ({
      categories: initialCategories,

      addCategory: (category) =>
        set((state) => ({
          categories: [...state.categories, { ...category, id: Date.now() }],
        })),

      updateCategory: (id, updatedData) =>
        set((state) => ({
          categories: state.categories.map((category) =>
            String(category.id) === String(id)
              ? { ...category, ...updatedData }
              : category,
          ),
        })),

      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter(
            (category) => String(category.id) !== String(id),
          ),
        })),

      toggleCategoryStatus: (id) =>
        set((state) => ({
          categories: state.categories.map((category) =>
            String(category.id) === String(id)
              ? {
                  ...category,
                  status: category.status === "Active" ? "Inactive" : "Active",
                }
              : category,
          ),
        })),
    }),
    { name: "nexora-categories" },
  ),
);

export default useCategoryStore;
