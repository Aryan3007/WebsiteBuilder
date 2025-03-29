"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, FileText, Upload, Zap, Check, Copy, Download } from 'lucide-react'
import * as pdfjsLib from 'pdfjs-dist'

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
}

export default function ResumeExtractor() {
  const [text, setText] = useState('')
  const [fileName, setFileName] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [isExtracting, setIsExtracting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Set up PDF.js worker
  const setupPdfWorker = async () => {
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
      // In a real app, you'd use a proper worker URL
      // This is a workaround for the demo
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
    }
  }
  
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    setFileName(file.name)
    setIsUploading(true)
    setIsComplete(false)
    setText('')
    
    try {
      await setupPdfWorker()
      
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      
      reader.onload = async (e) => {
        setIsUploading(false)
        setIsExtracting(true)
        
        try {
          const pdfData = new Uint8Array(e.target?.result as ArrayBuffer)
          const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise
          let extractedText = ''
          
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i)
            const textContent = await page.getTextContent()
            const pageText = textContent.items.map((item: any) => item.str).join(' ')
            extractedText += pageText + '\n'
          }
          
          setText(extractedText)
          setIsExtracting(false)
          setIsComplete(true)
        } catch (error) {
          console.error('Error extracting text:', error)
          setIsExtracting(false)
        }
      }
      
      reader.onerror = (error) => {
        console.error('Error reading file:', error)
        setIsUploading(false)
      }
    } catch (error) {
      console.error('Error setting up PDF.js:', error)
      setIsUploading(false)
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
      if (file.type === 'application/pdf') {
        // Create a new event with the file
        const event = {
          target: {
            files: [file]
          }
        } as unknown as React.ChangeEvent<HTMLInputElement>
        
        handleFileUpload(event)
      }
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
    const element = document.createElement('a')
    const file = new Blob([text], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = `${fileName.replace('.pdf', '')}_extracted.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
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
        <motion.div
          className="flex flex-1 flex-col"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="mx-auto mb-6 rounded-full border border-border bg-background/80 px-4 py-1.5 backdrop-blur"
          >
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <span className="text-muted-foreground">AI-powered resume extraction</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/20">
                <Zap className="h-3 w-3 text-violet-500" />
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 text-center text-4xl font-extrabold tracking-tight md:text-5xl"
          >
            <span>Extract text from your</span>
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
                resume or CV
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 right-0 z-0 h-3 rounded-sm bg-gradient-to-r from-violet-500/40 to-indigo-600/40"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  delay: 1,
                  duration: 0.8,
                  ease: "easeInOut"
                }}
              />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-8 max-w-2xl text-center text-xl text-muted-foreground"
          >
            Upload your resume in PDF format and our AI will extract all the text content,
            making it easy to copy, edit, or analyze your professional information.
          </motion.p>

          {/* Main content */}
          <motion.div 
            variants={itemVariants}
            className="mx-auto mb-8 w-full max-w-5xl flex-1"
          >
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="mx-auto mb-8 grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="upload">Upload Resume</TabsTrigger>
                <TabsTrigger value="extracted">Extracted Text</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="mt-0">
                <div 
                  className={`relative flex h-[400px] flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all ${isComplete ? 'border-green-500/50 bg-green-500/5' : 'border-border bg-background/50'}`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
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
                      <p className="text-lg font-medium">Extracting text...</p>
                      <p className="mt-2 text-sm text-muted-foreground">This may take a moment for larger files</p>
                    </div>
                  ) : isComplete ? (
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                        <Check className="h-8 w-8 text-green-500" />
                      </div>
                      <p className="text-lg font-medium">Text extracted successfully!</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {fileName} • {text.length} characters extracted
                      </p>
                      <div className="mt-6 flex gap-4">
                        <Button
                          variant="outline"
                          onClick={triggerFileInput}
                          className="flex items-center gap-2"
                        >
                          <Upload className="h-4 w-4" />
                          Upload another file
                        </Button>
                        <Button
                          onClick={() => document.querySelector('[data-value="extracted"]')?.click()}
                          className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-indigo-600 text-white"
                        >
                          View extracted text
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/20">
                        <FileText className="h-8 w-8 text-violet-500" />
                      </div>
                      <p className="text-lg font-medium">Drag & drop your resume here</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        or click the button below to browse files
                      </p>
                      <Button
                        onClick={triggerFileInput}
                        className="mt-6 flex items-center gap-2 bg-gradient-to-r from-violet-500 to-indigo-600 text-white"
                      >
                        <Upload className="h-4 w-4" />
                        Upload PDF
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
                    <h3 className="mb-1 font-medium">Fast Processing</h3>
                    <p className="text-sm text-muted-foreground">
                      Extract text from your resume in seconds with our optimized engine.
                    </p>
                  </div>
                  
                  <div className="rounded-lg border bg-card p-4">
                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/20">
                      <FileText className="h-4 w-4 text-violet-500" />
                    </div>
                    <h3 className="mb-1 font-medium">Accurate Extraction</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI ensures all text content is properly extracted and formatted.
                    </p>
                  </div>
                  
                  <div className="rounded-lg border bg-card p-4">
                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/20">
                      <Download className="h-4 w-4 text-violet-500" />
                    </div>
                    <h3 className="mb-1 font-medium">Easy Export</h3>
                    <p className="text-sm text-muted-foreground">
                      Copy or download the extracted text for use in other applications.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="extracted" className="mt-0">
                <div className="rounded-xl border bg-card p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-violet-500" />
                      <h3 className="font-medium">Extracted Text</h3>
                      {fileName && (
                        <span className="text-sm text-muted-foreground">
                          from {fileName}
                        </span>
                      )}
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
                        {copied ? 'Copied' : 'Copy'}
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
                      <Textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="min-h-[400px] resize-none font-mono text-sm"
                      />
                    ) : (
                      <div className="flex h-[400px] flex-col items-center justify-center p-4 text-center">
                        <FileText className="mb-2 h-8 w-8 text-muted-foreground/50" />
                        <p className="text-muted-foreground">
                          Upload a resume to see extracted text here
                        </p>
                        <Button
                          variant="link"
                          onClick={() => document.querySelector('[data-value="upload"]')?.click()}
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
          <motion.div
            variants={itemVariants}
            className="mt-auto text-center text-sm text-muted-foreground"
          >
            <p>
              Your files are processed securely and never stored on our servers.
              <br />
              All text extraction happens directly in your browser.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
