"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Upload, ChevronDown } from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Product } from "@/types"

export default function TryOnPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState("")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedResult, setGeneratedResult] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleVisualize = () => {
    if (!uploadedImage || !selectedProduct) return

    setIsGenerating(true)
    // Simulate AI processing time
    setTimeout(() => {
      setGeneratedResult("/placeholder.svg?height=400&width=300&text=AI+Generated+Try-On+Result")
      setIsGenerating(false)
    }, 3000)
  }

  const selectedProductData = products.find((p) => p._id?.toString() === selectedProduct)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">AI Virtual Try-On</h1>
            <p className="text-muted-foreground text-lg">
              See how our products look on you with our advanced AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Controls Section */}
            <div className="space-y-8">
              {/* Upload Photo */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Your Photo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent/50 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      {uploadedImage ? (
                        <div className="space-y-4">
                          <img
                            src={uploadedImage || "/placeholder.svg"}
                            alt="Uploaded"
                            className="w-32 h-32 object-cover rounded-lg mx-auto"
                          />
                          <p className="text-sm text-muted-foreground">Click to change photo</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                          <div>
                            <p className="text-lg font-medium">Click to upload your photo</p>
                            <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                          </div>
                        </div>
                      )}
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Product Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Product</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full flex items-center justify-between p-3 border border-border rounded-lg bg-card hover:bg-accent/5 transition-colors"
                    >
                      <span className="text-left">
                        {selectedProductData ? selectedProductData.name : "Choose a product..."}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                        {products.map((product) => (
                          <button
                            key={product._id?.toString()}
                            onClick={() => {
                              setSelectedProduct(product._id!.toString())
                              setIsDropdownOpen(false)
                            }}
                            className="w-full flex items-center gap-3 p-3 hover:bg-accent/10 transition-colors text-left"
                          >
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                            <span>{product.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Visualize Button */}
              <Button
                onClick={handleVisualize}
                disabled={!uploadedImage || !selectedProduct || isGenerating}
                className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground text-lg"
              >
                {isGenerating ? "Generating..." : "Visualize"}
              </Button>
            </div>

            {/* Result Section */}
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>AI Generated Result</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center min-h-[400px]">
                  {isGenerating ? (
                    <div className="text-center space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
                      <p className="text-muted-foreground">AI is processing your image...</p>
                    </div>
                  ) : generatedResult ? (
                    <div className="text-center space-y-4">
                      <img
                        src={generatedResult || "/placeholder.svg"}
                        alt="AI Generated Try-On"
                        className="max-w-full max-h-96 object-contain rounded-lg"
                      />
                      <p className="text-sm text-muted-foreground">Your AI-generated try-on result</p>
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 bg-muted rounded-lg mx-auto flex items-center justify-center">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">
                        Upload a photo and select a product to see the AI-generated result
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              This is a conceptual AI feature. Results are for demonstration purposes only.
            </p>
          </div>
        </div>
      </main>

      {/* SOON Overlay */}
      <div className="fixed inset-0 w-screen h-screen bg-black/50 z-50 flex items-center justify-center">
        <h2 className="text-9xl font-bold text-white -rotate-12">SOON!</h2>
      </div>
    </div>
  )
}