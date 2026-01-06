"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/sections/FooterSection";
import Navbar from "@/components/Header";
import { FileText, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { pdfjs } from "react-pdf";
import PdfViewer from "./PdfViewer";
import type { StandardType } from "@/lib/schemas";
import { getStandards } from "@/actions/standards";
import { ALL_STANDARDS_QUERYResult } from "../../../sanity.types";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Standards = () => {
  const t = useTranslations("standarts");
  const [selectedStandard, setSelectedStandard] = useState<
    ALL_STANDARDS_QUERYResult[0] | null
  >(null);
  const [standards, setStandarts] = useState<ALL_STANDARDS_QUERYResult | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    const rows = await getStandards();
    setStandarts(rows as ALL_STANDARDS_QUERYResult);

    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

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

            {/* Standards Grid */}
            {isLoading ? (
              <div className="flex justify-center">
                <Loader size={30} className="animate-spin" />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {standards?.map((standard) => (
                  <div
                    key={standard.code}
                    className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                        {standard.name}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-1">
                      {standard.name}
                    </h3>
                    <h4 className="text-sm text-muted-foreground mb-1">
                      {standard.code}
                    </h4>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setSelectedStandard(standard);
                      }}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      {"PDF үзэх"}
                    </Button>
                  </div>
                ))}
              </div>
            )}
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
              {selectedStandard?.code}
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
            {selectedStandard && (
              <PdfViewer
                pdfUrl={selectedStandard.standardPdf?.asset?.url ?? ""}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Standards;
