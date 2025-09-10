"use client"

import { useState } from "react"
import { ProductGrid } from "./product-grid"
import type { Product } from "@/types"

interface CategorySectionProps {
  title: string
  products: Product[]
  categoryKey: string
}

const clothingTypes = [
  { key: "all", label: "All Items" },
  { key: "hoodies", label: "Hoodies" },
  { key: "t-shirts", label: "T-Shirts" },
  { key: "caps", label: "Caps" },
  { key: "shoes", label: "Shoes" },
  { key: "accessories", label: "Accessories" },
]

export function CategorySection({ title, products, categoryKey }: CategorySectionProps) {
  const [selectedType, setSelectedType] = useState("all")

  const filteredProducts =
    selectedType === "all" ? products : products.filter((product) => product.category === selectedType)

  return (
    <section className="mb-16">
      <div className="px-6 mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-6">{title}</h2>

        <div className="flex flex-wrap gap-3 mb-6">
          {clothingTypes.map((type) => (
            <button
              key={type.key}
              onClick={() => setSelectedType(type.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedType === type.key
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-muted text-muted-foreground hover:bg-purple-100 hover:text-purple-700"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        <p className="text-muted-foreground mb-2">
          Showing {filteredProducts.length} items
          {selectedType !== "all" && ` in ${clothingTypes.find((t) => t.key === selectedType)?.label}`}
        </p>
      </div>

      <ProductGrid products={filteredProducts} />
    </section>
  )
}