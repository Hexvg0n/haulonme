"use client"

import { Button } from "@/components/ui/button"

interface CategoryFiltersProps {
  selectedSubCategory: string
  onSubCategoryChange: (subCategory: string) => void
}

export function CategoryFilters({ selectedSubCategory, onSubCategoryChange }: CategoryFiltersProps) {
  const subCategories = [
    { id: "all", label: "All Items" },
    { id: "best-batch", label: "Best Batch" },
    { id: "budget-batch", label: "Budget Batch" },
    { id: "random", label: "Random" },
  ]

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {subCategories.map((subCategory) => (
        <Button
          key={subCategory.id}
          variant={selectedSubCategory === subCategory.id ? "default" : "outline"}
          onClick={() => onSubCategoryChange(subCategory.id)}
          className={
            selectedSubCategory === subCategory.id
              ? "bg-accent hover:bg-accent/90 text-accent-foreground"
              : "hover:bg-accent/10"
          }
        >
          {subCategory.label}
        </Button>
      ))}
    </div>
  )
}
