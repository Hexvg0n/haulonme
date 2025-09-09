"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatsCards } from "@/components/admin/stats-cards"
import { ProductsTable } from "@/components/admin/products-table"
import { CategoriesTable } from "@/components/admin/categories-table"
import { RequestsTable } from "@/components/admin/requests-table"
import { ProductForm } from "@/components/admin/product-form"
import { CategoryForm } from "@/components/admin/category-form"
import { ProductModal } from "@/components/product-modal" // Import ProductModal
import type { Product, Category, PhotoRequest } from "@/types"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"products" | "categories" | "requests">("products")
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [requests, setRequests] = useState<PhotoRequest[]>([])
  const [showProductForm, setShowProductForm] = useState(false)
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [previewingProduct, setPreviewingProduct] = useState<Product | null>(null) // State for preview

  const fetchData = () => {
    fetch('/api/products').then(res => res.json()).then(setProducts)
    fetch('/api/categories').then(res => res.json()).then(setCategories)
    fetch('/api/requests').then(res => res.json()).then(setRequests)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const categoryStats = {
    totalProducts: products.length,
    activeProducts: products.filter((p) => p.status === "active").length,
    draftProducts: products.filter((p) => p.status === "draft").length,
    totalRevenue: products.reduce((sum, p) => sum + Number.parseFloat(p.price?.replace("$", "") || "0"), 0),
    hoodies: products.filter((p) => p.category === "hoodies").length,
    tshirts: products.filter((p) => p.category === "t-shirts").length,
    otherItems: products.filter((p) => !["hoodies", "t-shirts"].includes(p.category)).length,
  }

  const categoryManagementStats = {
    totalCategories: categories.length,
    activeCategories: categories.length,
    avgProductsPerCategory: categories.length > 0 ? Math.round(products.length / categories.length) : 0,
  }

  const getCategoryBadgeColor = (category: string) => {
    const colors: Record<string, string> = {
      hoodies: "bg-blue-100 text-blue-800",
      "t-shirts": "bg-green-100 text-green-800",
      caps: "bg-purple-100 text-purple-800",
      shoes: "bg-orange-100 text-orange-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  const handleSaveProduct = async (productData: Partial<Product>, imageFiles: File[]) => {
    let uploadedImagePaths: string[] = productData.images || [];

    if (imageFiles.length > 0) {
      const formData = new FormData();
      imageFiles.forEach(file => {
        formData.append('files', file);
      });

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        alert('Image upload failed!');
        return;
      }

      const uploadResult = await uploadResponse.json();
      uploadedImagePaths = [...uploadedImagePaths, ...uploadResult.paths];
    }
    
    const finalProductData = {
        ...productData,
        images: uploadedImagePaths,
        image: uploadedImagePaths[0] || productData.image || '',
    };

    const method = editingProduct ? 'PUT' : 'POST';
    const endpoint = editingProduct ? `/api/products/${editingProduct._id}` : '/api/products';
    const response = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalProductData),
    });

    if (response.ok) {
        fetchData()
    } else {
        alert('Failed to save product details.');
    }

    setShowProductForm(false)
    setEditingProduct(null)
  }

  const handleSaveCategory = async (categoryData: Partial<Category>) => {
    const method = editingCategory ? 'PUT' : 'POST';
      const endpoint = editingCategory ? `/api/categories/${editingCategory._id}` : '/api/categories';
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
      });
      if (response.ok) {
        fetchData()
      }
    setShowCategoryForm(false)
    setEditingCategory(null)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setShowProductForm(true)
  }

  const handleDeleteProduct = async (productId: string) => {
    const response = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
    if (response.ok) {
        fetchData()
    }
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setShowCategoryForm(true)
  }

  const handleDeleteCategory = async (categoryId: string) => {
    const response = await fetch(`/api/categories/${categoryId}`, { method: 'DELETE' });
    if (response.ok) {
        fetchData()
    }
  }

  const handleDeleteRequest = async (requestId: string) => {
    const response = await fetch(`/api/requests/${requestId}`, { method: 'DELETE' });
    if (response.ok) {
        fetchData();
    } else {
        alert("Failed to delete request.");
    }
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
              <button
                onClick={() => setActiveTab("requests")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "requests"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Photo Requests
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
                  setEditingProduct(null)
                  setShowProductForm(true)
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </div>
            <StatsCards stats={{...categoryStats, ...categoryManagementStats}} type="products" />
            <ProductsTable
              products={products}
              onPreview={setPreviewingProduct}
              onEdit={handleEditProduct}
              onDelete={(productId) => handleDeleteProduct(productId.toString())}
              getCategoryBadgeColor={getCategoryBadgeColor}
            />
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
                  setEditingCategory(null)
                  setShowCategoryForm(true)
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Category
              </Button>
            </div>
            <StatsCards stats={{...categoryStats, ...categoryManagementStats}} type="categories" />
            <CategoriesTable categories={categories} onEdit={handleEditCategory} onDelete={(categoryId) => handleDeleteCategory(categoryId.toString())} />
          </div>
        )}

        {activeTab === "requests" && (
            <div>
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Photo Requests</h2>
                    <p className="text-gray-600">View and manage user-submitted requests for items.</p>
                </div>
                <RequestsTable requests={requests} onDelete={handleDeleteRequest} />
            </div>
        )}
      </div>

      {showProductForm && (
        <ProductForm
          editingProduct={editingProduct}
          categories={categories}
          onSave={handleSaveProduct}
          onCancel={() => setShowProductForm(false)}
        />
      )}
      {showCategoryForm && (
        <CategoryForm
          editingCategory={editingCategory}
          onSave={handleSaveCategory}
          onCancel={() => setShowCategoryForm(false)}
        />
      )}
      {previewingProduct && (
        <ProductModal 
            product={previewingProduct}
            onClose={() => setPreviewingProduct(null)}
        />
      )}
    </div>
  )
}