"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ChevronRight, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CtaSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <section
      className="relative overflow-hidden bg-background py-20"
      ref={containerRef}
    >
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-violet-500/10 to-indigo-600/10 blur-3xl" />

        {/* Animated floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-violet-500/30"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-indigo-500/30"
            style={{
              top: `${25 + i * 15}%`,
              right: `${15 + i * 15}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 2 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            className="mb-6 inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1.5 backdrop-blur">
              <Sparkles className="h-4 w-4 text-violet-500" />
              <span className="text-sm font-medium">Ready to get started?</span>
            </div>
          </motion.div>

          <motion.h2
            className="mb-6 text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Build your professional portfolio{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
                in minutes
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 right-0 z-0 h-3 rounded-sm bg-gradient-to-r from-violet-500/40 to-indigo-600/40"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </span>
          </motion.h2>

          <motion.p
            className="mb-10 text-center text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join thousands of professionals who have transformed their online presence with our AI-powered portfolio builder.
          </motion.p>

          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/signup">
              <Button
                size="lg"
                className="relative group w-full overflow-hidden bg-gradient-to-r from-violet-500 to-indigo-600 text-white transition-all hover:shadow-lg hover:shadow-violet-500/25 sm:w-auto"
              >
                <span className="flex items-center gap-2">
                  Get started for free
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-30"
                  animate={{
                    background: [
                      "radial-gradient(circle at 50% 100%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
                      "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
                      "radial-gradient(circle at 50% 100%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button
                size="lg"
                variant="outline"
                className="w-full hover:bg-muted/50 sm:w-auto"
              >
                <span className="text-center">Learn more</span>
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="mt-12 flex flex-col items-center justify-center space-y-2 text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-1">
              <svg className="h-4 w-4 fill-current text-amber-500" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <svg className="h-4 w-4 fill-current text-amber-500" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <svg className="h-4 w-4 fill-current text-amber-500" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <svg className="h-4 w-4 fill-current text-amber-500" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <svg className="h-4 w-4 fill-current text-amber-500" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <span className="ml-2 font-medium">4.9/5 rating</span>
            </div>
            <p>Trusted by over 10,000 professionals worldwide</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
