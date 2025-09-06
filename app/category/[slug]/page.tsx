"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { ProductGrid } from "@/components/product-grid"
import { CategoryFilters } from "@/components/category-filters"
import { SearchBar } from "@/components/search-bar"

// Mock data - in a real app, this would come from a database
const allProducts = [
  {
    id: "1",
    image: "/stylish-black-hoodie.png",
    affiliateLink: "https://example.com/product1",
    category: "hoodies",
    subCategory: "best-batch",
    review:
      "This hoodie has incredible quality and the fit is perfect. The material feels premium and it's very comfortable for daily wear.",
    keywords: ["balenciaga", "paris", "hoodie", "black", "oversized"],
  },
  {
    id: "2",
    image: "/designer-white-tshirt.png",
    affiliateLink: "https://example.com/product2",
    category: "t-shirts",
    subCategory: "budget-batch",
    review: "Great value for money. The design is clean and minimalist, perfect for casual outfits.",
    keywords: ["essentials", "white", "tee", "basic", "cotton"],
  },
  {
    id: "3",
    image: "/trendy-baseball-cap.png",
    affiliateLink: "https://example.com/product3",
    category: "caps",
    subCategory: "random",
    review: "This cap adds the perfect finishing touch to any streetwear outfit. Quality construction and great fit.",
    keywords: ["cap", "baseball", "streetwear", "adjustable", "cotton"],
  },
  {
    id: "4",
    image: "/luxury-sneakers.png",
    affiliateLink: "https://example.com/product4",
    category: "shoes",
    subCategory: "best-batch",
    review: "These sneakers are absolutely stunning. The comfort level is unmatched and they go with everything.",
    keywords: ["sneakers", "luxury", "comfortable", "versatile", "premium"],
  },
  {
    id: "5",
    image: "/vintage-denim-jacket.png",
    affiliateLink: "https://example.com/product5",
    category: "hoodies",
    subCategory: "budget-batch",
    review: "Perfect vintage aesthetic with modern comfort. This piece elevates any casual look.",
    keywords: ["denim", "jacket", "vintage", "casual", "layering"],
  },
  {
    id: "6",
    image: "/minimalist-watch.png",
    affiliateLink: "https://example.com/product6",
    category: "accessories",
    subCategory: "best-batch",
    review: "Elegant and timeless design. This watch complements both casual and formal outfits beautifully.",
    keywords: ["watch", "minimalist", "elegant", "timeless", "accessories"],
  },
  {
    id: "7",
    image: "/premium-black-hoodie.png",
    affiliateLink: "https://example.com/product7",
    category: "hoodies",
    subCategory: "best-batch",
    review: "Another fantastic hoodie option with premium materials and excellent craftsmanship.",
    keywords: ["hoodie", "premium", "black", "quality", "streetwear"],
  },
  {
    id: "8",
    image: "/casual-blue-tshirt.png",
    affiliateLink: "https://example.com/product8",
    category: "t-shirts",
    subCategory: "random",
    review: "Comfortable everyday tee with a great fit and soft fabric.",
    keywords: ["tshirt", "blue", "casual", "comfortable", "everyday"],
  },
]

const categoryTitles: Record<string, string> = {
  hoodies: "Hoodies",
  "t-shirts": "T-Shirts",
  caps: "Caps",
  shoes: "Shoes",
  accessories: "Accessories",
}

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [selectedSubCategory, setSelectedSubCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const categoryTitle = categoryTitles[params.slug] || "Products"

  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter((product) => product.category === params.slug)

    // Filter by subcategory
    if (selectedSubCategory !== "all") {
      filtered = filtered.filter((product) => product.subCategory === selectedSubCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((product) => product.keywords.some((keyword) => keyword.toLowerCase().includes(query)))
    }

    return filtered
  }, [params.slug, selectedSubCategory, searchQuery])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="py-8">
            <h1 className="text-4xl font-bold text-primary mb-2">{categoryTitle}</h1>
            <p className="text-muted-foreground">Discover our curated collection of {categoryTitle.toLowerCase()}</p>
          </div>

          {/* Search Bar */}
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            placeholder={`Search ${categoryTitle.toLowerCase()}...`}
          />

          {/* Category Filters */}
          <CategoryFilters selectedSubCategory={selectedSubCategory} onSubCategoryChange={setSelectedSubCategory} />

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"} found
            </p>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
              <p className="text-muted-foreground mt-2">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
