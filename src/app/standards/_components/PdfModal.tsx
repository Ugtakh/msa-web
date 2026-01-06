import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ALL_STANDARDS_QUERYResult } from "../../../../sanity.types";
import PdfViewer from "./PdfViewer";

type PdfModalProps = {
  selectedStandard: ALL_STANDARDS_QUERYResult[0] | null;
  setSelectedStandard: (val: null) => void;
};

const PdfModal = ({ selectedStandard, setSelectedStandard }: PdfModalProps) => {
  return (
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
  );
};

export default PdfModal;
