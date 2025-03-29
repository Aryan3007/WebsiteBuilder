"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check, FileText, Palette, Rocket } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const steps = [
  {
    id: "step1",
    title: "Add your information",
    icon: FileText,
    description: "Start by entering your basic information, uploading your projects, and connecting your social media profiles.",
    content: (
      <div className="rounded-lg border bg-card p-0.5">
        <div className="h-full w-full overflow-hidden rounded-[7px] bg-gradient-to-br from-violet-50 to-indigo-50 p-8 dark:from-violet-950/20 dark:to-indigo-950/20">
          <div className="space-y-6">
            <div className="h-8 w-48 rounded-md bg-muted" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-12 rounded-md bg-muted" />
              <div className="h-12 rounded-md bg-muted" />
            </div>
            <div className="h-32 rounded-md bg-muted" />
            <div className="h-48 rounded-md bg-muted" />
            <div className="flex justify-end">
              <div className="h-10 w-24 rounded-md bg-primary" />
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "step2",
    title: "Choose your style",
    icon: Palette,
    description: "Select from AI-generated design suggestions or customize every aspect of your portfolio's appearance.",
    content: (
      <div className="rounded-lg border bg-card p-0.5">
        <div className="h-full w-full overflow-hidden rounded-[7px] bg-gradient-to-br from-violet-50 to-indigo-50 p-8 dark:from-violet-950/20 dark:to-indigo-950/20">
          <div className="grid gap-6">
            <div className="h-8 w-48 rounded-md bg-muted" />
            <div className="grid grid-cols-3 gap-4">
              <div className="group cursor-pointer overflow-hidden rounded-md border border-border bg-background p-1 transition-all hover:border-violet-500/50">
                <div className="h-24 rounded bg-gradient-to-br from-violet-500/20 to-indigo-600/20" />
                <div className="mt-2 h-4 w-16 rounded bg-muted" />
              </div>
              <div className="group cursor-pointer overflow-hidden rounded-md border border-border bg-background p-1 transition-all hover:border-violet-500/50">
                <div className="h-24 rounded bg-gradient-to-br from-blue-500/20 to-cyan-500/20" />
                <div className="mt-2 h-4 w-16 rounded bg-muted" />
              </div>
              <div className="group cursor-pointer overflow-hidden rounded-md border border-border bg-background p-1 transition-all hover:border-violet-500/50">
                <div className="h-24 rounded bg-gradient-to-br from-amber-500/20 to-orange-500/20" />
                <div className="mt-2 h-4 w-16 rounded bg-muted" />
              </div>
            </div>
            <div className="h-32 rounded-md bg-muted" />
            <div className="flex justify-end">
              <div className="h-10 w-24 rounded-md bg-primary" />
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "step3",
    title: "Review and deploy",
    icon: Rocket,
    description: "Preview your portfolio, make final adjustments, and deploy it to your custom domain with a single click.",
    content: (
      <div className="rounded-lg border bg-card p-0.5">
        <div className="h-full w-full overflow-hidden rounded-[7px] bg-gradient-to-br from-violet-50 to-indigo-50 p-8 dark:from-violet-950/20 dark:to-indigo-950/20">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="h-8 w-48 rounded-md bg-muted" />
              <div className="h-10 w-10 rounded-md bg-muted" />
            </div>
            <div className="h-64 overflow-hidden rounded-md bg-gradient-to-br from-muted to-muted/80">
              <div className="h-6 rounded-t bg-muted/80" />
              <div className="grid grid-cols-4 gap-2 p-4">
                <div className="col-span-1 h-20 rounded bg-gradient-to-br from-violet-500/10 to-indigo-600/10" />
                <div className="col-span-3 h-20 rounded bg-background" />
                <div className="col-span-4 h-24 rounded bg-background" />
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-md bg-muted/50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="h-4 w-full rounded bg-muted" />
                <div className="mt-1 h-3 w-2/3 rounded bg-muted" />
              </div>
            </div>
            <div className="flex justify-end">
              <div className="h-10 w-36 rounded-md bg-gradient-to-r from-violet-500 to-indigo-600" />
            </div>
          </div>
        </div>
      </div>
    )
  }
]

export function HowItWorks() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <section
      id="how-it-works"
      className="relative bg-background py-20"
      ref={containerRef}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-[300px] right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-violet-500/10 to-indigo-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-4 w-fit rounded-full bg-muted px-4 py-1.5 text-sm font-medium"
        >
          <span className="bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">Simple process</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
        >
          How it works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mb-16 max-w-2xl text-center text-muted-foreground"
        >
          Creating your professional portfolio is quick and easy with our AI-powered platform.
          Just follow these simple steps to get started.
        </motion.p>

        <Tabs defaultValue="step1" className="mx-auto max-w-4xl">
          <TabsList className="mb-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              >
                <TabsTrigger
                  value={step.id}
                  className="flex w-full flex-col gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500/20 data-[state=active]:to-indigo-600/20 data-[state=active]:shadow-[inset_0_0_0_1px_rgba(138,61,255,0.2)]"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 text-xs font-medium text-white">
                      {index + 1}
                    </span>
                    <span className="font-medium">{step.title}</span>
                  </div>
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>

          {steps.map((step, index) => (
            <TabsContent key={step.id} value={step.id} className="mt-0">
              <div className="grid gap-8 lg:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex flex-col justify-center"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-indigo-600">
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>

                  {/* Process steps */}
                  <div className="mt-8 space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: 0.6 + (i * 0.1) }}
                        className="flex items-start gap-3"
                      >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20">
                          <Check className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <p className="text-sm">
                          {index === 0 ? [
                            "Enter your basic personal information",
                            "Upload your projects and achievements",
                            "Connect your social media profiles"
                          ][i] : index === 1 ? [
                            "Choose from AI-generated theme suggestions",
                            "Customize colors, fonts, and layout",
                            "Preview different style variations"
                          ][i] : [
                            "Preview your complete portfolio",
                            "Make final adjustments and refinements",
                            "Deploy to your custom domain with one click"
                          ][i]}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {step.content}
                </motion.div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
