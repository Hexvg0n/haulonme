"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Edit, Trash2, Eye, Star, Package, DollarSign, X, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Product {
  id: string
  name: string
  description: string
  image: string
  images?: string[]
  affiliateLink: string
  category: string
  subCategory: string
  keywords: string[]
  created: string
  brand?: string
  material?: string
  fit?: string
  season?: string
  price?: string
  originalPrice?: string
  discount?: string
  rating?: string
  justification?: string
  review?: string
  features?: string[]
  careInstructions?: string[]
  status?: "active" | "draft" | "archived"
}

interface Category {
  id: string
  name: string
  key: string
  description: string
  productCount: number
  created: string
}

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Balenciaga PARIS HOODIE",
    description: "Premium oversized hoodie with screen print logo",
    image: "/stylish-black-hoodie.png",
    images: ["/stylish-black-hoodie.png", "/premium-black-hoodie.png"],
    affiliateLink: "https://example.com/product1",
    category: "hoodies",
    subCategory: "best batch",
    brand: "Balenciaga",
    material: "100% Cotton Fleece",
    fit: "Oversized",
    season: "Fall/Winter",
    price: "$89",
    originalPrice: "$120",
    discount: "25%",
    rating: "9/10",
    status: "active",
    features: ["Premium Cotton", "Oversized Fit", "Screen Print Logo"],
    keywords: ["balenciaga", "paris", "+5"],
    created: "1/15/2024",
  },
  {
    id: "2",
    name: "Essential White Tee",
    description: "Perfect basic white tee for layering",
    image: "/designer-white-tshirt.png",
    affiliateLink: "https://example.com/product2",
    category: "tshirts",
    subCategory: "budget batch",
    brand: "Essentials",
    material: "Cotton Blend",
    fit: "Regular",
    season: "All Season",
    price: "$25",
    originalPrice: "$35",
    discount: "30%",
    rating: "8/10",
    status: "active",
    keywords: ["white", "tee", "+5"],
    created: "1/10/2024",
  },
  {
    id: "3",
    name: "Minimalist Black Cap",
    description: "Clean, minimalist design that...",
    image: "/trendy-baseball-cap.png",
    affiliateLink: "https://example.com/product3",
    category: "caps",
    subCategory: "best batch",
    keywords: ["black", "cap", "+5"],
    created: "1/8/2024",
  },
  {
    id: "4",
    name: "Cloud White Sneakers",
    description: "These sneakers are incredibl...",
    image: "/luxury-sneakers.png",
    affiliateLink: "https://example.com/product4",
    category: "shoes",
    subCategory: "best batch",
    keywords: ["white", "sneakers", "+5"],
    created: "1/5/2024",
  },
  {
    id: "5",
    name: "Fog Essentials Hoodie",
    description: "Great alternative to the more...",
    image: "/premium-black-hoodie.png",
    affiliateLink: "https://example.com/product5",
    category: "hoodies",
    subCategory: "budget batch",
    keywords: ["fog", "essentials", "+5"],
    created: "1/3/2024",
  },
  {
    id: "6",
    name: "Vintage Black Tee",
    description: "Love the vintage wash on thi...",
    image: "/casual-blue-tshirt.png",
    affiliateLink: "https://example.com/product6",
    category: "tshirts",
    subCategory: "random",
    keywords: ["vintage", "black", "+5"],
    created: "1/1/2024",
  },
]

