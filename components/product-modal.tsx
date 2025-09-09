"use client"

import { useState } from "react"
import { X, Star, Award, Zap, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types" // Import the shared type

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const images = product.images || [product.image]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const getRatingColor = (rating: string) => {
    const numRating = Number.parseFloat(rating)
    if (numRating >= 9) return "text-green-600"
    if (numRating >= 7) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 animate-fade-in" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-background rounded-xl max-w-6xl w-fit max-h-[90vh] overflow-hidden animate-fade-in shadow-2xl">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-background/90 hover:bg-background backdrop-blur-sm"
        >
          <X className="h-6 w-6" />
        </Button>

        <div className="flex">
          {/* Left Column - Images */}
          <div className="flex gap-4 p-6">
            {/* Main Image */}
            <div className="flex-shrink-0">
              <div className="bg-muted/30 rounded-xl p-4">
                <img
                  src={images[currentImageIndex] || "/placeholder.svg"}
                  alt="Product"
                  className="max-w-[500px] max-h-[600px] w-auto h-auto object-contain rounded-lg"
                />
              </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex flex-col gap-3 w-24">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative overflow-hidden rounded-lg border-2 transition-all hover:scale-105 ${
                      index === currentImageIndex
                        ? "border-foreground shadow-lg ring-2 ring-foreground/20"
                        : "border-muted hover:border-foreground/50"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Product view ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Details */}
          <div className="w-96 max-h-[600px] overflow-y-auto p-6 space-y-6 border-l border-muted">
            <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl p-4 border border-muted">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Model Information</span>
              </div>
              <p className="text-sm text-foreground">Model is 177cm tall and weighs 77kg</p>
            </div>

            {(product.brand || product.material || product.fit || product.season) && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Product Details
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.brand && (
                    <div className="bg-muted/30 rounded-lg p-3">
                      <span className="text-xs text-muted-foreground block">Brand</span>
                      <span className="font-medium text-foreground">{product.brand}</span>
                    </div>
                  )}
                  {product.material && (
                    <div className="bg-muted/30 rounded-lg p-3">
                      <span className="text-xs text-muted-foreground block">Material</span>
                      <span className="font-medium text-foreground">{product.material}</span>
                    </div>
                  )}
                  {product.fit && (
                    <div className="bg-muted/30 rounded-lg p-3">
                      <span className="text-xs text-muted-foreground block">Fit</span>
                      <span className="font-medium text-foreground">{product.fit}</span>
                    </div>
                  )}
                  {product.season && (
                    <div className="bg-muted/30 rounded-lg p-3">
                      <span className="text-xs text-muted-foreground block">Season</span>
                      <span className="font-medium text-foreground">{product.season}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {(product.price || product.originalPrice) && (
              <div className="bg-muted/20 rounded-xl p-4 border border-muted">
                <div className="flex items-center justify-between">
                  <div>
                    {product.price && <span className="text-2xl font-bold text-foreground">{product.price}</span>}
                    {product.originalPrice && product.originalPrice !== product.price && (
                      <span className="text-lg text-muted-foreground line-through ml-2">{product.originalPrice}</span>
                    )}
                  </div>
                  {product.discount && (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{product.discount} OFF</Badge>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                My Honest Review
              </h3>

              <div className="bg-muted/20 rounded-xl p-5 border border-muted">
                <p className="text-foreground leading-relaxed mb-4 text-base">
                  {product.review ||
                    "This is a great product that I highly recommend. The quality is excellent and it's perfect for everyday wear."}
                </p>

                {product.rating && (
                  <div className="space-y-3 pt-4 border-t border-muted">
                    <div className="flex items-center gap-3">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="font-semibold text-foreground">Rating:</span>
                      <span className={`text-xl font-bold ${getRatingColor(product.rating)}`}>{product.rating}</span>
                    </div>
                    {product.justification && (
                      <div className="bg-muted/30 rounded-lg p-3">
                        <span className="text-sm font-medium text-muted-foreground block mb-1">Why this rating?</span>
                        <p className="text-sm text-foreground">{product.justification}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {(product.features || product.careInstructions) && (
              <div className="space-y-4">
                {product.features && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Key Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {product.careInstructions && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Care Instructions</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {product.careInstructions.map((instruction, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                          {instruction}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <Button
              className="w-full bg-foreground hover:bg-foreground/90 text-background py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] sticky bottom-0"
              onClick={() => window.open(product.affiliateLink, "_blank")}
            >
              <span className="flex items-center gap-2">
                Get This Item
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}