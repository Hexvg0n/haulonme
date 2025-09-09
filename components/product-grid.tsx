"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ProductModal } from "./product-modal"
import type { Product } from "@/types"

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {products.map((product) => (
          <div key={product._id?.toString()} className="group">
            <div
              className="relative overflow-hidden rounded-lg bg-card cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => setSelectedProduct(product)}
            >
              <img
                src={product.image || "/placeholder.svg"}
                alt="Product"
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            <div className="mt-4 space-y-2">
              <Button
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(product.affiliateLink, "_blank")
                }}
              >
                Get Link
              </Button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </>
  )
}