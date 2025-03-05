export interface ExtensionFile {
  file: File
  name: string
  size: number
  type: "chrome" | "firefox"
}

export interface ConversionResult {
  fileName: string
  fileSize: number
  originalType: "chrome" | "firefox"
  targetType: "chrome" | "firefox"
  downloadUrl: string
}

export interface ConversionHistoryItem {
  id: string
  timestamp: Date
  originalName: string
  originalType: "chrome" | "firefox"
  targetType: "chrome" | "firefox"
  success: boolean
  error?: string
}

