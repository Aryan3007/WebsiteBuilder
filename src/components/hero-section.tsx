"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Session } from "next-auth"

// Animation variants for staggered animation
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

const features = [
  "AI-powered design",
  "Custom themes",
  "Responsive layouts",
  "SEO optimized",
]

export function HeroSection({ session }: { session: Session | null }) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div className="relative overflow-hidden bg-background py-12 md:py-20">
      {/* Gradient background effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-[300px] -top-[300px] h-[600px] w-[600px] rounded-full bg-gradient-to-r from-violet-500/20 to-transparent blur-3xl" />
        <div className="absolute -bottom-[300px] -right-[300px] h-[600px] w-[600px] rounded-full bg-gradient-to-r from-indigo-500/20 to-transparent blur-3xl" />
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <motion.div
          className="flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-6 rounded-full border border-border bg-background/80 px-4 py-1.5 backdrop-blur"
          >
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <span className="text-muted-foreground">Revolutionizing portfolio creation</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/20">
                <Zap className="h-3 w-3 text-violet-500" />
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="relative mb-6 text-center text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl"
          >
            <span>Create stunning portfolios</span>
            <br />
            <span className="relative inline-block">
              powered by&nbsp;
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
                  artificial intelligence
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
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="mb-8 max-w-2xl text-center text-xl text-muted-foreground"
          >
            Transform your professional presence with our AI portfolio builder.
            Stand out in your industry with beautiful, personalized websites created in minutes.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mb-12 flex flex-col gap-4 sm:flex-row"
          >
            <HoverCard>
              <HoverCardTrigger asChild>
                {session ? <Link href="/generate-portfolio">
                  <Button
                    size="lg"
                    className="relative overflow-hidden bg-gradient-to-r from-violet-500 to-indigo-600 text-white transition-transform hover:scale-105"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <motion.span
                      className="relative z-10 flex items-center gap-2"
                      animate={isHovering ? { x: 5 } : { x: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      Generate Portfolio
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-500"
                      initial={{ x: "100%" }}
                      animate={isHovering ? { x: 0 } : { x: "100%" }}
                      transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    />
                  </Button>
                </Link> : <Link href="/signin">
                  <Button
                    size="lg"
                    className="relative overflow-hidden bg-gradient-to-r from-violet-500 to-indigo-600 text-white transition-transform hover:scale-105"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <motion.span
                      className="relative z-10 flex items-center gap-2"
                      animate={isHovering ? { x: 5 } : { x: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      Get started for free
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-500"
                      initial={{ x: "100%" }}
                      animate={isHovering ? { x: 0 } : { x: "100%" }}
                      transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    />
                  </Button>
                </Link>}
              </HoverCardTrigger>
              <HoverCardContent className="w-80  backdrop-blur-3xl">
                <div className="flex justify-between space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Start creating your AI-powered portfolio in minutes. No credit card required.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>

            <Link href="/communities">
              <Button
                size="lg"
                variant="outline"
                className="group w-full transition-transform hover:scale-105 sm:w-auto"
              >
                <span className="flex items-center gap-2">
                  Explore Communities
                  <motion.div
                    className="flex items-center justify-center rounded-full"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                  </motion.div>
                </span>
              </Button>
            </Link>
          </motion.div>

          {/* Features list */}
          <motion.div
            variants={itemVariants}
            className="mb-16 flex items-center justify-center gap-4 text-sm text-muted-foreground md:gap-8"
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && (
                  <span className="mx-2 h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                )}
                <span>{feature}</span>
              </div>
            ))}
          </motion.div>

          {/* Browser Mockup */}
          <motion.div
            variants={itemVariants}
            className="relative w-full max-w-5xl"
            style={{
              perspective: "1000px",
            }}
          >
            <motion.div
              initial={{ rotateX: 25, scale: 0.9, y: 20 }}
              animate={{ rotateX: 0, scale: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.6,
              }}
              className="relative rounded-xl border bg-background/80 shadow-2xl"
            >
              {/* Browser bar */}
              <div className="flex h-8 items-center gap-2 rounded-t-xl border-b bg-muted/50 px-4">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </div>
                <div className="flex-1 rounded-md bg-background/90 px-2 py-1 text-xs text-muted-foreground">
                  portfolio-example.com
                </div>
              </div>

              {/* Portfolio preview */}
              <div className="aspect-[16/9] overflow-hidden rounded-b-xl">
                <div className="relative h-full w-full bg-gradient-to-b from-background to-background/80">
                  <div className="grid h-full grid-cols-12 gap-4 p-6">
                    {/* Sidebar */}
                    <div className="col-span-3 flex flex-col gap-4">
                      <div className="h-24 rounded-lg bg-gradient-to-r from-violet-500/20 to-indigo-600/20 p-0.5">
                        <div className="h-full w-full rounded-[7px] bg-card" />
                      </div>
                      <div className="h-48 rounded-lg bg-card" />
                      <div className="h-32 rounded-lg bg-card" />
                    </div>

                    {/* Main content */}
                    <div className="col-span-9 flex flex-col gap-4">
                      <div className="h-16 rounded-lg bg-card" />
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-64 rounded-lg bg-card" />
                        <div className="h-64 rounded-lg bg-card" />
                      </div>
                      <div className="h-16 rounded-lg bg-card" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating elements */}
            <motion.div
              className="absolute -left-6 -top-6 h-16 w-16 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-600 p-0.5 shadow-lg"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-card">
                <Zap className="h-6 w-6 text-violet-500" />
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -right-4 h-20 w-20 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-500 p-0.5 shadow-lg"
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-card">
                <span className="text-2xl font-bold text-indigo-500">AI</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
