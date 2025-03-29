"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"

const footerLinks = [
  {
    title: "Product",
    links: [
      { href: "#features", label: "Features" },
      { href: "#how-it-works", label: "How It Works" },
      { href: "#pricing", label: "Pricing" },
      { href: "/templates", label: "Templates" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/blog", label: "Blog" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/help", label: "Help Center" },
      { href: "/docs", label: "Documentation" },
      { href: "/guides", label: "Guides" },
      { href: "/api", label: "API Reference" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/cookies", label: "Cookies Policy" },
      { href: "/compliance", label: "Compliance" },
    ],
  },
]

const socialLinks = [
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://github.com", icon: Github, label: "GitHub" },
]

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 pt-16 sm:px-6">
        {/* Newsletter signup */}
        <div className="mb-16 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-2xl font-bold">
              Stay updated with our latest features
            </h3>
            <p className="text-muted-foreground">
              Subscribe to our newsletter to get the latest updates about AI portfolio building and
              exclusive offers.
            </p>
          </div>
          <div className="flex items-center">
            <div className="flex w-full max-w-md flex-col space-y-4 sm:flex-row sm:space-x-2 sm:space-y-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-10 rounded-md border bg-background px-3 py-2 text-sm"
              />
              <Button className="bg-gradient-to-r from-violet-500 to-indigo-600 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 flex items-center space-x-2">
              <motion.div
                className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-tr from-violet-500 to-indigo-600 p-[2px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-background">
                  <span className="font-semibold text-sm">PB</span>
                </div>
              </motion.div>
              <span className="font-bold">Portfolio.AI</span>
            </Link>
            <p className="mb-4 text-sm text-muted-foreground">
              Transform your professional presence with our AI portfolio builder. Create beautiful,
              personalized websites in minutes, not days.
            </p>
            <div className="flex items-center space-x-3">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted/80 hover:text-primary"
                >
                  <link.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {footerLinks.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h4 className="mb-4 text-sm font-semibold">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright and theme toggle */}
        <div className="mt-12 flex flex-col items-center justify-between border-t py-6 md:flex-row">
          <p className="mb-4 text-sm text-muted-foreground md:mb-0">
            © {new Date().getFullYear()} Portfolio.AI. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <select className="rounded-md border border-border bg-background px-2 py-1 text-xs">
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  )
}
