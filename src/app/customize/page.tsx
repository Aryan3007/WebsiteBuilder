"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Save,
  Settings,
  Palette,
  ImageIcon,
  Link,
  Layout,
  ArrowLeft,
  Eye,
  EyeOff,
  Undo,
  Redo,
  ChevronRight,
  PaintBucket,
  Check,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"

// Define theme colors
interface ThemeColor {
  name: string
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
  card: string
  cardForeground: string
  border: string
  muted: string
  mutedForeground: string
  isDark: boolean
}

const themeColors: ThemeColor[] = [
  {
    name: "Indigo Light",
    primary: "#4F46E5",
    secondary: "#818CF8",
    accent: "#C7D2FE",
    background: "#F9FAFB",
    foreground: "#1F2937",
    card: "#FFFFFF",
    cardForeground: "#1F2937",
    border: "#E5E7EB",
    muted: "#F3F4F6",
    mutedForeground: "#6B7280",
    isDark: false,
  },
  {
    name: "Violet Light",
    primary: "#8B5CF6",
    secondary: "#A78BFA",
    accent: "#DDD6FE",
    background: "#F5F3FF",
    foreground: "#1E1B4B",
    card: "#FFFFFF",
    cardForeground: "#1E1B4B",
    border: "#E5E7EB",
    muted: "#F3F4F6",
    mutedForeground: "#6B7280",
    isDark: false,
  },
  {
    name: "Emerald Light",
    primary: "#10B981",
    secondary: "#34D399",
    accent: "#A7F3D0",
    background: "#ECFDF5",
    foreground: "#064E3B",
    card: "#FFFFFF",
    cardForeground: "#064E3B",
    border: "#D1FAE5",
    muted: "#F0FDF9",
    mutedForeground: "#047857",
    isDark: false,
  },
  {
    name: "Amber Light",
    primary: "#F59E0B",
    secondary: "#FBBF24",
    accent: "#FDE68A",
    background: "#FFFBEB",
    foreground: "#78350F",
    card: "#FFFFFF",
    cardForeground: "#78350F",
    border: "#FEF3C7",
    muted: "#FFFBEB",
    mutedForeground: "#92400E",
    isDark: false,
  },
  {
    name: "Rose Light",
    primary: "#E11D48",
    secondary: "#FB7185",
    accent: "#FDA4AF",
    background: "#FFF1F2",
    foreground: "#881337",
    card: "#FFFFFF",
    cardForeground: "#881337",
    border: "#FCE7F3",
    muted: "#FFF1F2",
    mutedForeground: "#9D174D",
    isDark: false,
  },
  {
    name: "Slate Dark",
    primary: "#6366F1",
    secondary: "#818CF8",
    accent: "#C7D2FE",
    background: "#0F172A",
    foreground: "#E2E8F0",
    card: "#1E293B",
    cardForeground: "#E2E8F0",
    border: "#334155",
    muted: "#1E293B",
    mutedForeground: "#94A3B8",
    isDark: true,
  },
  {
    name: "Violet Dark",
    primary: "#8B5CF6",
    secondary: "#A78BFA",
    accent: "#DDD6FE",
    background: "#1E1B4B",
    foreground: "#F5F3FF",
    card: "#2E1065",
    cardForeground: "#F5F3FF",
    border: "#4C1D95",
    muted: "#2E1065",
    mutedForeground: "#C4B5FD",
    isDark: true,
  },
  {
    name: "Emerald Dark",
    primary: "#10B981",
    secondary: "#34D399",
    accent: "#A7F3D0",
    background: "#064E3B",
    foreground: "#ECFDF5",
    card: "#065F46",
    cardForeground: "#ECFDF5",
    border: "#047857",
    muted: "#065F46",
    mutedForeground: "#6EE7B7",
    isDark: true,
  },
  {
    name: "Rose Dark",
    primary: "#E11D48",
    secondary: "#FB7185",
    accent: "#FDA4AF",
    background: "#881337",
    foreground: "#FFF1F2",
    card: "#9F1239",
    cardForeground: "#FFF1F2",
    border: "#BE123C",
    muted: "#9F1239",
    mutedForeground: "#FDA4AF",
    isDark: true,
  },
  {
    name: "Cyberpunk",
    primary: "#F9CB28",
    secondary: "#FEF08A",
    accent: "#FDE047",
    background: "#171717",
    foreground: "#FAFAFA",
    card: "#262626",
    cardForeground: "#FAFAFA",
    border: "#404040",
    muted: "#262626",
    mutedForeground: "#A3A3A3",
    isDark: true,
  },
]

