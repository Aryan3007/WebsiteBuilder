"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PortfolioPage() {
  const params = useParams()
  const subdomain = params.subdomain as string
  const [portfolioHTML, setPortfolioHTML] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // In a real app, this would be an API call to fetch the HTML from a database
    // For demo purposes, we're using localStorage
    try {
      const html = localStorage.getItem(`portfolioHTML`)
      if (html) {
        setPortfolioHTML(html)
      } else {
        setError("Portfolio not found")
      }
    } catch (err) {
      console.error("Error loading portfolio:", err)
      setError("Failed to load portfolio")
    } finally {
      setLoading(false)
    }
  }, [subdomain])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
        <span className="ml-2">Loading portfolio...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Link href="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="bg-background p-4 border-b flex items-center">
        <Link href="/customize">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Editor
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-lg font-medium">
            Portfolio: <span className="text-primary">{subdomain}</span>
          </h1>
          <p className="text-sm text-muted-foreground">Published at: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <iframe
          srcDoc={portfolioHTML}
          title={`${subdomain}'s Portfolio`}
          className="w-full min-h-[calc(100vh-10rem)] border rounded-lg"
          sandbox="allow-same-origin allow-scripts"
        />
      </div>
    </div>
  )
}

