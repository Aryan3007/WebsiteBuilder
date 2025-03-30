"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  FileText,
  Upload,
  Zap,
  Check,
  Copy,
  Download,
  Sparkles,
  AlertCircle,
  FileIcon as FileWord,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { generatePortfolio } from "@/actions/generate-portfolio"
import { toast } from "sonner"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
}

// Define a global type for the PDF.js library
declare global {
  interface Window {
    pdfjsLib: any
  }
}

export default function ResumeExtractor() {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("")
  const [fileType, setFileType] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isExtracting, setIsExtracting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pdfJsLoaded, setPdfJsLoaded] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
const router  = useRouter()
  useEffect(() => {
    const loadPdfJs = async () => {
      try {
        // First, try to load the main library
        const pdfJsScript = document.createElement("script")
        pdfJsScript.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
        pdfJsScript.async = true

        // Create a promise that resolves when the script loads
        const pdfJsLoaded = new Promise<void>((resolve, reject) => {
          pdfJsScript.onload = () => resolve()
          pdfJsScript.onerror = () => reject(new Error("Failed to load PDF.js library"))
        })

        // Add the script to the document
        document.head.appendChild(pdfJsScript)

        // Wait for the script to load
        await pdfJsLoaded

        // Set the worker source
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"
          setPdfJsLoaded(true)
          console.log("PDF.js library loaded successfully")
        }
      } catch (error) {
        console.error("Error loading PDF.js:", error)
        setError("Failed to load PDF processing library. Please refresh the page and try again.")
      }
    }

    loadPdfJs()
  }, [])

  const detectFileType = (file: File): string => {
    const extension = file.name.split(".").pop()?.toLowerCase() || ""

    if (file.type === "application/pdf" || extension === "pdf") {
      return "pdf"
    } else if (
      file.type === "application/msword" ||
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      extension === "doc" ||
      extension === "docx"
    ) {
      return "word"
    } else if (file.type === "text/plain" || extension === "txt") {
      return "text"
    } else {
      return "unknown"
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setIsUploading(true)
    setIsComplete(false)
    setError(null)
    setText("")

    try {
      const detectedType = detectFileType(file)
      setFileType(detectedType)

      if (detectedType === "pdf") {
        // For PDF files, check if PDF.js is loaded
        if (!pdfJsLoaded) {
          setIsUploading(false)
          setError(
            "PDF processing library is still initializing. Please wait a moment and try again, or refresh the page if this persists.",
          )
          return
        }

        const reader = new FileReader()
        reader.readAsArrayBuffer(file)

        reader.onload = async (e) => {
          setIsUploading(false)
          setIsExtracting(true)

          try {
            const result = e.target?.result
            if (!result || !(result instanceof ArrayBuffer)) {
              throw new Error("Invalid file data")
            }

            const pdfData = new Uint8Array(result)

            // Load the PDF document
            const loadingTask = window.pdfjsLib.getDocument({ data: pdfData })

            try {
              const pdf = await loadingTask.promise
              const numPages = pdf.numPages
              let extractedText = ""

              // Extract text from each page
              for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i)
                const textContent = await page.getTextContent()
                const pageText = textContent.items.map((item: { str: string }) => item.str).join(" ")
                extractedText += pageText + "\n\n"
              }

              if (extractedText.trim().length === 0) {
                setError("No readable text found in this PDF. It may be scanned or contain only images.")
                setIsExtracting(false)
                return
              }

              setText(extractedText)
              console.log("Extracted resume text:", extractedText)
              setIsExtracting(false)
              setIsComplete(true)
            } catch (error) {
              console.error("Error parsing PDF:", error)
              setError("This file appears to be corrupted or not a valid PDF. Please try another file.")
              setIsExtracting(false)
            }
          } catch (error) {
            console.error("Error extracting PDF text:", error)
            setError("Failed to extract text from PDF. Please try another file.")
            setIsExtracting(false)
          }
        }

        reader.onerror = (error) => {
          console.error("Error reading file:", error)
          setIsUploading(false)
          setError("Failed to read the file. Please try again.")
        }
      } else if (detectedType === "word") {
        setIsUploading(false)
        setError(
          "Word documents (.doc, .docx) cannot be processed directly in the browser. Please convert to PDF or plain text first.",
        )
      } else if (detectedType === "text") {
        // For text files, use simple text extraction
        const reader = new FileReader()
        reader.readAsText(file)

        reader.onload = (e) => {
          setIsUploading(false)
          setIsExtracting(true)

          try {
            const content = e.target?.result as string
            setText(content)
            console.log("Extracted resume text:", content)

            setIsExtracting(false)
            setIsComplete(true)
          } catch (error) {
            console.error("Error extracting text:", error)
            setIsExtracting(false)
            setError("Failed to extract text. Please try another file format.")
          }
        }

        reader.onerror = (error) => {
          console.error("Error reading file:", error)
          setIsUploading(false)
          setError("Failed to read the file. Please try again.")
        }
      } else {
        setIsUploading(false)
        setError(`Unsupported file type. Please upload a PDF or text file.`)
      }
    } catch (error) {
      console.error("Error processing file:", error)
      setIsUploading(false)
      setError("Failed to process the file. Please try again.")
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      // Accept any file type
      const event = {
        target: {
          files: [file],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>

      handleFileUpload(event)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadText = () => {
    const element = document.createElement("a")
    const file = new Blob([text], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${fileName.replace(/\.[^/.]+$/, "")}_extracted.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

const handleGeneratePortfolio = async () => {
  try {
    setLoading(true)
    const res = await generatePortfolio(text);
    console.log("response", res);

    if(res.success) {
      setLoading(false)
      toast.success("Portfolio Generated Successfully")
      localStorage.setItem("portfolioHTML", res.portfolio); // Store in localStorage
      router.push("/customize"); // Navigate to portfolio page
    }
    else{
      toast.error("failed to genrate")
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Load PDF.js from CDN */}
      {/* Remove this Script component
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
        onLoad={() => setPdfJsLoaded(true)}
        strategy="beforeInteractive"
      />
      */}

      {!pdfJsLoaded && (
        <div className="mb-4 w-full">
          <Alert variant="default" className="mb-4">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
              <AlertTitle>Loading PDF processor...</AlertTitle>
            </div>
            <AlertDescription>Please wait while we initialize the PDF processing library.</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Gradient background effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-[300px] -top-[300px] h-[600px] w-[600px] rounded-full bg-gradient-to-r from-violet-500/20 to-transparent blur-3xl" />
        <div className="absolute -bottom-[300px] -right-[300px] h-[600px] w-[600px] rounded-full bg-gradient-to-r from-indigo-500/20 to-transparent blur-3xl" />
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto flex min-h-screen flex-col px-4 py-12 sm:px-6">
        <motion.div className="flex flex-1 flex-col" variants={containerVariants} initial="hidden" animate="visible">
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="mx-auto mb-6 rounded-full border border-border bg-background/80 px-4 py-1.5 backdrop-blur"
          >
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <span className="text-muted-foreground">AI-powered portfolio generator</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/20">
                <Sparkles className="h-3 w-3 text-violet-500" />
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 text-center text-4xl font-extrabold tracking-tight md:text-5xl"
          >
            <span>Create your professional</span>
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
                portfolio website
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 right-0 z-0 h-3 rounded-sm bg-gradient-to-r from-violet-500/40 to-indigo-600/40"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  delay: 1,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
              />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-8 max-w-2xl text-center text-xl text-muted-foreground"
          >
            Upload your resume and our AI will automatically generate a stunning portfolio website showcasing your
            skills, experience, and achievements.
          </motion.p>

          {/* Main content */}
          <motion.div variants={itemVariants} className="mx-auto mb-8 w-full max-w-5xl flex-1">
            <Tabs defaultValue="upload" className="w-full">
              {/* <TabsList className="mx-auto mb-8 grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="upload">Upload Resume</TabsTrigger>
                <TabsTrigger value="extracted">Extracted Info</TabsTrigger>
              </TabsList> */}

              <TabsContent value="upload" className="mt-0">
                <div
                  className={`relative flex h-[400px] flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all ${isComplete ? "border-green-500/50 bg-green-500/5" : error ? "border-red-500/50 bg-red-500/5" : "border-border bg-background/50"}`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".txt,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {isUploading ? (
                    <div className="flex flex-col items-center justify-center">
                      <div className="mb-4 h-16 w-16 rounded-full border-4 border-violet-500/30 border-t-violet-500 animate-spin" />
                      <p className="text-lg font-medium">Uploading file...</p>
                    </div>
                  ) : isExtracting ? (
                    <div className="flex flex-col items-center justify-center">
                      <div className="mb-4 h-16 w-16 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin" />
                      <p className="text-lg font-medium">Extracting information...</p>
                      <p className="mt-2 text-sm text-muted-foreground">This may take a moment for larger files</p>
                    </div>
                  ) : error ? (
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
                        {fileType === "word" ? (
                          <FileWord className="h-8 w-8 text-red-500" />
                        ) : (
                          <AlertCircle className="h-8 w-8 text-red-500" />
                        )}
                      </div>
                      <p className="text-lg font-medium text-red-500">Error</p>
                      <p className="mt-2 text-sm text-muted-foreground max-w-md">{error}</p>
                      <Button variant="outline" onClick={triggerFileInput} className="mt-6 flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Try another file
                      </Button>
                    </div>
                  ) : isComplete ? (
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                        <Check className="h-8 w-8 text-green-500" />
                      </div>
                      <p className="text-lg font-medium">Resume information extracted!</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {fileName} • {text.length} characters extracted
                      </p>
                      <div className="mt-6 flex flex-col gap-4">
                        <Button
                          onClick={handleGeneratePortfolio}
                          className={`flex items-center gap-2 bg-gradient-to-r from-violet-500 to-indigo-600 text-white ${
                          loading ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          disabled={loading}
                        >
                          {loading ? (
                          <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          ) : (
                          <Sparkles className="h-4 w-4" />
                          )}
                          {loading ? "Generating..." : "Generate My Portfolio"}
                        </Button>
                        <div className="flex gap-4">
                          <Button variant="outline" onClick={triggerFileInput} className="flex items-center gap-2">
                            <Upload className="h-4 w-4" />
                            Upload another file
                          </Button>
                          <Button
                            onClick={() => {
                              const extractedTab = document.querySelector('[data-value="extracted"]') as HTMLElement | null;
                              extractedTab?.click();
                            }}
                            className="flex items-center gap-2"
                            variant="outline"
                          >
                            View extracted info
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/20">
                        <FileText className="h-8 w-8 text-violet-500" />
                      </div>
                      <p className="text-lg font-medium">Drag & drop your resume here</p>
                      <p className="mt-2 text-sm text-muted-foreground">or click the button below to browse files</p>
                      <p className="mt-1 text-xs text-muted-foreground">Supported formats: PDF, TXT</p>
                      <Alert variant="default" className="mt-4 max-w-md">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Important Note</AlertTitle>
                        <AlertDescription>
                          Word documents (.doc, .docx) need to be converted to PDF or TXT before uploading.
                        </AlertDescription>
                      </Alert>
                      <Button
                        onClick={triggerFileInput}
                        className="mt-6 flex items-center gap-2 bg-gradient-to-r from-violet-500 to-indigo-600 text-white"
                      >
                        <Upload className="h-4 w-4" />
                        Upload Resume
                      </Button>
                    </div>
                  )}
                </div>

                {/* Features list */}
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-lg border bg-card p-4">
                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/20">
                      <Zap className="h-4 w-4 text-violet-500" />
                    </div>
                    <h3 className="mb-1 font-medium">Instant Portfolio</h3>
                    <p className="text-sm text-muted-foreground">
                      Transform your resume into a professional portfolio website in minutes.
                    </p>
                  </div>

                  <div className="rounded-lg border bg-card p-4">
                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/20">
                      <Sparkles className="h-4 w-4 text-violet-500" />
                    </div>
                    <h3 className="mb-1 font-medium">AI-Powered Design</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI creates a custom design that highlights your unique skills and experience.
                    </p>
                  </div>

                  <div className="rounded-lg border bg-card p-4">
                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/20">
                      <Download className="h-4 w-4 text-violet-500" />
                    </div>
                    <h3 className="mb-1 font-medium">Easy Deployment</h3>
                    <p className="text-sm text-muted-foreground">
                      Deploy your portfolio with one click and share it with potential employers.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="extracted" className="mt-0">
                <div className="rounded-xl border bg-card p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-violet-500" />
                      <h3 className="font-medium">Extracted Information</h3>
                      {fileName && <span className="text-sm text-muted-foreground">from {fileName}</span>}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                        disabled={!text}
                        className="flex items-center gap-1.5"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? "Copied" : "Copy"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadText}
                        disabled={!text}
                        className="flex items-center gap-1.5"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="relative min-h-[400px] rounded-lg border bg-background/50">
                    {text ? (
                      <>
                        <Textarea
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          className="min-h-[400px] resize-none font-mono text-sm"
                        />
                        {isComplete && (
                          <div className="mt-4 flex justify-center">
                            <Button
                              onClick={handleGeneratePortfolio}
                              className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-indigo-600 text-white"
                            >
                              <Sparkles className="h-4 w-4" />
                              Generate My Portfolio
                            </Button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex h-[400px] flex-col items-center justify-center p-4 text-center">
                        <FileText className="mb-2 h-8 w-8 text-muted-foreground/50" />
                        <p className="text-muted-foreground">Upload a resume to see extracted information here</p>
                        <Button
                          variant="link"
                          onClick={() => {
                            const uploadTab = document.querySelector('[data-value="upload"]') as HTMLElement | null;
                            uploadTab?.click();
                          }}
                          className="mt-2"
                        >
                          Go to upload
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Footer */}
          <motion.div variants={itemVariants} className="mt-auto text-center text-sm text-muted-foreground">
            <p>
              Your resume is processed securely and never stored on our servers.
              <br />
              All information extraction happens directly in your browser.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

