import type React from "react"
import { useState } from "react"
import { X, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Category {
  id: string
  name: string
  key: string
  description: string
  productCount: number
  created: string
}

interface CategoryFormProps {
  editingCategory: Partial<Category> | null
  onSave: (category: Partial<Category>) => void
  onCancel: () => void
}

export function CategoryForm({ editingCategory, onSave, onCancel }: CategoryFormProps) {
  const [formData, setFormData] = useState<Partial<Category>>(
    editingCategory || {
      name: "",
      key: "",
      description: "",
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl max-w-2xl w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">{editingCategory ? "Edit Category" : "Add New Category"}</h2>
          <Button variant="ghost" size="icon" onClick={onCancel}>
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
            <Button type="button" variant="outline" onClick={onCancel}>
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