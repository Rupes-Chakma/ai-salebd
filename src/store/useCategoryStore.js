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

const createSlug = (value = "") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizeCategory = (category, index = 0) => {
  const name = String(category?.name || "").trim();

  return {
    ...category,
    id: category?.id ?? index + 1,
    name,
    slug: createSlug(category?.slug || name),
    status: category?.status === "Inactive" ? "Inactive" : "Active",
  };
};

const useCategoryStore = create(
  persist(
    (set) => ({
      categories: initialCategories,

      addCategory: (category) =>
        set((state) => {
          const name = String(category?.name || "").trim();

          if (!name) return state;

          const slug = createSlug(category?.slug || name);

          const alreadyExists = state.categories.some(
            (item) =>
              item.name.toLowerCase() === name.toLowerCase() ||
              item.slug === slug,
          );

          if (alreadyExists) return state;

          const newCategory = {
            ...category,
            id: Date.now(),
            name,
            slug,
            status: category.status === "Inactive" ? "Inactive" : "Active",
          };

          return {
            categories: [...state.categories, newCategory],
          };
        }),

      updateCategory: (id, updatedData) =>
        set((state) => ({
          categories: state.categories.map((category) => {
            if (String(category.id) !== String(id)) return category;

            const updatedName =
              updatedData.name !== undefined
                ? String(updatedData.name).trim()
                : category.name;

            return {
              ...category,
              ...updatedData,
              name: updatedName,
              slug: createSlug(updatedData.slug || updatedName),
            };
          }),
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
    {
      name: "nexora-categories",

      merge: (persistedState, currentState) => {
        const savedCategories = persistedState?.categories;

        return {
          ...currentState,
          ...persistedState,
          categories: Array.isArray(savedCategories)
            ? savedCategories.map(normalizeCategory)
            : currentState.categories,
        };
      },
    },
  ),
);

export default useCategoryStore;
