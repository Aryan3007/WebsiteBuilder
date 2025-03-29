"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  BrainCircuit,
  Code,
  CopyCheck,
  Fingerprint,
  Layers,
  MessageSquareHeart,
  Paintbrush,
  Rocket,
  Search
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "AI Design Generation",
    description: "Our AI analyzes your content and style preferences to generate stunning, personalized portfolio designs.",
    icon: BrainCircuit,
    color: "from-violet-500 to-indigo-600"
  },
  {
    title: "Smart Content Organization",
    description: "AI-powered content organization that highlights your best work and achievements.",
    icon: Layers,
    color: "from-indigo-600 to-blue-500"
  },
  {
    title: "SEO Optimization",
    description: "Built-in SEO optimization to ensure your portfolio ranks high in search results.",
    icon: Search,
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "Responsive Layouts",
    description: "Every portfolio is fully responsive and looks great on all devices, from smartphones to large desktop monitors.",
    icon: CopyCheck,
    color: "from-cyan-400 to-teal-500"
  },
  {
    title: "Custom Theming",
    description: "Choose from pre-built themes or create your own custom design with our theme editor.",
    icon: Paintbrush,
    color: "from-teal-500 to-emerald-500"
  },
  {
    title: "Code Export",
    description: "Export your entire portfolio as clean, optimized code that you can host anywhere.",
    icon: Code,
    color: "from-emerald-500 to-lime-400"
  },
  {
    title: "AI Content Suggestions",
    description: "Get AI-powered content suggestions to highlight your skills and experience effectively.",
    icon: MessageSquareHeart,
    color: "from-lime-400 to-yellow-500"
  },
  {
    title: "Bio Generator",
    description: "Generate professional bios that highlight your unique skills and personality.",
    icon: Fingerprint,
    color: "from-yellow-500 to-orange-500"
  },
  {
    title: "One-Click Deployment",
    description: "Deploy your portfolio with one click to our lightning-fast hosting or export to your preferred platform.",
    icon: Rocket,
    color: "from-orange-500 to-red-500"
  },
]

export function FeaturesSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <section
      id="features"
      className="relative bg-background py-20"
      ref={containerRef}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[300px] left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-500/10 to-indigo-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="relative mb-4 inline-block rounded-full bg-muted px-4 py-1.5 text-sm font-medium"
          >
            <span className="bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">Powered by AI</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Advanced <span className="bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">AI-powered</span> features
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16 max-w-2xl text-center text-muted-foreground"
          >
            Our AI portfolio builder comes packed with innovative features designed to make your portfolio stand out.
            Create a professional-quality portfolio in minutes, not days.
          </motion.p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 3) }}
                className="group"
              >
                <Card className="h-full overflow-hidden border-border/40 transition-all duration-300 hover:shadow-lg dark:hover:shadow-indigo-800/5">
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex items-center gap-2">
                      <div className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br",
                        feature.color
                      )}>
                        <feature.icon className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
