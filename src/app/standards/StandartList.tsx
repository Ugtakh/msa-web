"use client";

import Footer from "@/components/sections/FooterSection";
import Navbar from "@/components/Header";
import { FileText, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { pdfjs } from "react-pdf";
import PdfViewer from "./PdfViewer";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface Standard {
  code: string;
  title: string;
  titleMn: string;
  description: string;
  descMn: string;
  category: string;
  pdfUrl: string;
}

const Standards = () => {
  const t = useTranslations("standarts");
  const [selectedStandard, setSelectedStandard] = useState<Standard | null>(
    null
  );

  const standards: Standard[] = [
    {
      code: "БНбД 3.05.07-90",
      title: "Automation System",
      titleMn: "АВТОМАТЖУУЛАЛТЫН СИСТЕМ",
      description: "System of normative documents for construction",
      descMn: "Барилгын норматив баримт бичгийн тогтолцоо",
      category: "Automation",
      pdfUrl: "https://www.aeee.in/wp-content/uploads/2020/08/Sample-pdf.pdf",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                {t("title")}
              </h1>
              <p className="text-xl text-muted-foreground  mx-auto">
                {t("subTitle")}
              </p>
            </div>

            {/* Search */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input placeholder={"Стандарт хайх..."} className="pl-10" />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  {"Шүүх"}
                </Button>
              </div>
            </div>

            {/* Standards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {standards.map((standard) => (
                <div
                  key={standard.code}
                  className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                      {standard.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-1">
                    {standard.code}
                  </h3>
                  <h4 className="text-base text-primary mb-2">
                    {standard.titleMn}
                  </h4>
                  <p className="text-sm text-card-foreground/70 mb-4">
                    {standard.descMn}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setSelectedStandard(standard)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    {"PDF үзэх"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>

      {/* PDF Viewer Dialog */}
      <Dialog
        open={!!selectedStandard}
        onOpenChange={() => setSelectedStandard(null)}
      >
        <DialogContent className="sm:w-full md:w-10/12 sm:max-w-none h-[85vh] p-0 overflow-hidden">
          <DialogHeader className="flex flex-row justify-between p-4 border-b border-border">
            <DialogTitle className="text-lg">
              {selectedStandard?.code} - {selectedStandard?.titleMn}
            </DialogTitle>
            {/* <div className="mr-8">
              <a
                href={selectedStandard?.pdfUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  {"Татах"}
                </Button>
              </a>
            </div> */}
          </DialogHeader>
          <div className="w-full h-full overflow-y-auto">
            {selectedStandard && <PdfViewer pdfUrl={selectedStandard.pdfUrl} />}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Standards;
