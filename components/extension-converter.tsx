"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertCircle, Chrome, ChromeIcon as Firefox } from "lucide-react"
import { convertExtension } from "@/lib/converter"
import type { ExtensionFile, ConversionResult, ConversionHistoryItem } from "@/lib/types"
import { FileDropzone } from "@/components/file-dropzone"
import { ConversionHistory } from "@/components/conversion-history"
import { HelpSection } from "@/components/help-section"

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

export default function ExtensionConverter() {
  const [activeTab, setActiveTab] = useState<string>("convert")
  const [file, setFile] = useState<ExtensionFile | null>(null)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [isConverting, setIsConverting] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const [result, setResult] = useState<ConversionResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<ConversionHistoryItem[]>([])

  const handleFileSelect = (selectedFile: File) => {
    setError(null)
    setResult(null)

    // Validate file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError(`File size exceeds the maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`)
      return
    }

    // Validate file extension
    const extension = selectedFile.name.split(".").pop()?.toLowerCase()
    if (extension !== "crx" && extension !== "xpi") {
      setError("Only .crx (Chrome) and .xpi (Firefox) files are supported")
      return
    }

    const fileType = extension === "crx" ? "chrome" : "firefox"

    setFile({
      file: selectedFile,
      name: selectedFile.name,
      size: selectedFile.size,
      type: fileType,
    })
  }

  const handleConvert = async () => {
    if (!file) return

    setIsConverting(true)
    setProgress(0)
    setError(null)
    setResult(null)

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 10
          return newProgress < 90 ? newProgress : prev
        })
      }, 300)

      // Simulate conversion process
      const conversionResult = await convertExtension(file, (progress) => {
        setProgress(progress)
      })

      clearInterval(progressInterval)
      setProgress(100)

      // Add to history
      const historyItem: ConversionHistoryItem = {
        id: Date.now().toString(),
        timestamp: new Date(),
        originalName: file.name,
        originalType: file.type,
        targetType: file.type === "chrome" ? "firefox" : "chrome",
        success: true,
      }

      setHistory((prev) => [historyItem, ...prev])
      setResult(conversionResult)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")

      // Add failed conversion to history
      const historyItem: ConversionHistoryItem = {
        id: Date.now().toString(),
        timestamp: new Date(),
        originalName: file.name,
        originalType: file.type,
        targetType: file.type === "chrome" ? "firefox" : "chrome",
        success: false,
        error: err instanceof Error ? err.message : "An unknown error occurred",
      }

      setHistory((prev) => [historyItem, ...prev])
    } finally {
      setIsConverting(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setProgress(0)
    setResult(null)
    setError(null)
  }

  const handleDownload = () => {
    if (!result || !result.downloadUrl) return

    const link = document.createElement("a")
    link.href = result.downloadUrl
    link.download = result.fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="convert" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="convert">Convert</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="help">Help</TabsTrigger>
        </TabsList>

        <TabsContent value="convert" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Convert Browser Extensions</CardTitle>
              <CardDescription>
                Upload a Chrome (.crx) or Firefox (.xpi) extension file to convert it to the other format.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!file ? (
                <FileDropzone
                  onFileSelect={handleFileSelect}
                  isDragging={isDragging}
                  setIsDragging={setIsDragging}
                  maxSize={MAX_FILE_SIZE}
                />
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    {file.type === "chrome" ? (
                      <Chrome className="h-8 w-8 text-blue-500" />
                    ) : (
                      <Firefox className="h-8 w-8 text-orange-500" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024).toFixed(2)} KB • {file.type === "chrome" ? "Chrome" : "Firefox"} Extension
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleReset}>
                      Change
                    </Button>
                  </div>

                  {isConverting ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Converting...</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <Button onClick={handleConvert} className="w-full md:w-auto">
                        Convert to {file.type === "chrome" ? "Firefox" : "Chrome"}
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {error && (
                <Alert variant="destructive" className="mt-6">
                  <XCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {result && (
                <Alert className="mt-6 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertTitle className="text-green-800 dark:text-green-300">Conversion Successful</AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-400">
                    Your {file?.type === "chrome" ? "Chrome" : "Firefox"} extension has been successfully converted to{" "}
                    {file?.type === "chrome" ? "Firefox" : "Chrome"} format.
                  </AlertDescription>
                  <Button
                    onClick={handleDownload}
                    className="mt-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                  >
                    Download Converted Extension
                  </Button>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2 border-t p-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                <span>Maximum file size: {MAX_FILE_SIZE / (1024 * 1024)}MB</span>
              </div>
              <div className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                <span>Supported formats: .crx (Chrome) and .xpi (Firefox)</span>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <ConversionHistory history={history} />
        </TabsContent>

        <TabsContent value="help" className="mt-6">
          <HelpSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}

