import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash2, Star } from "lucide-react"
import type { Product } from "@/types"

interface ProductsTableProps {
  products: Product[]
  onPreview: (product: Product) => void
  onEdit: (product: Product) => void
  onDelete: (productId: string) => void
  getCategoryBadgeColor: (category: string) => string
}

export function ProductsTable({ products, onPreview, onEdit, onDelete, getCategoryBadgeColor }: ProductsTableProps) {
  return (
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
                <tr key={product._id?.toString()} className="hover:bg-gray-50">
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
                      {product.brand && <div className="text-sm font-medium text-gray-900">{product.brand}</div>}
                      <div className="flex items-center gap-2">
                        {product.price && <span className="text-sm font-semibold text-gray-900">{product.price}</span>}
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
                      <Button variant="ghost" size="sm" onClick={() => onPreview(product)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onEdit(product)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => onDelete(product._id!.toString())}
                      >
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
  )
}