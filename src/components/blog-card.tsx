"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface Blog {
  id: number
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  imageUrl: string
}

export default function BlogCard({ blog }: { blog: Blog }) {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <Card className={`transition-all duration-300 ${expanded ? "col-span-full" : ""}`}>
      <CardHeader>
        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-t-lg">
          <Image src={blog.imageUrl || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
        </div>
        <CardTitle className="text-xl">{blog.title}</CardTitle>
        <CardDescription>
          {blog.date} • {blog.author}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {expanded ? (
          <div className="prose max-w-none">
            {blog.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("```")) {
                const codeContent = paragraph.split("\n").slice(1, -1).join("\n")
                // const language = paragraph.split("\n")[0].replace("```", "")
                return (
                  <pre key={index} className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{codeContent}</code>
                  </pre>
                )
              }
              return <p key={index}>{paragraph}</p>
            })}
          </div>
        ) : (
          <p>{blog.excerpt}</p>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="ghost" onClick={toggleExpanded} className="flex items-center gap-2">
          {expanded ? (
            <>
              <span>Read Less</span>
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              <span>Read More</span>
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