const initialCategories: Category[] = [
  {
    id: "1",
    name: "Hoodies",
    key: "hoodies",
    description: "Comfortable hoodies for all seasons",
    productCount: 2,
    created: "1/1/2024",
  },
  {
    id: "2",
    name: "T-Shirts",
    key: "tshirts",
    description: "Stylish t-shirts for casual wear",
    productCount: 2,
    created: "1/2/2024",
  },
  { id: "3", name: "Caps", key: "caps", description: "Trendy caps and hats", productCount: 1, created: "1/3/2024" },
  {
    id: "4",
    name: "Shoes",
    key: "shoes",
    description: "Comfortable and stylish footwear",
    productCount: 1,
    created: "1/4/2024",
  },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"products" | "categories">("products")
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [showProductForm, setShowProductForm] = useState(false)
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const categoryStats = {
    totalProducts: products.length,
    activeProducts: products.filter((p) => p.status === "active").length,
    draftProducts: products.filter((p) => p.status === "draft").length,
    totalRevenue: products.reduce((sum, p) => sum + Number.parseFloat(p.price?.replace("$", "") || "0"), 0),
    hoodies: products.filter((p) => p.category === "hoodies").length,
    tshirts: products.filter((p) => p.category === "tshirts").length,
    otherItems: products.filter((p) => !["hoodies", "tshirts"].includes(p.category)).length,
  }

  const categoryManagementStats = {
    totalCategories: categories.length,
    activeCategories: categories.length,
    avgProductsPerCategory: Math.round(products.length / categories.length),
  }

  const getCategoryBadgeColor = (category: string) => {
    const colors: Record<string, string> = {
      hoodies: "bg-blue-100 text-blue-800",
      tshirts: "bg-green-100 text-green-800",
      caps: "bg-purple-100 text-purple-800",
      shoes: "bg-orange-100 text-orange-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  const ProductForm = () => {
    const [formData, setFormData] = useState<Partial<Product>>(
      editingProduct || {
        name: "",
        description: "",
        brand: "",
        material: "",
        fit: "",
        season: "",
        price: "",
        originalPrice: "",
        discount: "",
        category: "",
        subCategory: "",
        affiliateLink: "",
        review: "",
        rating: "",
        justification: "",
        keywords: [],
        features: [],
        careInstructions: [],
        status: "active",
      },
    )

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (editingProduct) {
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? ({ ...editingProduct, ...formData } as Product) : p)),
        )
      } else {
        const newProduct: Product = {
          id: Date.now().toString(),
          name: formData.name || "",
          description: formData.description || "",
          image: "/placeholder.svg",
          affiliateLink: formData.affiliateLink || "",
          category: formData.category || "",
          subCategory: formData.subCategory || "",
          keywords: formData.keywords || [],
          created: new Date().toLocaleDateString(),
          ...formData,
        } as Product
        setProducts((prev) => [...prev, newProduct])
      }
      setShowProductForm(false)
      setEditingProduct(null)
    }

    const handleKeywordAdd = (keyword: string) => {
      if (keyword && !formData.keywords?.includes(keyword)) {
        setFormData((prev) => ({
          ...prev,
          keywords: [...(prev.keywords || []), keyword],
        }))
      }
    }

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setShowProductForm(false)
                setEditingProduct(null)
              }}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Balenciaga PARIS HOODIE"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    value={formData.brand || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, brand: e.target.value }))}
                    placeholder="e.g., Balenciaga"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category || ""}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hoodies">Hoodies</SelectItem>
                      <SelectItem value="tshirts">T-Shirts</SelectItem>
                      <SelectItem value="caps">Caps</SelectItem>
                      <SelectItem value="shoes">Shoes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subCategory">Sub-Category *</Label>
                  <Select
                    value={formData.subCategory || ""}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, subCategory: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sub-category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="best batch">Best Batch</SelectItem>
                      <SelectItem value="budget batch">Budget Batch</SelectItem>
                      <SelectItem value="random">Random</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="material">Material</Label>
                  <Input
                    id="material"
                    value={formData.material || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, material: e.target.value }))}
                    placeholder="e.g., 100% Cotton Fleece"
                  />
                </div>

                <div>
                  <Label htmlFor="fit">Fit</Label>
                  <Select
                    value={formData.fit || ""}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, fit: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select fit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Oversized">Oversized</SelectItem>
                      <SelectItem value="Regular">Regular</SelectItem>
                      <SelectItem value="Slim">Slim</SelectItem>
                      <SelectItem value="Relaxed">Relaxed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={formData.price || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                    placeholder="e.g., $89"
                  />
                </div>

                <div>
                  <Label htmlFor="originalPrice">Original Price</Label>
                  <Input
                    id="originalPrice"
                    value={formData.originalPrice || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, originalPrice: e.target.value }))}
                    placeholder="e.g., $120"
                  />
                </div>

                <div>
                  <Label htmlFor="discount">Discount</Label>
                  <Input
                    id="discount"
                    value={formData.discount || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, discount: e.target.value }))}
                    placeholder="e.g., 25%"
                  />
                </div>

                <div>
                  <Label htmlFor="season">Season</Label>
                  <Select
                    value={formData.season || ""}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, season: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Spring/Summer">Spring/Summer</SelectItem>
                      <SelectItem value="Fall/Winter">Fall/Winter</SelectItem>
                      <SelectItem value="All Season">All Season</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    value={formData.rating || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, rating: e.target.value }))}
                    placeholder="e.g., 9/10"
                  />
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status || "active"}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, status: value as "active" | "draft" | "archived" }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Brief product description..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="review">Detailed Review *</Label>
              <Textarea
                id="review"
                value={formData.review || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, review: e.target.value }))}
                placeholder="Write your honest review about the product..."
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="justification">Rating Justification</Label>
              <Textarea
                id="justification"
                value={formData.justification || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, justification: e.target.value }))}
                placeholder="Explain why you gave this rating..."
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="affiliateLink">Affiliate Link *</Label>
              <Input
                id="affiliateLink"
                value={formData.affiliateLink || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, affiliateLink: e.target.value }))}
                placeholder="https://example.com/product"
                required
              />
            </div>

            <div>
              <Label>Keywords (comma separated)</Label>
              <Input
                placeholder="balenciaga, paris, hoodie"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault()
                    const value = e.currentTarget.value.trim()
                    if (value) {
                      handleKeywordAdd(value)
                      e.currentTarget.value = ""
                    }
                  }
                }}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.keywords?.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {keyword}
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          keywords: prev.keywords?.filter((_, i) => i !== index),
                        }))
                      }
                      className="ml-1 text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowProductForm(false)
                  setEditingProduct(null)
                }}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-black hover:bg-gray-800">
                <Save className="h-4 w-4 mr-2" />
                {editingProduct ? "Update Product" : "Add Product"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const CategoryForm = () => {
    const [formData, setFormData] = useState<Partial<Category>>(
      editingCategory || {
        name: "",
        key: "",
        description: "",
      },
    )

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (editingCategory) {
        setCategories((prev) =>
          prev.map((c) => (c.id === editingCategory.id ? ({ ...editingCategory, ...formData } as Category) : c)),
        )
      } else {
        const newCategory: Category = {
          id: Date.now().toString(),
          name: formData.name || "",
          key: formData.key || "",
          description: formData.description || "",
          productCount: 0,
          created: new Date().toLocaleDateString(),
        }
        setCategories((prev) => [...prev, newCategory])
      }
      setShowCategoryForm(false)
      setEditingCategory(null)
    }

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <div className="bg-white rounded-xl max-w-2xl w-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold">{editingCategory ? "Edit Category" : "Add New Category"}</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setShowCategoryForm(false)
                setEditingCategory(null)
              }}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <Label htmlFor="categoryName">Category Name *</Label>
              <Input
                id="categoryName"
                value={formData.name || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Hoodies"
                required
              />
            </div>

            <div>
              <Label htmlFor="categoryKey">Category Key *</Label>
              <Input
                id="categoryKey"
                value={formData.key || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, key: e.target.value.toLowerCase() }))}
                placeholder="e.g., hoodies"
                required
              />
            </div>

            <div>
              <Label htmlFor="categoryDescription">Description</Label>
              <Textarea
                id="categoryDescription"
                value={formData.description || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of this category..."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowCategoryForm(false)
                  setEditingCategory(null)
                }}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-black hover:bg-gray-800">
                <Save className="h-4 w-4 mr-2" />
                {editingCategory ? "Update Category" : "Add Category"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your product catalog and categories</p>
          </div>

          <div className="mt-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("products")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "products"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab("categories")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "categories"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Categories
              </button>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "products" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Products</h2>
                <p className="text-gray-600">Manage your product catalog</p>
              </div>
              <Button
                className="bg-black hover:bg-gray-800 text-white"
                onClick={() => {
                  console.log("[v0] Add New Product clicked")
                  setShowProductForm(true)
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-600">Total Products</div>
                      <div className="text-3xl font-bold text-gray-900">{categoryStats.totalProducts}</div>
                    </div>
                    <Package className="h-8 w-8 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-600">Active Products</div>
                      <div className="text-3xl font-bold text-green-600">{categoryStats.activeProducts}</div>
                    </div>
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-600">Hoodies</div>
                      <div className="text-3xl font-bold text-gray-900">{categoryStats.hoodies}</div>
                    </div>
                    <div className="text-2xl">👕</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-600">T-Shirts</div>
                      <div className="text-3xl font-bold text-gray-900">{categoryStats.tshirts}</div>
                    </div>
                    <div className="text-2xl">👔</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-600">Avg. Price</div>
                      <div className="text-3xl font-bold text-gray-900">
                        ${Math.round(categoryStats.totalRevenue / categoryStats.totalProducts)}
                      </div>
                    </div>
                    <DollarSign className="h-8 w-8 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Product</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Brand & Price</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Category</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Rating</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Keywords</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Created</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-3">
                              <div className="relative">
                                <img
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                                {product.images && product.images.length > 1 && (
                                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-blue-500">
                                    {product.images.length}
                                  </Badge>
                                )}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500">{product.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="space-y-1">
                              {product.brand && (
                                <div className="text-sm font-medium text-gray-900">{product.brand}</div>
                              )}
                              <div className="flex items-center gap-2">
                                {product.price && (
                                  <span className="text-sm font-semibold text-gray-900">{product.price}</span>
                                )}
                                {product.discount && (
                                  <Badge className="bg-green-100 text-green-800 text-xs">{product.discount}</Badge>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="space-y-1">
                              <Badge className={getCategoryBadgeColor(product.category)}>{product.category}</Badge>
                              <div className="text-xs text-gray-500">{product.subCategory}</div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            {product.rating ? (
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium">{product.rating}</span>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400">No rating</span>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <Badge
                              className={
                                product.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : product.status === "draft"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                              }
                            >
                              {product.status || "active"}
                            </Badge>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex flex-wrap gap-1">
                              {product.keywords.slice(0, 2).map((keyword, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                              {product.keywords.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{product.keywords.length - 2}
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-sm text-gray-600">{product.created}</span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  console.log("[v0] Edit Product clicked", product.name)
                                  setEditingProduct(product)
                                  setShowProductForm(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "categories" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
                <p className="text-gray-600">Manage product categories</p>
              </div>
              <Button
                className="bg-black hover:bg-gray-800 text-white"
                onClick={() => {
                  console.log("[v0] Add New Category clicked")
                  setShowCategoryForm(true)
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Category
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-gray-600">Total Categories</div>
                  <div className="text-3xl font-bold text-gray-900">{categoryManagementStats.totalCategories}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-gray-600">Active Categories</div>
                  <div className="text-3xl font-bold text-gray-900">{categoryManagementStats.activeCategories}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-gray-600">Products per Category</div>
                  <div className="text-3xl font-bold text-gray-900">
                    {categoryManagementStats.avgProductsPerCategory}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Category</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Key</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Description</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Products</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Created</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {categories.map((category) => (
                        <tr key={category.id} className="hover:bg-gray-50">
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-sm">📁</span>
                              </div>
                              <span className="font-medium text-gray-900">{category.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">{category.key}</code>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-sm text-gray-600">{category.description}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-sm font-medium text-gray-900">{category.productCount} products</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-sm text-gray-600">{category.created}</span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  console.log("[v0] Edit Category clicked", category.name)
                                  setEditingCategory(category)
                                  setShowCategoryForm(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {showProductForm && (
        <>
          {console.log("[v0] Rendering ProductForm")}
          <ProductForm />
        </>
      )}
      {showCategoryForm && (
        <>
          {console.log("[v0] Rendering CategoryForm")}
          <CategoryForm />
        </>
      )}
    </div>
  )
}
