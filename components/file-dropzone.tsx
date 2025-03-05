"use client"

import type React from "react"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, FileUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileDropzoneProps {
  onFileSelect: (file: File) => void
  isDragging: boolean
  setIsDragging: (isDragging: boolean) => void
  maxSize: number
}

export function FileDropzone({ onFileSelect, isDragging, setIsDragging, maxSize }: FileDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0])
    }
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-12 text-center transition-colors",
        isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div
          className={cn("p-4 rounded-full bg-background transition-colors", isDragging ? "bg-primary/10" : "bg-muted")}
        >
          <Upload className={cn("h-8 w-8", isDragging ? "text-primary" : "text-muted-foreground")} />
        </div>
        <div>
          <p className="font-medium mb-1">{isDragging ? "Drop your file here" : "Drag and drop your extension file"}</p>
          <p className="text-sm text-muted-foreground mb-4">
            Supports .crx (Chrome) and .xpi (Firefox) files up to {maxSize / (1024 * 1024)}MB
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept=".crx,.xpi"
            className="hidden"
          />
          <Button type="button" variant="outline" onClick={handleButtonClick} className="gap-2">
            <FileUp className="h-4 w-4" />
            Select File
          </Button>
        </div>
      </div>
    </div>
  )
}

