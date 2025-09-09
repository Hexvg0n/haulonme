"use client"

import { useState } from "react"
import { Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-4 max-w-7xl mx-auto">
          {/* Hamburger Menu */}
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="hover:bg-accent/10">
            <Menu className="h-6 w-6" />
          </Button>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="text-3xl font-cursive text-primary animate-spin-3d">
              HaulOnMe.net
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
        </div>
      </header>

      {/* Slide-in Navigation Menu */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 z-40 animate-fade-in" onClick={toggleMenu} />

          {/* Menu Panel */}
          <nav className="fixed top-0 left-0 h-full w-80 bg-background border-r border-border z-50 animate-slide-in-left">
            <div className="p-6">
              {/* Close Button */}
              <div className="flex justify-end mb-8">
                <Button variant="ghost" size="icon" onClick={toggleMenu} className="hover:bg-accent/10">
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-6">
                 <a href="/" className="block text-lg text-primary hover:text-accent transition-colors">
                  Collection
                </a>
                <a href="/where-to-buy" className="block text-lg text-primary hover:text-accent transition-colors">
                  Where to buy
                </a>

                <a href="/try-on" className="block text-lg text-primary hover:text-accent transition-colors">
                  Try on my
                </a>

                <a href="/contact" className="block text-lg text-primary hover:text-accent transition-colors">
                  Contact
                </a>

                <a href="/photo-request" className="block text-lg text-primary hover:text-accent transition-colors">
                  Photo Request
                </a>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  )
}