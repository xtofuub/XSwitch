import type { Metadata } from "next"
import ExtensionConverter from "@/components/extension-converter"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"

export const metadata: Metadata = {
  title: "Browser Extension Converter",
  description: "Convert browser extensions between Chrome and Firefox formats",
}

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background flex flex-col">
        <header className="border-b">
          <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">Browser Extension Converter</h1>
            </div>
            <ModeToggle />
          </div>
        </header>
        <main className="flex-1 container py-6 md:py-12 px-4 md:px-6">
          <ExtensionConverter />
        </main>
        <footer className="border-t py-6">
          <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6 text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Browser Extension Converter. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">Built with Next.js and Tailwind CSS</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}

