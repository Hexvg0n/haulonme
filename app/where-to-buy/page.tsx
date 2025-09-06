import { Header } from "@/components/header"

export default function WhereToBuyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">How to Order Your Items</h1>
            <p className="text-muted-foreground text-lg">
              Watch our comprehensive tutorial to learn how to purchase your favorite items
            </p>
          </div>

          {/* YouTube Video Embed */}
          <div className="relative w-full max-w-4xl mx-auto">
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="How to Order Your Items"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Need help? Feel free to{" "}
              <a href="/contact" className="text-accent hover:underline">
                contact us
              </a>{" "}
              for personalized assistance.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