export default function PortfolioCustomizer() {
  const router = useRouter()
  const [portfolioHTML, setPortfolioHTML] = useState<string>("")
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null)
  const [selectedElementPath, setSelectedElementPath] = useState<string[]>([])
  const [selectedElementStyles, setSelectedElementStyles] = useState<Record<string, string>>({})
  const [selectedElementContent, setSelectedElementContent] = useState<string>("")
  const [selectedElementAttributes, setSelectedElementAttributes] = useState<Record<string, string>>({})
  const [showHighlight, setShowHighlight] = useState(true)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<ThemeColor>(themeColors[0])
  const [themeMenuOpen, setThemeMenuOpen] = useState(false)

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const contentEditableRef = useRef<boolean>(false)

  // Load portfolio HTML from localStorage on component mount
  useEffect(() => {
    const storedHTML = localStorage.getItem("portfolioHTML")
    if (storedHTML) {
      // Remove unwanted text from the beginning
      const cleanedHTML = storedHTML.replace(/^```html\s*/, "").replace(/```$/, "")

      setPortfolioHTML(cleanedHTML)
      setHistory([cleanedHTML])
      setHistoryIndex(0)

      // Apply a random theme when loading the HTML
      const randomThemeIndex = Math.floor(Math.random() * themeColors.length)
      setTimeout(() => {
        applyTheme(themeColors[randomThemeIndex])
      }, 300)
    } else {
      router.push("/")
    }
  }, [router])

  // Update iframe content when portfolioHTML changes
  useEffect(() => {
    const iframe = iframeRef.current
    if (iframe && iframe.contentWindow) {
      const iframeDoc = iframe.contentWindow.document

      // Store the currently selected element's path before updating
      let selectedPath: string[] = []
      if (selectedElement) {
        selectedPath = getElementPath(selectedElement)
      }

      // Update the iframe content
      iframeDoc.open()
      iframeDoc.write(portfolioHTML)
      iframeDoc.close()

      // Add click event listeners to all elements in the iframe
      setTimeout(() => {
        addClickListenersToIframe(iframeDoc)

        // If we had a selected element, try to reselect it after update
        if (selectedPath.length > 0) {
          const newElement = findElementByPath(iframeDoc, selectedPath)
          if (newElement) {
            handleElementClick(newElement)
          }
        }
      }, 100)
    }
  }, [portfolioHTML, showHighlight])

  // Find an element by its path
  const findElementByPath = (doc: Document, path: string[]): HTMLElement | null => {
    // Start from body
    let currentElement: HTMLElement | null = doc.body

    // Skip the body element in the path (which is the first element)
    for (let i = 1; i < path.length; i++) {
      if (!currentElement) return null

      const pathPart = path[i]
      const [tagName, identifier] = pathPart.split(/[#.]/, 2)

      let found = false
      const children = currentElement.children

      for (let j = 0; j < children.length; j++) {
        const child = children[j] as HTMLElement

        if (child.tagName.toLowerCase() !== tagName.toLowerCase()) continue

        // If we have an identifier (id or class)
        if (identifier) {
          if (pathPart.includes("#") && child.id === identifier) {
            currentElement = child
            found = true
            break
          } else if (pathPart.includes(".") && child.classList.contains(identifier)) {
            currentElement = child
            found = true
            break
          }
        } else {
          // If no identifier, just match by tag and position
          currentElement = child
          found = true
          break
        }
      }

      if (!found) return null
    }

    return currentElement
  }

  // Add a new function to find and select nested image elements
  const findAndSelectImage = (element: HTMLElement) => {
    // First check if the element itself is an image
    if (element.tagName === "IMG") {
      handleElementClick(element)
      return true
    }

    // Check if there's an image inside the element (direct child)
    const nestedImage = element.querySelector(":scope > img") as HTMLElement
    if (nestedImage) {
      handleElementClick(nestedImage)
      return true
    }

    // Check for any image deeper in the hierarchy
    const anyImage = element.querySelector("img") as HTMLElement
    if (anyImage) {
      handleElementClick(anyImage)
      return true
    }

    // If we're clicking on a container that has a background image, we should
    // offer a way to edit that too, but for now we'll just select the element itself
    return false
  }

  // Add click event listeners to all elements in the iframe
  const addClickListenersToIframe = (iframeDoc: Document) => {
    const allElements = iframeDoc.querySelectorAll("body *")

    // Remove any existing highlight classes
    allElements.forEach((el) => {
      el.classList.remove("portfolio-element-hover")
      el.classList.remove("portfolio-element-selected")
    })

    // Add event listeners to all elements
    allElements.forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()

        // Try to find and select an image first
        const imageSelected = findAndSelectImage(el as HTMLElement)

        // If no image was selected, select the clicked element as before
        if (!imageSelected) {
          handleElementClick(el as HTMLElement)
        }
      })

      if (showHighlight) {
        el.addEventListener("mouseover", () => {
          el.classList.add("portfolio-element-hover")
        })

        el.addEventListener("mouseout", () => {
          el.classList.remove("portfolio-element-hover")
        })
      }
    })

    // Add styles for highlighting elements
    const styleEl = iframeDoc.createElement("style")
    styleEl.textContent = `
      .portfolio-element-hover {
        outline: 2px dashed rgba(99, 102, 241, 0.5) !important;
        outline-offset: 2px !important;
        cursor: pointer !important;
      }
      .portfolio-element-selected {
        outline: 2px solid rgba(99, 102, 241, 1) !important;
        outline-offset: 2px !important;
      }
      [contenteditable="true"] {
        border: 1px dashed rgba(99, 102, 241, 0.5) !important;
        padding: 2px !important;
      }
      [contenteditable="true"]:focus {
        outline: 2px solid rgba(99, 102, 241, 1) !important;
        outline-offset: 2px !important;
      }
      /* Special highlight for elements containing images */
      div:has(> img):hover::after,
      div:has(img):hover::after {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(99, 102, 241, 0.8);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        pointer-events: none;
        z-index: 100;
      }

      /* Make images more clickable */
      img {
        cursor: pointer !important;
        position: relative;
        z-index: 40 !important;
      }

      /* Add a special edit button on image hover */
      img:hover::after {
        content: "Edit";
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: rgba(99, 102, 241, 0.9);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 50;
      }
    `
    iframeDoc.head.appendChild(styleEl)
  }

  // Handle element click in the iframe
  const handleElementClick = (element: HTMLElement) => {
    // Remove selected class from previously selected element
    if (selectedElement && iframeRef.current?.contentWindow?.document) {
      const prevSelected = iframeRef.current.contentWindow.document.querySelectorAll(".portfolio-element-selected")
      prevSelected.forEach((el) => el.classList.remove("portfolio-element-selected"))
    }

    // Add selected class to the clicked element
    element.classList.add("portfolio-element-selected")

    // Get element path for display
    const path = getElementPath(element)
    setSelectedElementPath(path)

    // Get computed styles
    const computedStyles = window.getComputedStyle(element)
    const relevantStyles: Record<string, string> = {
      color: computedStyles.color,
      backgroundColor: computedStyles.backgroundColor,
      fontSize: computedStyles.fontSize,
      fontWeight: computedStyles.fontWeight,
      textAlign: computedStyles.textAlign,
      padding: computedStyles.padding,
      margin: computedStyles.margin,
      borderRadius: computedStyles.borderRadius,
      width: computedStyles.width,
      height: computedStyles.height,
    }

    // Get inline styles
    const inlineStyles: Record<string, string> = {}
    if (element.style) {
      for (let i = 0; i < element.style.length; i++) {
        const prop = element.style[i]
        inlineStyles[prop] = element.style.getPropertyValue(prop)
      }
    }

    setSelectedElementStyles({ ...relevantStyles, ...inlineStyles })

    // Get element content
    setSelectedElementContent(element.innerHTML)

    // Get element attributes
    const attributes: Record<string, string> = {}
    for (let i = 0; i < element.attributes.length; i++) {
      const attr = element.attributes[i]
      if (attr.name !== "style" && attr.name !== "class") {
        attributes[attr.name] = attr.value
      }
    }
    setSelectedElementAttributes(attributes)

    // Store the selected element
    setSelectedElement(element)
    if (element.tagName === "IMG") {
      console.log("Image selected:", element.getAttribute("src"))
      console.log("Image attributes:", selectedElementAttributes)
    }
  }

  // Get the path of an element (e.g., "body > div > section > h1")
  const getElementPath = (element: HTMLElement): string[] => {
    const path: string[] = []
    let currentElement: HTMLElement | null = element

    while (currentElement && currentElement.tagName !== "HTML") {
      let elementName = currentElement.tagName.toLowerCase()

      // Add id if available
      if (currentElement.id) {
        elementName += `#${currentElement.id}`
      }
      // Add first class if available
      else if (currentElement.classList.length > 0) {
        elementName += `.${currentElement.classList[0]}`
      }

      path.unshift(elementName)
      currentElement = currentElement.parentElement
    }

    return path
  }

  // This function checks if an element is a container that can have items added
  const isAddableContainer = (element: HTMLElement): boolean => {
    // Check if it's a grid or flex container
    const computedStyle = window.getComputedStyle(element)
    const display = computedStyle.display

    // Check if it has grid or flex display
    if (display.includes("grid") || display.includes("flex")) {
      return true
    }

    // Check for common container class names
    const className = element.className.toLowerCase()
    if (
      className.includes("grid") ||
      className.includes("flex") ||
      className.includes("container") ||
      className.includes("projects") ||
      className.includes("cards") ||
      className.includes("items") ||
      className.includes("gallery")
    ) {
      return true
    }

    // Check for common container IDs
    const id = element.id.toLowerCase()
    if (
      id.includes("projects") ||
      id.includes("gallery") ||
      id.includes("portfolio") ||
      id.includes("grid") ||
      id.includes("container")
    ) {
      return true
    }

    return false
  }

  // Update element style
  const updateElementStyle = (property: string, value: string) => {
    if (!selectedElement) return

    // Create a copy of the current styles
    const updatedStyles = { ...selectedElementStyles }
    updatedStyles[property] = value
    setSelectedElementStyles(updatedStyles)

    // Apply the style to the element
    selectedElement.style[property as any] = value

    // Update the HTML without losing selection
    requestAnimationFrame(() => {
      updatePortfolioHTML()
    })
  }

  // Update element content
  const updateElementContent = (content: string) => {
    if (!selectedElement) return

    // Update the content state
    setSelectedElementContent(content)

    // Apply the content to the element
    selectedElement.innerHTML = content

    // Update the HTML without losing selection
    updatePortfolioHTML()
  }

  // Handle content change
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value
    updateElementContent(content)
  }

  // Update element attribute
  const updateElementAttribute = (attribute: string, value: string) => {
    if (!selectedElement) return

    // Create a copy of the current attributes
    const updatedAttributes = { ...selectedElementAttributes }
    updatedAttributes[attribute] = value
    setSelectedElementAttributes(updatedAttributes)

    // Apply the attribute to the element
    selectedElement.setAttribute(attribute, value)

    // Update the HTML without losing selection
    requestAnimationFrame(() => {
      updatePortfolioHTML()
    })
  }

  // Toggle content editable mode
  const toggleContentEditable = () => {
    if (!selectedElement) return

    contentEditableRef.current = !contentEditableRef.current
    selectedElement.contentEditable = contentEditableRef.current ? "true" : "false"

    if (contentEditableRef.current) {
      selectedElement.focus()

      // Add input event listener for real-time updates
      const handleInput = () => {
        if (selectedElement) {
          setSelectedElementContent(selectedElement.innerHTML)
        }
      }

      selectedElement.addEventListener("input", handleInput)

      // Add blur event listener to save changes
      selectedElement.addEventListener(
        "blur",
        () => {
          if (selectedElement) {
            setSelectedElementContent(selectedElement.innerHTML)
            updatePortfolioHTML()
            contentEditableRef.current = false
            selectedElement.contentEditable = "false"
          }
        },
        { once: true },
      )
    }
  }

  // Update the portfolio HTML
  const updatePortfolioHTML = () => {
    if (!iframeRef.current?.contentWindow?.document) return

    // Get the updated HTML from the iframe
    const updatedHTML = iframeRef.current.contentWindow.document.documentElement.outerHTML

    // Add to history if different from current
    if (updatedHTML !== portfolioHTML) {
      // If we're not at the end of the history, truncate it
      if (historyIndex < history.length - 1) {
        setHistory(history.slice(0, historyIndex + 1))
      }

      // Update the HTML state
      setPortfolioHTML(updatedHTML)

      // Update history
      const newHistory = [...history.slice(0, historyIndex + 1), updatedHTML]
      setHistory(newHistory)
      setHistoryIndex(historyIndex + 1)
    }
  }

  // This function clones a child element in a container
  const cloneChildElement = () => {
    if (!selectedElement || !iframeRef.current?.contentWindow?.document) return

    // Check if the selected element is a container
    if (!isAddableContainer(selectedElement)) {
      toast.error("Please select a container element like a grid or section first")
      return
    }

    // Find a child element to clone
    const children = selectedElement.children
    if (children.length === 0) {
      toast.error("The selected container has no children to clone")
      return
    }

    // Clone the last child
    const childToClone = children[children.length - 1] as HTMLElement
    const clone = childToClone.cloneNode(true) as HTMLElement

    // Reset any IDs to avoid duplicates
    if (clone.id) {
      clone.id = `${clone.id}-copy-${Date.now()}`
    }

    // Add the cloned element to the container
    selectedElement.appendChild(clone)

    // Update the HTML
    updatePortfolioHTML()

    // Show success message
    toast.success("New item added successfully!")
  }

  // This function adds a new element from a template
  const addNewElement = (templateType: string) => {
    if (!selectedElement || !iframeRef.current?.contentWindow?.document) return

    // Check if the selected element is a container
    if (!isAddableContainer(selectedElement)) {
      toast.error("Please select a container element like a grid or section first")
      return
    }

    let template = ""

    // Define templates for different types of content
    switch (templateType) {
      case "project":
        template = `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <img src="/placeholder.svg?height=200&width=400" alt="Project Image" class="w-full h-48 object-cover" />
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">New Project</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">Project description goes here. Click to edit this text.</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">Tag 1</span>
              <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">Tag 2</span>
            </div>
            <a href="#" class="inline-flex items-center text-primary hover:underline">
              View Project <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
          </div>
        </div>
      `
        break
      case "experience":
        template = `
        <div class="flex">
          <div class="hidden md:block w-1/5 pr-8 text-right">
            <span class="text-sm font-semibold text-gray-500 dark:text-gray-400">2023 - Present</span>
          </div>
          <div class="relative w-full md:w-4/5 pl-8 border-l-2 border-primary">
            <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
            <span class="inline-block md:hidden text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">2023 - Present</span>
            <h4 class="text-xl font-semibold text-gray-900 dark:text-white">New Position</h4>
            <p class="text-gray-600 dark:text-gray-400 mb-3">Company Name</p>
            <p class="text-gray-700 dark:text-gray-300">Job description goes here. Click to edit this text.</p>
          </div>
        </div>
      `
        break
      case "education":
        template = `
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
          <h4 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Degree Name</h4>
          <p class="text-gray-600 dark:text-gray-400 mb-4">University Name | 2023</p>
          <p class="text-gray-700 dark:text-gray-300">Description or achievements. Click to edit this text.</p>
        </div>
      `
        break
      case "skill":
        template = `<span class="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">New Skill</span>`
        break
      default:
        template = `<div class="p-4 border rounded-md">New content. Click to edit.</div>`
    }

    // Create a temporary container to hold our HTML
    const tempContainer = iframeRef.current.contentWindow.document.createElement("div")
    tempContainer.innerHTML = template.trim()

    // Get the first child (our actual template)
    const newElement = tempContainer.firstChild as HTMLElement

    // Add the new element to the container
    selectedElement.appendChild(newElement)

    // Update the HTML
    updatePortfolioHTML()

    // Show success message
    toast.success(`New ${templateType} added successfully!`)
  }

  // This function removes the selected element
  const removeSelectedElement = () => {
    if (!selectedElement || !iframeRef.current?.contentWindow?.document) return

    // Don't allow removing body or critical elements
    if (
      selectedElement.tagName === "BODY" ||
      selectedElement.tagName === "HTML" ||
      selectedElement.tagName === "HEAD"
    ) {
      toast.error("This element cannot be removed")
      return
    }

    // Ask for confirmation before removing
    if (confirm("Are you sure you want to remove this element? This action cannot be undone.")) {
      // Store the parent to reselect after removal
      const parent = selectedElement.parentElement

      // Remove the element
      selectedElement.remove()

      // Update the HTML
      updatePortfolioHTML()

      // Clear the selected element
      setSelectedElement(null)
      setSelectedElementPath([])

      // Select the parent if available
      if (parent) {
        handleElementClick(parent)
      }

      // Show success message
      toast.success("Element removed successfully")
    }
  }

  // Update the applyThemeToUI function to use HSL values for better compatibility with shadcn/ui
  const applyThemeToUI = (theme: ThemeColor) => {
    // Convert hex colors to HSL for shadcn/ui compatibility
    const hexToHSL = (hex: string) => {
      // Remove the # if present
      hex = hex.replace(/^#/, "")

      // Parse the hex values
      const r = Number.parseInt(hex.substring(0, 2), 16) / 255
      const g = Number.parseInt(hex.substring(2, 4), 16) / 255
      const b = Number.parseInt(hex.substring(4, 6), 16) / 255

      // Find the min and max values to calculate saturation
      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)

      // Calculate HSL values
      let h = 0
      let s = 0
      let l = (max + min) / 2

      if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0)
            break
          case g:
            h = (b - r) / d + 2
            break
          case b:
            h = (r - g) / d + 4
            break
        }

        h = h * 60
      }

      // Round values
      h = Math.round(h)
      s = Math.round(s * 100)
      l = Math.round(l * 100)

      return `${h} ${s}% ${l}%`
    }

    // Set the CSS variables using HSL values
    document.documentElement.style.setProperty("--background", hexToHSL(theme.background))
    document.documentElement.style.setProperty("--foreground", hexToHSL(theme.foreground))
    document.documentElement.style.setProperty("--card", hexToHSL(theme.card))
    document.documentElement.style.setProperty("--card-foreground", hexToHSL(theme.cardForeground))
    document.documentElement.style.setProperty("--primary", hexToHSL(theme.primary))
    document.documentElement.style.setProperty("--secondary", hexToHSL(theme.secondary))
    document.documentElement.style.setProperty("--accent", hexToHSL(theme.accent))
    document.documentElement.style.setProperty("--muted", hexToHSL(theme.muted))
    document.documentElement.style.setProperty("--muted-foreground", hexToHSL(theme.mutedForeground))
    document.documentElement.style.setProperty("--border", hexToHSL(theme.border))

    // Apply dark mode if needed
    if (theme.isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  // Modify the applyTheme function to also update the UI
  const applyTheme = (theme: ThemeColor) => {
    if (!iframeRef.current?.contentWindow?.document) return

    const iframeDoc = iframeRef.current.contentWindow.document

    // Create or update the theme style element
    let themeStyle = iframeDoc.getElementById("theme-colors")
    if (!themeStyle) {
      themeStyle = iframeDoc.createElement("style")
      themeStyle.id = "theme-colors"
      iframeDoc.head.appendChild(themeStyle)
    }

    // Set the theme CSS variables
    themeStyle.textContent = `
  :root {
    --color-primary: ${theme.primary};
    --color-secondary: ${theme.secondary};
    --color-accent: ${theme.accent};
    --color-background: ${theme.background};
    --color-foreground: ${theme.foreground};
    --color-card: ${theme.card};
    --color-card-foreground: ${theme.cardForeground};
    --color-border: ${theme.border};
    --color-muted: ${theme.muted};
    --color-muted-foreground: ${theme.mutedForeground};
  }
  
  /* Apply theme colors to common elements */
  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
  }
  
  /* Cards and containers */
  .card, .bg-card, .bg-white, .bg-background-alt, section, header, footer, aside, nav {
    background-color: var(--color-card);
    color: var(--color-card-foreground);
  }
  
  /* Borders */
  .border, [class*="border-"], hr {
    border-color: var(--color-border);
  }
  
  /* Primary color applications */
  .bg-primary, .bg-indigo-600, .bg-blue-600, .bg-violet-600, 
  [class*="bg-indigo-"], [class*="bg-blue-"], [class*="bg-violet-"] {
    background-color: var(--color-primary) !important;
    color: white !important;
  }
  
  .text-primary, .text-indigo-600, .text-blue-600, .text-violet-600,
  [class*="text-indigo-"], [class*="text-blue-"], [class*="text-violet-"] {
    color: var(--color-primary) !important;
  }
  
  .border-primary, .border-indigo-600, .border-blue-600, .border-violet-600,
  [class*="border-indigo-"], [class*="border-blue-"], [class*="border-violet-"] {
    border-color: var(--color-primary) !important;
  }
  
  /* Secondary color applications */
  .bg-secondary, .bg-indigo-400, .bg-blue-400, .bg-violet-400 {
    background-color: var(--color-secondary) !important;
    color: white !important;
  }
  
  .text-secondary, .text-indigo-400, .text-blue-400, .text-violet-400 {
    color: var(--color-secondary) !important;
  }
  
  .border-secondary, .border-indigo-400, .border-blue-400, .border-violet-400 {
    border-color: var(--color-secondary) !important;
  }
  
  /* Accent color applications */
  .bg-accent, .bg-indigo-200, .bg-blue-200, .bg-violet-200 {
    background-color: var(--color-accent) !important;
  }
  
  .text-accent, .text-indigo-200, .text-blue-200, .text-violet-200 {
    color: var(--color-accent) !important;
  }
  
  .border-accent, .border-indigo-200, .border-blue-200, .border-violet-200 {
    border-color: var(--color-accent) !important;
  }
  
  /* Muted elements */
  .bg-muted, .bg-gray-100, .bg-slate-100 {
    background-color: var(--color-muted) !important;
  }
  
  .text-muted-foreground, .text-gray-500, .text-slate-500, .text-gray-600, .text-slate-600 {
    color: var(--color-muted-foreground) !important;
  }
  
  /* Buttons - Ensure all buttons get the theme color */
  button, .btn, [class*="btn-"], a.bg-indigo-600, a.bg-blue-600, a.bg-violet-600,
  a[class*="bg-indigo-"], a[class*="bg-blue-"], a[class*="bg-violet-"],
  button[class*="bg-indigo-"], button[class*="bg-blue-"], button[class*="bg-violet-"],
  .button, a.button, .btn-primary, a.btn-primary {
    background-color: var(--color-primary) !important;
    color: white !important;
    border-color: var(--color-primary) !important;
  }
  
  button:hover, .btn:hover, [class*="btn-"]:hover, a.bg-indigo-600:hover, a.bg-blue-600:hover, a.bg-violet-600:hover,
  a[class*="bg-indigo-"]:hover, a[class*="bg-blue-"]:hover, a[class*="bg-violet-"]:hover,
  button[class*="bg-indigo-"]:hover, button[class*="bg-blue-"]:hover, button[class*="bg-violet-"]:hover,
  .button:hover, a.button:hover, .btn-primary:hover, a.btn-primary:hover {
    background-color: var(--color-secondary) !important;
    border-color: var(--color-secondary) !important;
  }
  
  /* Links */
  a {
    color: var(--color-primary);
  }
  
  a:hover {
    color: var(--color-secondary);
  }
  
  /* Gradients */
  [class*="bg-gradient"] {
    background-image: linear-gradient(to right, var(--color-primary), var(--color-secondary)) !important;
  }
  
  /* Headings with theme color spans */
  h1 span, h2 span, h3 span, h4 span, h5 span, h6 span,
  .text-xl span, .text-2xl span, .text-3xl span, .text-4xl span, .text-5xl span, .text-6xl span {
    color: var(--color-primary) !important;
  }
  
  /* Skills section - Apply theme color to skill tags */
  .skills span, [id="skills"] span, [id*="skill"] span,
  span.px-4.py-2, span.px-3.py-1, span.px-2.py-1,
  .skill-tag, .tag, .badge, .pill {
    background-color: var(--color-primary) !important;
    color: white !important;
    border-color: var(--color-primary) !important;
  }
  
  /* Section headings with color highlights */
  h2 span, h3 span, section h2 span, section h3 span {
    color: var(--color-primary) !important;
  }
  
  /* Dark mode specific adjustments */
  ${
    theme.isDark
      ? `
    /* Improve contrast for dark themes */
    .bg-white, .bg-gray-50, .bg-slate-50 {
      background-color: var(--color-card) !important;
      color: var(--color-card-foreground) !important;
    }
    
    .text-gray-800, .text-slate-800, .text-gray-900, .text-slate-900, .text-black {
      color: var(--color-foreground) !important;
    }
    
    /* Invert some elements for better visibility */
    img:not([src*=".svg"]) {
      filter: brightness(0.9);
    }
    
    /* Additional dark mode contrast fixes */
    h1, h2, h3, h4, h5, h6 {
      color: white !important;
    }
    
    /* Ensure skill tags have proper contrast in dark mode */
    .skills span, [id="skills"] span, [id*="skill"] span,
    span.px-4.py-2, span.px-3.py-1, span.px-2.py-1,
    .skill-tag, .tag, .badge, .pill {
      background-color: var(--color-primary) !important;
      color: white !important;
    }
  `
      : ""
  }
`

    // Update the current theme
    setCurrentTheme(theme)

    // Close the theme popover
    setThemeMenuOpen(false)

    // Update the HTML to save the theme
    updatePortfolioHTML()
  }

  // Add useEffect to initialize the UI theme when the component mounts
  useEffect(() => {
    // Apply the default theme to the UI
    applyThemeToUI(themeColors[0])
  }, [])

  // Save the updated HTML to localStorage
  const savePortfolio = () => {
    setIsSaving(true)

    try {
      localStorage.setItem("portfolioHTML", portfolioHTML)
      setSaveSuccess(true)
      toast.success("Progress Saved Successfully!!")
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      console.error("Error saving portfolio:", error)
    } finally {
      setIsSaving(false)
    }
  }

  // Undo changes
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1)
      setPortfolioHTML(history[historyIndex - 1])
    }
  }

  // Redo changes
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1)
      setPortfolioHTML(history[historyIndex + 1])
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
        {/* Header */}
        <header className="flex h-14 items-center justify-between border-b px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 mr-2">
              {/* Theme Selector Button */}
              <Popover open={themeMenuOpen} onOpenChange={setThemeMenuOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2" title="Change theme colors">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: currentTheme.primary }} />
                    <PaintBucket className="h-4 w-4" />
                    <span className="hidden sm:inline">Theme</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96 backdrop-blur-3xl">
                  <div className="space-y-4 ">
                    <h3 className="font-medium">Select Theme</h3>
                    <p className="text-sm text-muted-foreground">Choose a color theme for your portfolio</p>

                    <div className="grid grid-cols-5 gap-3">
                      {themeColors.map((theme) => (
                        <button
                          key={theme.name}
                          className={`relative flex flex-col items-center gap-1 p-2 rounded-md transition-colors ${
                            currentTheme.name === theme.name ? "bg-muted" : "hover:bg-muted/50"
                          }`}
                          onClick={() => applyTheme(theme)}
                          title={theme.name}
                        >
                          <div className="w-full h-16 rounded-md border overflow-hidden flex flex-col">
                            <div
                              className="h-1/2 w-full flex items-center justify-center"
                              style={{ backgroundColor: theme.background }}
                            >
                              <div
                                className="h-6 w-6 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: theme.primary }}
                              >
                                {currentTheme.name === theme.name && <Check className="h-4 w-4 text-white" />}
                              </div>
                            </div>
                            <div
                              className="h-1/2 w-full flex items-center justify-center"
                              style={{ backgroundColor: theme.card }}
                            >
                              <div className="h-4 w-10 rounded-sm" style={{ backgroundColor: theme.accent }} />
                            </div>
                          </div>
                          <span className="text-xs font-medium mt-1">{theme.name}</span>
                          <span className="text-[10px] text-muted-foreground">{theme.isDark ? "Dark" : "Light"}</span>
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2 border-t">
                      <div className="flex items-center gap-1 text-xs">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: currentTheme.primary }} />
                        <span>Primary</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: currentTheme.background }} />
                        <span>Background</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: currentTheme.card }} />
                        <span>Card</span>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowHighlight(!showHighlight)}
                title={showHighlight ? "Hide element highlights" : "Show element highlights"}
              >
                {showHighlight ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="icon" onClick={undo} disabled={historyIndex <= 0} title="Undo">
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
                title="Redo"
              >
                <Redo className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={savePortfolio}
              disabled={isSaving}
              className="bg-gradient-to-r from-violet-500 to-indigo-600 text-white"
            >
              {isSaving ? "Saving..." : "Save Changes"}
              <Save className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Main content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar>
            {/* <SidebarHeader className="border-b p-4">
              {saveSuccess && (
                <Alert className="mt-2 bg-green-50 text-green-800 border-green-200">
                  <AlertDescription>Changes saved successfully!</AlertDescription>
                </Alert>
              )}
            </SidebarHeader> */}

            <SidebarContent>
              {selectedElement ? (
                <>
                  <SidebarGroup>
                    <SidebarGroupLabel className="flex items-center gap-2">
                      <Layout className="h-4 w-4" />
                      Selected Element
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                      <div className="p-2">
                        <div className="mb-2 rounded-md bg-muted p-2 text-xs font-mono">
                          {selectedElementPath.map((item, index) => (
                            <div key={index} className="flex items-center">
                              {index > 0 && <ChevronRight className="h-3 w-3 mx-1 text-muted-foreground" />}
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={toggleContentEditable} className="w-full">
                            {contentEditableRef.current ? "Finish Editing" : "Edit Content Directly"}
                          </Button>
                        </div>
                      </div>
                    </SidebarGroupContent>
                  </SidebarGroup>

                  <Tabs defaultValue="styles">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="styles">
                        {/* <Palette className="h-4 w-4 mr-2" /> */}
                        Styles
                      </TabsTrigger>
                      <TabsTrigger value="content">
                        {/* <Type className="h-4 w-4 mr-2" /> */}
                        Content
                      </TabsTrigger>
                      <TabsTrigger value="attributes">
                        {/* <Settings className="h-4 w-4 mr-2" /> */}
                        Attributes
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="styles" className="p-2">
                      <SidebarGroup>
                        <SidebarGroupLabel>Colors</SidebarGroupLabel>
                        <SidebarGroupContent>
                          <div className="space-y-4 p-2">
                            <div className="grid gap-2">
                              <Label htmlFor="text-color">Text Color</Label>
                              <div className="flex gap-2">
                                <div
                                  className="h-8 w-8 rounded-md border"
                                  style={{ backgroundColor: selectedElementStyles.color }}
                                />
                                <Input
                                  id="text-color"
                                  type="text"
                                  value={selectedElementStyles.color || ""}
                                  onChange={(e) => updateElementStyle("color", e.target.value)}
                                  className="flex-1"
                                />
                                <Input
                                  type="color"
                                  value={selectedElementStyles.color || "#000000"}
                                  onChange={(e) => updateElementStyle("color", e.target.value)}
                                  className="w-10 p-0 border-0"
                                />
                              </div>
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="bg-color">Background Color</Label>
                              <div className="flex gap-2">
                                <div
                                  className="h-8 w-8 rounded-md border"
                                  style={{ backgroundColor: selectedElementStyles.backgroundColor }}
                                />
                                <Input
                                  id="bg-color"
                                  type="text"
                                  value={selectedElementStyles.backgroundColor || ""}
                                  onChange={(e) => updateElementStyle("backgroundColor", e.target.value)}
                                  className="flex-1"
                                />
                                <Input
                                  type="color"
                                  value={selectedElementStyles.backgroundColor || "#ffffff"}
                                  onChange={(e) => updateElementStyle("backgroundColor", e.target.value)}
                                  className="w-10 p-0 border-0"
                                />
                              </div>
                            </div>
                          </div>
                        </SidebarGroupContent>
                      </SidebarGroup>

                      <SidebarGroup>
                        <SidebarGroupLabel>Typography</SidebarGroupLabel>
                        <SidebarGroupContent>
                          <div className="space-y-4 p-2">
                            <div className="grid gap-2">
                              <Label htmlFor="font-size">Font Size</Label>
                              <Input
                                id="font-size"
                                type="text"
                                value={selectedElementStyles.fontSize || ""}
                                onChange={(e) => updateElementStyle("fontSize", e.target.value)}
                              />
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="font-weight">Font Weight</Label>
                              <select
                                id="font-weight"
                                value={selectedElementStyles.fontWeight || ""}
                                onChange={(e) => updateElementStyle("fontWeight", e.target.value)}
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <option value="normal">Normal</option>
                                <option value="bold">Bold</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                                <option value="300">300</option>
                                <option value="400">400</option>
                                <option value="500">500</option>
                                <option value="600">600</option>
                                <option value="700">700</option>
                                <option value="800">800</option>
                                <option value="900">900</option>
                              </select>
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="text-align">Text Align</Label>
                              <select
                                id="text-align"
                                value={selectedElementStyles.textAlign || ""}
                                onChange={(e) => updateElementStyle("textAlign", e.target.value)}
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <option value="left">Left</option>
                                <option value="center">Center</option>
                                <option value="right">Right</option>
                                <option value="justify">Justify</option>
                              </select>
                            </div>
                          </div>
                        </SidebarGroupContent>
                      </SidebarGroup>

                      <SidebarGroup>
                        <SidebarGroupLabel>Spacing & Size</SidebarGroupLabel>
                        <SidebarGroupContent>
                          <div className="space-y-4 p-2">
                            <div className="grid gap-2">
                              <Label htmlFor="padding">Padding</Label>
                              <Input
                                id="padding"
                                type="text"
                                value={selectedElementStyles.padding || ""}
                                onChange={(e) => updateElementStyle("padding", e.target.value)}
                              />
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="margin">Margin</Label>
                              <Input
                                id="margin"
                                type="text"
                                value={selectedElementStyles.margin || ""}
                                onChange={(e) => updateElementStyle("margin", e.target.value)}
                              />
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="border-radius">Border Radius</Label>
                              <Input
                                id="border-radius"
                                type="text"
                                value={selectedElementStyles.borderRadius || ""}
                                onChange={(e) => updateElementStyle("borderRadius", e.target.value)}
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div className="grid gap-2">
                                <Label htmlFor="width">Width</Label>
                                <Input
                                  id="width"
                                  type="text"
                                  value={selectedElementStyles.width || ""}
                                  onChange={(e) => updateElementStyle("width", e.target.value)}
                                />
                              </div>

                              <div className="grid gap-2">
                                <Label htmlFor="height">Height</Label>
                                <Input
                                  id="height"
                                  type="text"
                                  value={selectedElementStyles.height || ""}
                                  onChange={(e) => updateElementStyle("height", e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </SidebarGroupContent>
                      </SidebarGroup>
                    </TabsContent>

                    <TabsContent value="content" className="p-2">
                      <SidebarGroup>
                        <SidebarGroupLabel>HTML Content</SidebarGroupLabel>
                        <SidebarGroupContent>
                          <div className="p-2">
                            <Textarea
                              value={selectedElementContent}
                              onChange={handleContentChange}
                              className="min-h-[200px] font-mono text-sm"
                            />
                            <p className="mt-2 text-xs text-muted-foreground">
                              Edit the HTML content of the selected element. You can include HTML tags.
                            </p>
                          </div>
                        </SidebarGroupContent>
                      </SidebarGroup>
                    </TabsContent>

                    <TabsContent value="attributes" className="p-2">
                      <SidebarGroup>
                        <SidebarGroupLabel>Element Attributes</SidebarGroupLabel>
                        <SidebarGroupContent>
                          <div className="space-y-4 p-2">
                            {/* Image source attribute */}
                            {selectedElement?.tagName === "IMG" && (
                              <div className="grid gap-2">
                                <Label htmlFor="img-src">Image Source</Label>
                                <div className="flex gap-2">
                                  <Input
                                    id="img-src"
                                    type="text"
                                    value={selectedElementAttributes.src || ""}
                                    onChange={(e) => updateElementAttribute("src", e.target.value)}
                                    className="flex-1"
                                  />
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button variant="outline" size="icon">
                                        <ImageIcon className="h-4 w-4" />
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                      <div className="grid gap-4">
                                        <div className="space-y-2">
                                          <h4 className="font-medium leading-none">Preview</h4>
                                          <div className="rounded-md border p-2">
                                            <img
                                              src={selectedElementAttributes.src || ""}
                                              alt="Preview"
                                              className="max-h-40 mx-auto"
                                              onError={(e) =>
                                                (e.currentTarget.src = "/placeholder.svg?height=100&width=100")
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </PopoverContent>
                                  </Popover>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  Enter the URL of the image you want to display.
                                </p>
                              </div>
                            )}

                            {/* Link href attribute */}
                            {(selectedElement?.tagName === "A" || selectedElement?.tagName === "BUTTON") && (
                              <div className="grid gap-2">
                                <Label htmlFor="link-href">Link URL</Label>
                                <div className="flex gap-2">
                                  <Input
                                    id="link-href"
                                    type="text"
                                    value={selectedElementAttributes.href || ""}
                                    onChange={(e) => updateElementAttribute("href", e.target.value)}
                                    className="flex-1"
                                  />
                                  <Button variant="outline" size="icon">
                                    <Link className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            )}

                            {/* ID attribute */}
                            <div className="grid gap-2">
                              <Label htmlFor="element-id">ID</Label>
                              <Input
                                id="element-id"
                                type="text"
                                value={selectedElementAttributes.id || ""}
                                onChange={(e) => updateElementAttribute("id", e.target.value)}
                              />
                            </div>

                            {/* Class attribute */}
                            <div className="grid gap-2">
                              <Label htmlFor="element-class">Class</Label>
                              <Input
                                id="element-class"
                                type="text"
                                value={selectedElement?.className || ""}
                                onChange={(e) => updateElementAttribute("class", e.target.value)}
                              />
                              <p className="text-xs text-muted-foreground">
                                Note: Changing classes may affect styling from CSS.
                              </p>
                            </div>

                            {/* Custom attribute editor */}
                            <div className="grid gap-2">
                              <Label>Custom Attributes</Label>
                              <div className="rounded-md border">
                                {Object.entries(selectedElementAttributes)
                                  .filter(([key]) => !["src", "href", "id", "class"].includes(key))
                                  .map(([key, value], index) => (
                                    <div key={index} className="flex items-center gap-2 border-b p-2 last:border-0">
                                      <Input
                                        value={key}
                                        onChange={(e) => {
                                          const newAttributes = { ...selectedElementAttributes }
                                          delete newAttributes[key]
                                          newAttributes[e.target.value] = value
                                          setSelectedElementAttributes(newAttributes)
                                          selectedElement?.removeAttribute(key)
                                          selectedElement?.setAttribute(e.target.value, value)
                                          updatePortfolioHTML()
                                        }}
                                        className="flex-1"
                                        placeholder="Attribute name"
                                      />
                                      <Input
                                        value={value}
                                        onChange={(e) => updateElementAttribute(key, e.target.value)}
                                        className="flex-1"
                                        placeholder="Value"
                                      />
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                          const newAttributes = { ...selectedElementAttributes }
                                          delete newAttributes[key]
                                          setSelectedElementAttributes(newAttributes)
                                          selectedElement?.removeAttribute(key)
                                          updatePortfolioHTML()
                                        }}
                                      >
                                        ×
                                      </Button>
                                    </div>
                                  ))}
                                <Button
                                  variant="ghost"
                                  className="w-full justify-start p-2 text-sm text-muted-foreground"
                                  onClick={() => {
                                    // Use a temporary placeholder name instead of empty string
                                    const newAttributes = { ...selectedElementAttributes, "new-attr": "" }
                                    setSelectedElementAttributes(newAttributes)
                                  }}
                                >
                                  + Add attribute
                                </Button>
                              </div>
                            </div>
                          </div>
                        </SidebarGroupContent>
                      </SidebarGroup>
                    </TabsContent>
                  </Tabs>
                </>
              ) : (
                <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-muted p-6">
                    <Palette className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium">No Element Selected</h3>
                  <p className="mb-6 text-sm text-muted-foreground">
                    Click on any element in your portfolio to customize it.
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 rounded-md border bg-muted/50 p-2 text-sm">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span>Hover over elements to highlight them</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-md border bg-muted/50 p-2 text-sm">
                      <Settings className="h-4 w-4 text-muted-foreground" />
                      <span>Click an element to edit its properties</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-md border bg-muted/50 p-2 text-sm">
                      <Save className="h-4 w-4 text-muted-foreground" />
                      <span>Remember to save your changes</span>
                    </div>
                  </div>
                </div>
              )}
            </SidebarContent>

            <SidebarFooter className="border-t p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {history.length > 1 ? `${historyIndex + 1} of ${history.length} changes` : "No changes yet"}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Switch id="highlight-switch" checked={showHighlight} onCheckedChange={setShowHighlight} />
                    <Label htmlFor="highlight-switch" className="text-sm">
                      Highlight Elements
                    </Label>
                  </div>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>

          {/* Main content area */}
          <div className="flex-1 overflow-auto p-4">
            <div className="rounded-lg border bg-card shadow-sm">
              <div className="h-full w-full">
                <iframe
                  ref={iframeRef}
                  title="Portfolio Preview"
                  className="h-[calc(100vh-8rem)] w-full rounded-lg"
                  sandbox="allow-same-origin allow-scripts"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

