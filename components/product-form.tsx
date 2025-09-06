"use client"

import type React from "react"

import { useState } from "react"
import { X, Upload, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Product {
  id: string
  image: string
  affiliateLink: string
  category: string
  subCategory: string
  review: string
  keywords: string[]
}

interface ProductFormProps {
  product?: Product
  onSave: (product: Partial<Product>) => void
  onCancel: () => void
}

export function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    image: product?.image || "",
    affiliateLink: product?.affiliateLink || "",
    category: product?.category || "",
    subCategory: product?.subCategory || "",
    review: product?.review || "",
    keywords: product?.keywords?.join(", ") || "",
  })

  const [imagePreview, setImagePreview] = useState<string | null>(product?.image || null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setFormData({ ...formData, image: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      keywords: formData.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{product ? "Edit Product" : "Add New Product"}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="image">Product Image</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {imagePreview ? (
                    <div className="space-y-2">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg mx-auto"
                      />
                      <p className="text-sm text-muted-foreground">Click to change image</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                      <p className="text-sm text-muted-foreground">Click to upload image</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Affiliate Link */}
            <div className="space-y-2">
              <Label htmlFor="affiliateLink">Affiliate Link</Label>
              <Input
                id="affiliateLink"
                type="url"
                placeholder="https://example.com/product"
                value={formData.affiliateLink}
                onChange={(e) => setFormData({ ...formData, affiliateLink: e.target.value })}
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="w-full p-2 border border-border rounded-lg bg-background"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                <option value="hoodies">Hoodies</option>
                <option value="t-shirts">T-Shirts</option>
                <option value="caps">Caps</option>
                <option value="shoes">Shoes</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            {/* Sub-category */}
            <div className="space-y-2">
              <Label htmlFor="subCategory">Sub-category</Label>
              <select
                id="subCategory"
                className="w-full p-2 border border-border rounded-lg bg-background"
                value={formData.subCategory}
                onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                required
              >
                <option value="">Select Sub-category</option>
                <option value="best-batch">Best Batch</option>
                <option value="budget-batch">Budget Batch</option>
                <option value="random">Random</option>
              </select>
            </div>

            {/* Product Review */}
            <div className="space-y-2">
              <Label htmlFor="review">Product Review (My Opinion)</Label>
              <Textarea
                id="review"
                placeholder="Write your opinion about this product..."
                rows={4}
                value={formData.review}
                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                required
              />
            </div>

            {/* Hidden Search Keywords */}
            <div className="space-y-2">
              <Label htmlFor="keywords">Hidden Search Keywords</Label>
              <Input
                id="keywords"
                placeholder="balenciaga, paris, hoodie, black, oversized (comma separated)"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                required
              />
              <p className="text-xs text-muted-foreground">
                These keywords will be used for search functionality. Separate with commas.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90">
                <Save className="h-4 w-4 mr-2" />
                Save Product
              </Button>
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
