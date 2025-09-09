import { Card, CardContent } from "@/components/ui/card"
import { Package, DollarSign } from "lucide-react"

interface StatsCardsProps {
  stats: {
    totalProducts: number
    activeProducts: number
    hoodies: number
    tshirts: number
    totalRevenue: number
    totalCategories?: number
    activeCategories?: number
    avgProductsPerCategory?: number
  }
  type: "products" | "categories"
}

export function StatsCards({ stats, type }: StatsCardsProps) {
  if (type === "products") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Total Products</div>
                <div className="text-3xl font-bold text-gray-900">{stats.totalProducts}</div>
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
                <div className="text-3xl font-bold text-green-600">{stats.activeProducts}</div>
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
                <div className="text-3xl font-bold text-gray-900">{stats.hoodies}</div>
              </div>
              <div className="text-2xl">🧥</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">T-Shirts</div>
                <div className="text-3xl font-bold text-gray-900">{stats.tshirts}</div>
              </div>
              <div className="text-2xl">👕</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Avg. Price</div>
                <div className="text-3xl font-bold text-gray-900">
                  ${stats.totalProducts > 0 ? Math.round(stats.totalRevenue / stats.totalProducts) : 0}
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (type === "categories" && stats.totalCategories !== undefined && stats.activeCategories !== undefined && stats.avgProductsPerCategory !== undefined) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-600">Total Categories</div>
            <div className="text-3xl font-bold text-gray-900">{stats.totalCategories}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-600">Active Categories</div>
            <div className="text-3xl font-bold text-gray-900">{stats.activeCategories}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-600">Products per Category</div>
            <div className="text-3xl font-bold text-gray-900">{stats.avgProductsPerCategory}</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}