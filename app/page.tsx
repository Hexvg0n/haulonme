"use client"

import { Header } from "@/components/header"
import { useState } from "react"
import { ProductModal } from "@/components/product-modal"

const mockProducts = [
  {
    id: "1",
    image: "/stylish-black-hoodie.png",
    images: ["/stylish-black-hoodie.png", "/premium-black-hoodie.png"],
    affiliateLink: "https://example.com/product1",
    category: "hoodies",
    subCategory: "best-batch",
    brand: "Balenciaga",
    material: "100% Cotton Fleece",
    fit: "Oversized",
    season: "Fall/Winter",
    price: "$89",
    originalPrice: "$120",
    discount: "25%",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Gray"],
    features: ["Premium Cotton", "Oversized Fit", "Screen Print Logo", "Kangaroo Pocket"],
    careInstructions: ["Machine wash cold", "Tumble dry low", "Do not bleach", "Iron on low heat"],
    review:
      "BALENCIAGA PARIS HOODIE: Very nice smooth material, well made, print done very nicely. The oversized fit is perfect for the streetwear aesthetic and the quality feels premium throughout. The cotton fleece is incredibly soft and the construction is solid.",
    rating: "9/10",
    justification:
      "The hoodie is slightly long, but that's a sizing issue - I recommend going one size smaller for the perfect fit. The quality justifies the price point.",
    keywords: ["balenciaga", "paris", "hoodie", "black", "oversized"],
  },
  {
    id: "2",
    image: "/designer-white-tshirt.png",
    images: ["/designer-white-tshirt.png", "/casual-blue-tshirt.png"],
    affiliateLink: "https://example.com/product2",
    category: "t-shirts",
    subCategory: "budget-batch",
    brand: "Essentials",
    material: "Cotton Blend",
    fit: "Regular",
    season: "All Season",
    price: "$25",
    originalPrice: "$35",
    discount: "30%",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White"],
    features: ["Breathable Fabric", "Classic Fit", "Reinforced Seams"],
    careInstructions: ["Machine wash warm", "Tumble dry medium", "Iron if needed"],
    review:
      "ESSENTIAL WHITE TEE: Perfect basic white tee that works as a foundation piece. The cotton blend is soft and breathable, making it ideal for layering or wearing alone. Great value for the price point and the fit is consistent.",
    rating: "8/10",
    justification:
      "Excellent quality for a budget option, though the fit could be slightly more tailored around the waist. Still a solid wardrobe staple.",
    keywords: ["essentials", "white", "tee", "basic", "cotton"],
  },
  {
    id: "3",
    image: "/trendy-baseball-cap.png",
    affiliateLink: "https://example.com/product3",
    category: "caps",
    subCategory: "random",
    brand: "Unknown",
    material: "Cotton",
    fit: "Adjustable",
    season: "All Season",
    price: "$15",
    originalPrice: "$20",
    discount: "25%",
    sizes: ["One Size"],
    colors: ["Black"],
    features: ["Clean Design", "Adjustable Strap", "Versatile"],
    careInstructions: ["Machine wash cold", "Iron if needed"],
    review:
      "MINIMALIST BLACK CAP: Clean, minimalist design that complements any outfit. The adjustable strap ensures a perfect fit and the material feels durable. A versatile piece that works with both casual and elevated streetwear looks.",
    rating: "8.5/10",
    justification:
      "Great overall quality and design, minor points deducted for the slightly stiff brim that needs breaking in.",
    keywords: ["cap", "baseball", "streetwear", "adjustable", "cotton"],
  },
  {
    id: "4",
    image: "/luxury-sneakers.png",
    affiliateLink: "https://example.com/product4",
    category: "shoes",
    subCategory: "best-batch",
    brand: "Unknown",
    material: "Leather and Synthetic",
    fit: "Comfortable",
    season: "All Season",
    price: "$150",
    originalPrice: "$200",
    discount: "25%",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cloud White"],
    features: ["Premium Materials", "Comfortable Fit", "Versatile Design"],
    careInstructions: ["Wipe clean with a damp cloth", "Avoid prolonged exposure to direct sunlight"],
    review:
      "CLOUD WHITE SNEAKERS: These sneakers are incredibly comfortable with premium materials throughout. The cloud white colorway is versatile and the comfort level is unmatched for all-day wear. Perfect for both casual and semi-formal occasions.",
    rating: "9.5/10",
    justification:
      "Nearly perfect sneakers with exceptional comfort and style. Only minor issue is they show dirt easily due to the white colorway.",
    keywords: ["sneakers", "luxury", "comfortable", "versatile", "premium"],
  },
  {
    id: "5",
    image: "/vintage-denim-jacket.png",
    affiliateLink: "https://example.com/product5",
    category: "hoodies",
    subCategory: "budget-batch",
    brand: "Fog",
    material: "Denim",
    fit: "Relaxed",
    season: "Fall/Winter",
    price: "$50",
    originalPrice: "$70",
    discount: "30%",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Vintage Wash"],
    features: ["Vintage Wash", "Relaxed Fit", "Layering"],
    careInstructions: ["Machine wash cold", "Do not bleach", "Iron on low heat"],
    review:
      "FOG ESSENTIALS HOODIE: Great alternative to the more expensive options. The vintage wash gives it character and the fit is relaxed but not oversized. Perfect for layering and the price point makes it accessible.",
    rating: "7.5/10",
    justification:
      "Good quality for the price, but the material isn't as premium as higher-tier options. Still a solid choice for budget-conscious buyers.",
    keywords: ["fog", "essentials", "vintage", "casual", "layering"],
  },
  {
    id: "6",
    image: "/minimalist-watch.png",
    affiliateLink: "https://example.com/product6",
    category: "accessories",
    subCategory: "best-batch",
    brand: "Unknown",
    material: "Metal and Leather",
    fit: "One Size",
    season: "All Season",
    price: "$40",
    originalPrice: "$50",
    discount: "20%",
    sizes: ["One Size"],
    colors: ["Black"],
    features: ["Vintage Wash", "Minimalist Design", "Excellent Quality"],
    careInstructions: ["Wipe clean with a damp cloth", "Avoid water"],
    review:
      "VINTAGE BLACK TEE: Love the vintage wash on this piece. The fit is perfect for a relaxed, effortless look and the quality of the cotton is excellent. The faded black color adds character and works well with various outfit combinations.",
    rating: "8/10",
    justification:
      "Great vintage aesthetic and quality, though the sizing runs slightly large so consider going one size down.",
    keywords: ["vintage", "black", "tee", "wash", "cotton"],
  },
]

const categories = [
  { id: "all", label: "All Items" },
  { id: "hoodies", label: "Hoodies" },
  { id: "t-shirts", label: "T-Shirts" },
  { id: "caps", label: "Caps" },
  { id: "shoes", label: "Shoes" },
  { id: "accessories", label: "Accessories" },
]

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<(typeof mockProducts)[0] | null>(null)

  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      product.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Fashion Collection</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Discover curated fashion pieces with detailed reviews and affiliate links.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground">{filteredProducts.length} items found</p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="bg-muted/30 rounded-2xl p-8 mb-4 aspect-square flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt="Fashion item"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  />
                </div>
                <button
                  onClick={() => window.open(product.affiliateLink, "_blank")}
                  className="w-full bg-foreground text-background py-3 rounded-lg font-medium hover:bg-foreground/90 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Get Link
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  )
}
