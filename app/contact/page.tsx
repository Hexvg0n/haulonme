import { Mail, Instagram } from "lucide-react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Get in Touch</h1>
            <p className="text-muted-foreground text-lg">
              Have questions about our products or need assistance? We're here to help!
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Email Contact */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>Email Us</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">Send us an email for any inquiries or support</p>
                <a
                  href="mailto:contact@haulonme.net"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
                >
                  <Mail className="h-4 w-4" />
                  contact@haulonme.net
                </a>
              </CardContent>
            </Card>

            {/* Instagram Contact */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Instagram className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>Follow Us</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">Stay updated with our latest finds and fashion tips</p>
                <a
                  href="https://instagram.com/haulonme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
                >
                  <Instagram className="h-4 w-4" />
                  @haulonme
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <div className="mt-16 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We typically respond to emails within 24-48 hours during business days. For urgent matters, feel free
                  to reach out via Instagram DM for faster response.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
