"use client";

// import { useState } from "react";
// import { Document, Page } from "react-pdf";

interface PdfViewerProps {
  pdfUrl: string;
}

export default function PdfViewer({ pdfUrl }: PdfViewerProps) {
  // const [numPages, setNumPages] = useState<number>(0);

  return (
    <div
      className="relative h-full w-full overflow-y-auto bg-muted/30"
      // onContextMenu={(e) => e.preventDefault()}
    >
      {/* PDF */}
      <div className="flex justify-center">
        <iframe
          src={pdfUrl}
          className="w-full h-[80vh] rounded-lg border"
          title="PDF Viewer"
        />

        {/* <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<span>Loading PDF…</span>}
        >
          <div className="flex flex-col gap-2">
            {Array.from(new Array(numPages), (_, index) => (
              <div key={index.toString()} className="relative">
                <Page
                  pageNumber={index + 1}
                  width={800}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            ))}
          </div>
        </Document> */}
      </div>
    </div>
  );
}
