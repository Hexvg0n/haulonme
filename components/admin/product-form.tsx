import type React from "react"
import { useState, useEffect } from "react"
import { X, Save, UploadCloud, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { Product, Category } from "@/types"

interface ProductFormProps {
  editingProduct: Partial<Product> | null
  categories: Category[]
  onSave: (product: Partial<Product>, imageFiles: File[]) => void
  onCancel: () => void
}

// A new type to manage the state of each image
interface ImageState {
  file?: File;  // The actual file object for new uploads
  url: string;   // The preview URL (blob for new, server path for existing)
}

export function ProductForm({ editingProduct, categories, onSave, onCancel }: ProductFormProps) {
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
      image: "",
      images: [],
    },
  )
  
  // A unified state for managing all images (new and existing)
  const [images, setImages] = useState<ImageState[]>(
    (editingProduct?.images || []).map(url => ({ url }))
  );

  useEffect(() => {
    // Cleanup blob URLs on component unmount to prevent memory leaks
    return () => {
      images.forEach(image => {
        if (image.url.startsWith('blob:')) {
          URL.revokeObjectURL(image.url);
        }
      });
    };
  }, [images]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages: ImageState[] = files.map(file => ({
        file: file,
        url: URL.createObjectURL(file)
      }));
      setImages(prev => [...prev, ...newImages]);
    }
  }

  const removeImage = (indexToRemove: number) => {
    const imageToRemove = images[indexToRemove];
    // If it's a new file, revoke its blob URL to free up memory
    if (imageToRemove.file) {
      URL.revokeObjectURL(imageToRemove.url);
    }
    setImages(prev => prev.filter((_, i) => i !== indexToRemove));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Separate new files for upload from existing image URLs
    const newImageFiles = images.map(img => img.file).filter((f): f is File => !!f);
    const existingImageUrls = images.filter(img => !img.file).map(img => img.url);

    // Update the form data with the correct list of existing images before saving
    const updatedFormData = { ...formData, images: existingImageUrls };

    onSave(updatedFormData, newImageFiles);
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
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload Section */}
          <div>
            <Label>Product Images</Label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload files</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleImageChange} accept="image/*" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={image.url} alt={`Preview ${index}`} className="h-24 w-24 rounded-md object-cover" />
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={() => removeImage(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Fields */}
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
                      {categories.map(category => (
                        <SelectItem key={category._id?.toString()} value={category.key}>{category.name}</SelectItem>
                      ))}
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
                      &#x2715;
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t sticky bottom-0 bg-white py-4">
              <Button type="button" variant="outline" onClick={onCancel}>
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