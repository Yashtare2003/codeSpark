import React from "react";
import { Document, Page } from "@react-pdf/renderer";

const PdfViewer = ({ pdfUrl }) => {
  return (
    <Document file={pdfUrl}>
      <Page pageNumber={1} />
    </Document>
  );
};

export default PdfViewer;
