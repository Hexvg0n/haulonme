"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PhotoRequestPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    itemName: "",
    description: "",
    referenceLinks: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Photo request submitted:", formData)
    alert("Thank you for your request! We'll review it and get back to you soon.")
    setFormData({
      name: "",
      email: "",
      category: "",
      itemName: "",
      description: "",
      referenceLinks: "",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Photo Request</h1>
            <p className="text-muted-foreground text-lg">
              Request specific items you'd like to see reviewed and featured on our site
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Your Name</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Category</label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select item category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hoodies">Hoodies</SelectItem>
                  <SelectItem value="tshirts">T-Shirts</SelectItem>
                  <SelectItem value="caps">Caps</SelectItem>
                  <SelectItem value="shoes">Shoes</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Item Name</label>
              <Input
                type="text"
                value={formData.itemName}
                onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                placeholder="e.g., Nike Air Jordan 1, Supreme Box Logo Hoodie"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description & Details</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the item you'd like to see reviewed. Include specific colorways, sizes, or any particular details you're interested in..."
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Reference Links (Optional)</label>
              <Textarea
                value={formData.referenceLinks}
                onChange={(e) => setFormData({ ...formData, referenceLinks: e.target.value })}
                placeholder="Share any links to the items you'd like reviewed (one per line)"
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Submit Photo Request
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
