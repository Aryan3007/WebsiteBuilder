"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, User, Calendar } from "lucide-react"

interface Design {
  id: number
  title: string
  componentType: string
  creator: string
  date: string
  imageUrl: string
  excerpt: string
  content: string
  tags: string[]
}

export default function DesignCard({ design }: { design: Design }) {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <Card className={`transition-all duration-300 ${expanded ? "md:col-span-2" : ""}`}>
      <div className="relative w-full h-64 overflow-hidden rounded-t-lg">
        <Image src={design.imageUrl || "/placeholder.svg"} alt={design.title} fill className="object-cover" />
        {/* <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="font-medium">
            {design.componentType}
          </Badge>
        </div> */}
      </div>

      <CardHeader>
        <CardTitle className="text-xl">{design.title}</CardTitle>
        <CardDescription className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" /> {design.creator}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {design.date}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        {expanded ? (
          <div className="space-y-4">
            <div className="prose max-w-none">
              {design.content.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {design.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">{design.excerpt}</p>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={toggleExpanded} className="flex items-center gap-2">
          {expanded ? (
            <>
              <span>Show Less</span>
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              <span>Show More</span>
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

