"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Chrome, ChromeIcon as Firefox, HelpCircle, FileUp, Download, AlertCircle } from "lucide-react"

export function HelpSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Help & Information</CardTitle>
        <CardDescription>Learn how to use the Browser Extension Converter</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tutorial">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tutorial">Tutorial</TabsTrigger>
            <TabsTrigger value="formats">Format Requirements</TabsTrigger>
            <TabsTrigger value="browsers">Supported Browsers</TabsTrigger>
          </TabsList>

          <TabsContent value="tutorial" className="mt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">How to Convert Browser Extensions</h3>
              <p className="text-muted-foreground">
                Follow these simple steps to convert your browser extensions between Chrome and Firefox formats.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary">
                      <FileUp className="h-4 w-4" />
                    </div>
                    <CardTitle className="text-base">Step 1: Upload</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm">
                  <p>
                    Drag and drop your .crx (Chrome) or .xpi (Firefox) extension file into the upload area, or click to
                    select a file.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary">
                      <HelpCircle className="h-4 w-4" />
                    </div>
                    <CardTitle className="text-base">Step 2: Convert</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm">
                  <p>
                    Click the "Convert" button to start the conversion process. The system will automatically detect the
                    source format and convert it to the other format.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary">
                      <Download className="h-4 w-4" />
                    </div>
                    <CardTitle className="text-base">Step 3: Download</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm">
                  <p>
                    Once the conversion is complete, click the "Download" button to save your converted extension file
                    to your device.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="formats" className="mt-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="crx">
                <AccordionTrigger className="flex items-center gap-2">
                  <Chrome className="h-5 w-5 text-blue-500" />
                  <span>Chrome Extensions (.crx)</span>
                </AccordionTrigger>
                <AccordionContent className="pl-9 space-y-2">
                  <p>
                    Chrome extensions use the .crx file format, which is essentially a ZIP file with a special header.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Must contain a valid manifest.json file (manifest v2 or v3)</li>
                    <li>Size limit: {50}MB</li>
                    <li>Should not be password protected or encrypted</li>
                    <li>Extensions from the Chrome Web Store are already in .crx format</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="xpi">
                <AccordionTrigger className="flex items-center gap-2">
                  <Firefox className="h-5 w-5 text-orange-500" />
                  <span>Firefox Extensions (.xpi)</span>
                </AccordionTrigger>
                <AccordionContent className="pl-9 space-y-2">
                  <p>
                    Firefox extensions use the .xpi file format, which is a ZIP file containing the extension's files.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Must contain a valid manifest.json file</li>
                    <li>Size limit: {50}MB</li>
                    <li>Should not be password protected or encrypted</li>
                    <li>Extensions from Firefox Add-ons are already in .xpi format</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="limitations">
                <AccordionTrigger className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  <span>Conversion Limitations</span>
                </AccordionTrigger>
                <AccordionContent className="pl-9 space-y-2">
                  <p>While our converter handles most extensions, there are some limitations to be aware of:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Extensions using browser-specific APIs may not function correctly after conversion</li>
                    <li>Manifest V3 extensions may have compatibility issues when converted to Firefox</li>
                    <li>Extensions with native components cannot be automatically converted</li>
                    <li>Signed extensions will need to be re-signed after conversion</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="browsers" className="mt-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Chrome className="h-6 w-6 text-blue-500" />
                  <h3 className="text-lg font-medium">Chrome & Chromium-based Browsers</h3>
                </div>
                <div className="pl-8 space-y-2">
                  <p className="text-sm text-muted-foreground">Supported browsers for .crx extensions:</p>
                  <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 pl-5 text-sm">
                    <li>Google Chrome 64+</li>
                    <li>Microsoft Edge 79+</li>
                    <li>Brave Browser</li>
                    <li>Opera 51+</li>
                    <li>Vivaldi</li>
                    <li>Chromium</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Firefox className="h-6 w-6 text-orange-500" />
                  <h3 className="text-lg font-medium">Firefox & Firefox-based Browsers</h3>
                </div>
                <div className="pl-8 space-y-2">
                  <p className="text-sm text-muted-foreground">Supported browsers for .xpi extensions:</p>
                  <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 pl-5 text-sm">
                    <li>Firefox 67+</li>
                    <li>Firefox Developer Edition</li>
                    <li>Firefox Nightly</li>
                    <li>Firefox ESR</li>
                    <li>Waterfox</li>
                    <li>LibreWolf</li>
                  </ul>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Note:</strong> While the converter supports these browsers, some extensions may have
                  browser-specific features that won't work after conversion. Always test your converted extensions
                  thoroughly.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

