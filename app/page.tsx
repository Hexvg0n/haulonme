"use client"

import { Header } from "@/components/header"
import { useState, useEffect, useMemo } from "react"
import { ProductModal } from "@/components/product-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Product, Category } from "@/types"
import { useSearchParams } from "next/navigation";
const subCategories = [
    { id: "all", label: "All Batches" },
    { id: "best-batch", label: "Best Batch" },
    { id: "budget-batch", label: "Budget Batch" },
    { id: "random", label: "Random" },
]

export default function HomePage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSubCategory, setSelectedSubCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("newest")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(setProducts)
    fetch('/api/categories').then(res => res.json()).then(setCategories)
  }, [])

  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
        setSearchQuery(urlSearch);
    }
  }, [searchParams]);
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesSubCategory = selectedSubCategory === "all" || product.subCategory === selectedSubCategory
      const matchesSearch =
        searchQuery === "" ||
        product.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSubCategory && matchesSearch
    });

    const sorted = [...filtered].sort((a, b) => {
        switch (sortOption) {
            case 'price-asc':
                return (parseFloat(a.price?.replace('$', '') || '0')) - (parseFloat(b.price?.replace('$', '') || '0'));
            case 'price-desc':
                return (parseFloat(b.price?.replace('$', '') || '0')) - (parseFloat(a.price?.replace('$', '') || '0'));
            case 'newest':
            default:
                return new Date(b.created).getTime() - new Date(a.created).getTime();
        }
    });

    return sorted;
  }, [products, selectedCategory, selectedSubCategory, searchQuery, sortOption]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Fashion Collection</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Discover curated fashion pieces with detailed reviews and affiliate links.
            </p>

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
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <button
                key="all"
                onClick={() => setSelectedCategory("all")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === "all"
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                All Items
              </button>
            {categories.map((category) => (
              <button
                key={category._id?.toString()}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.key
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Sub-Category (Batch) Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 border-b pb-8 border-border">
            {subCategories.map((subCategory) => (
              <button
                key={subCategory.id}
                onClick={() => setSelectedSubCategory(subCategory.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  selectedSubCategory === subCategory.id
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                {subCategory.label}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center text-center mb-8">
            <p className="text-muted-foreground">{filteredAndSortedProducts.length} items found</p>
            <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedProducts.map((product) => (
              <div key={product._id?.toString()} className="group">
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