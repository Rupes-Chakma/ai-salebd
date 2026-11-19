const products = [
  {
    id: 1,
    name: "Gaming Top-up",
    category: "Gaming",
    price: 500,
    oldPrice: 600,
    badge: "Popular",
    image: "https://placehold.co/600x400/211B3B/B99AFF?text=Gaming+Top-up",
    path: "/category/gaming",
    description:
      "Digital gaming top-up service. Select your preferred package before ordering.",
    variants: [
      { id: "g1", name: "100 Diamonds", price: 100 },
      { id: "g2", name: "310 Diamonds", price: 300 },
      { id: "g3", name: "520 Diamonds", price: 500 },
    ],
  },
  {
    id: 2,
    name: "AI Tools Premium",
    category: "AI Tools",
    price: 350,
    oldPrice: 450,
    badge: "Featured",
    image: "https://placehold.co/600x400/211B3B/38BDF8?text=AI+Tools",
    path: "/category/ai-tools",
    description:
      "Explore AI productivity tools and premium features. Check the available plan before ordering.",
    variants: [
      { id: "a1", name: "1 Month", price: 350 },
      { id: "a2", name: "3 Months", price: 950 },
      { id: "a3", name: "1 Year", price: 3200 },
    ],
  },
  {
    id: 3,
    name: "Premium Subscription",
    category: "Subscriptions",
    price: 450,
    oldPrice: null,
    badge: null,
    image: "https://placehold.co/600x400/211B3B/B99AFF?text=Subscription",
    path: "/category/subscriptions",
    description:
      "Premium digital subscription with different duration options.",
    variants: [
      { id: "s1", name: "1 Month", price: 450 },
      { id: "s2", name: "3 Months", price: 1200 },
      { id: "s3", name: "6 Months", price: 2200 },
    ],
  },
  {
    id: 4,
    name: "Digital Gift Card",
    category: "Gift Cards",
    price: 700,
    oldPrice: 800,
    badge: "Special",
    image: "https://placehold.co/600x400/211B3B/38BDF8?text=Gift+Card",
    path: "/category/gift-cards",
    description:
      "Digital gift card. Choose your preferred value before ordering.",
    variants: [
      { id: "d1", name: "৳500 Value", price: 500 },
      { id: "d2", name: "৳1000 Value", price: 1000 },
      { id: "d3", name: "৳2000 Value", price: 2000 },
    ],
  },
];

export default products;
