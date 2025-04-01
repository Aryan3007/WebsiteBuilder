"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import {  Session } from "next-auth"
import { signOut } from "next-auth/react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "/communities", label: "Community" },
]

export function Navbar({ session }: { session: Session | null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();


  return (
    <motion.header
      className="sticky top-0 z-40  bg-background/80 backdrop-blur-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-tr from-violet-500 to-indigo-600 p-[2px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-background">
                <Image src="/portfol copy.png" alt="navImage" width={200} height={200} />
              </div>
            </motion.div>
            <span className="hidden font-bold sm:inline-block text-lg">Portfol.io</span>
          </Link>

          <nav className="hidden md:flex md:gap-6">
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {session === null ? <div className="hidden sm:flex sm:items-center sm:gap-4">
            <Link href="/signin">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-tr from-violet-500 to-indigo-600 text-white">Sign up free</Button>
            </Link>
          </div> : <div className="hidden sm:inline-flex">
            <Button variant='default' className="bg-gradient-to-r from-violet-500 to-indigo-600 text-white" onClick={async()=>{
              await signOut();
              toast.success("Logged out successfully");
              router.push('/');
            }}>
              Logout
            </Button>
            </div>}

          <div className="flex sm:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Toggle Menu"
                  className="ml-2"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-8 py-6">
                  <div className="flex items-center justify-between">
                    <Link
                      href="/"
                      className="flex items-center space-x-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-600 p-[2px]">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-background">
                          <span className="font-semibold text-sm">PB</span>
                        </div>
                      </div>
                      <span className="font-bold">Portfolio.AI</span>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <nav className="flex flex-col gap-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-base font-medium transition-colors hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="flex flex-col gap-4">
                    <Link href="/signin" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Log in</Button>
                    </Link>
                    <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-tr from-violet-500 to-indigo-600 text-white">
                        Sign up free
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
