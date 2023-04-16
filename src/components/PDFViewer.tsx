import { useState, useEffect, useRef, useLayoutEffect } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as pdfjs from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?worker";
import { Button } from "antd";

const init = () => {
  try {
    if (typeof window === "undefined" || !("Worker" in window)) {
      throw new Error("Web Workers not supported in this environment.");
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.pdfjsWorker = pdfjsWorker;
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  } catch (error) {
    console.log(error);
  }
};

interface Props {
  url: string;
}

const PdfViewer = ({ url }: Props) => {
  const [pdfDoc, setPdfDoc] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [pageNum, setPageNum] = useState<number>(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    init();
  }, []);

  useEffect(() => {
    pdfjs?.getDocument(url).promise.then((pdfDoc: pdfjs.PDFDocumentProxy) => {
      setPdfDoc(pdfDoc);
    });
  }, [url]);

  useEffect(() => {
    if (!pdfDoc) return;
    pdfDoc.getPage(pageNum).then((page: any) => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      const viewport = page.getViewport({ scale: 1.7 });
      if (canvas) {
        canvas.height = viewport.height;
        canvas.width = viewport.width;
      }
      if (context) page.render({ canvasContext: context, viewport });
    });
  }, [pdfDoc, pageNum]);

  const handlePreviousPage = () => {
    if (pageNum <= 1) return;
    setPageNum(pageNum - 1);
  };

  const handleNextPage = () => {
    if (pageNum >= Number(pdfDoc?.numPages)) return;
    setPageNum(pageNum + 1);
  };

  return (
    <div className="text-center">
      <div className="flex flex-row justify-center items-center">
        <Button disabled={pageNum <= 1} onClick={handlePreviousPage}>
          Previous
        </Button>
        <canvas ref={canvasRef} />
        <Button
          disabled={pageNum >= Number(pdfDoc?.numPages)}
          onClick={handleNextPage}
        >
          Next
        </Button>
      </div>
      <div className="page-nav">
        <span>
          {pageNum} / {pdfDoc ? pdfDoc.numPages : "-"}
        </span>
      </div>
    </div>
  );
};

export default PdfViewer;
