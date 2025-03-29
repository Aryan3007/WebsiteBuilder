"use client"

import { useEffect, useState } from "react"
// Import PDF.js in a way that works with Next.js
import * as pdfjsLib from "pdfjs-dist";

// Set the worker source to a CDN version
const pdfjsVersion = "3.11.174" // Use a specific version
const workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`

interface PDFExtractorProps {
  pdfData: ArrayBuffer
  onExtracted: (text: string) => void
  onError: (error: string) => void
}

export default function PDFExtractor({ pdfData, onExtracted, onError }: PDFExtractorProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Initialize PDF.js worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc

    const extractText = async () => {
      try {
        // Load the PDF document
        const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(pdfData) })

        // Get the PDF document
        const pdf = await loadingTask.promise
        const numPages = pdf.numPages
        let extractedText = ""

        // Extract text from each page
        for (let i = 1; i <= numPages; i++) {
          // Update progress
          setProgress(Math.floor((i / numPages) * 100))

          // Get the page
          const page = await pdf.getPage(i)

          // Extract text content
          const textContent = await page.getTextContent()

          // Join the text items
          const pageText = textContent.items
            .filter((item: any): item is { str: string } => "str" in item && typeof item.str === "string")
            .map((item: { str: string }) => item.str)
            .join(" ")

          extractedText += pageText + "\n\n"
        }

        // Call the onExtracted callback with the extracted text
        onExtracted(extractedText)
      } catch (error) {
        console.error("Error extracting PDF text:", error)
        onError("Failed to extract text from PDF. Please try another file.")
      }
    }

    extractText()
  }, [pdfData, onExtracted, onError])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4 h-16 w-16 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin" />
      <p className="text-lg font-medium">Extracting PDF content...</p>
      <div className="mt-4 w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-500 transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{progress}% complete</p>
    </div>
  )
}

