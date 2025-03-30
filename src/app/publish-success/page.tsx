"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Check, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function PublishSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const url = searchParams.get("url")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!url) {
      router.push("/")
    }
  }, [url, router])

  const copyToClipboard = () => {
    if (!url) return

    const fullUrl = `${window.location.origin}${url}`
    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        setCopied(true)
        toast.success("URL copied to clipboard")
        setTimeout(() => setCopied(false), 2000)
      })
      .catch((err) => {
        console.error("Failed to copy:", err)
        toast.error("Failed to copy URL")
      })
  }

  const visitPortfolio = () => {
    if (!url) return
    window.open(url, "_blank")
  }

  if (!url) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-8 bg-card rounded-lg shadow-lg">
        <div className="mb-6 flex justify-center">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">Successfully Published!</h1>
        <p className="text-center text-muted-foreground mb-6">
          Your portfolio has been published and is now available at the URL below.
        </p>

        <div className="bg-muted p-4 rounded-md mb-6">
          <div className="flex items-center justify-between">
            <code className="text-sm break-all">{`${window.location.origin}${url}`}</code>
            <Button variant="ghost" size="icon" onClick={copyToClipboard} className="ml-2 flex-shrink-0">
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <Button onClick={visitPortfolio} className="w-full">
            Visit Your Portfolio
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={() => router.push("/customize")} className="w-full">
            Back to Editor
          </Button>
        </div>
      </div>
    </div>
  )
}

