"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Chrome, ChromeIcon as Firefox, CheckCircle, XCircle, Trash2 } from "lucide-react"
import type { ConversionHistoryItem } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ConversionHistoryProps {
  history: ConversionHistoryItem[]
}

export function ConversionHistory({ history }: ConversionHistoryProps) {
  const [localHistory, setLocalHistory] = useState<ConversionHistoryItem[]>(history)

  const clearHistory = () => {
    setLocalHistory([])
  }

  const removeHistoryItem = (id: string) => {
    setLocalHistory((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Conversion History</CardTitle>
          <CardDescription>View your recent extension conversions</CardDescription>
        </div>
        {localHistory.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearHistory}>
            Clear History
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {localHistory.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No conversion history yet</p>
            <p className="text-sm mt-1">Your recent conversions will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {localHistory.map((item) => (
              <div key={item.id} className="flex items-start gap-4 p-4 border rounded-lg relative">
                <div className="flex-shrink-0">
                  {item.originalType === "chrome" ? (
                    <Chrome className="h-6 w-6 text-blue-500" />
                  ) : (
                    <Firefox className="h-6 w-6 text-orange-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{item.originalName}</p>
                    <Badge variant={item.success ? "default" : "destructive"} className="ml-auto">
                      {item.success ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                      {item.success ? "Success" : "Failed"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <span>Converted from</span>
                    <Badge variant="outline" className="font-normal">
                      {item.originalType === "chrome" ? "Chrome" : "Firefox"}
                    </Badge>
                    <span>to</span>
                    <Badge variant="outline" className="font-normal">
                      {item.targetType === "chrome" ? "Chrome" : "Firefox"}
                    </Badge>
                  </div>

                  {!item.success && item.error && (
                    <Alert variant="destructive" className="mt-2 py-2 px-3">
                      <AlertDescription className="text-xs">{item.error}</AlertDescription>
                    </Alert>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 absolute top-2 right-2 opacity-50 hover:opacity-100"
                  onClick={() => removeHistoryItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

