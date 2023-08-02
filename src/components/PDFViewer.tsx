import { useState, useEffect, useRef, useLayoutEffect } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as pdfjs from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?worker";
import { Button, Spin } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

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
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handlePreviousPage = () => {
    if (pageNum <= 1) return;
    setPageNum(pageNum - 1);
  };

  const handleNextPage = () => {
    if (pageNum >= Number(pdfDoc?.numPages)) return;
    setPageNum(pageNum + 1);
  };

  useLayoutEffect(() => {
    init();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    pdfjs?.getDocument(url).promise.then((pdfDoc: pdfjs.PDFDocumentProxy) => {
      setPdfDoc(pdfDoc);
      setIsLoading(false);
    });
  }, [url]);

  useEffect(() => {
    if (!pdfDoc) return;
    pdfDoc.getPage(pageNum).then((page: any) => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      const viewport = page.getViewport({ scale: 1 });
      if (canvas) {
        canvas.height = viewport.height;
        canvas.width = viewport.width;
      }
      if (context) page.render({ canvasContext: context, viewport });
    });
  }, [pdfDoc, pageNum]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePreviousPage();
      }
      if (event.key === "ArrowRight") {
        handleNextPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePreviousPage, handleNextPage]);

  return (
    <div className="text-center w-full">
      {isLoading ? (
        <div>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="flex flex-row justify-evenly items-center w-full">
            <Button
              shape="circle"
              icon={<LeftOutlined />}
              size="large"
              disabled={pageNum <= 1}
              onClick={handlePreviousPage}
              type="text"
              className="bg-black opacity-50 text-white disabled:invisible"
            />
            <canvas ref={canvasRef} />
            <Button
              disabled={pageNum >= Number(pdfDoc?.numPages)}
              onClick={handleNextPage}
              shape="circle"
              icon={<RightOutlined />}
              size="large"
              type="text"
              className="bg-black opacity-50 text-white disabled:invisible"
            />
          </div>
          <div className="fixed bottom-12 left-1/2 right-1/2 w-16">
            <span>
              {pageNum} / {pdfDoc ? pdfDoc.numPages : "-"}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default PdfViewer;
