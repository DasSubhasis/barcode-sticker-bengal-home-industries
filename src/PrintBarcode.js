// PrintBarcode.js
import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import BarcodeLabel from "./BarcodeLabel";
import FileSelector from "./FileSelector";

const PrintBarcode = () => {
  const printContainerRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printContainerRef.current,
  });
  const [barcodes, setBarcodes] = useState([]);
  const [showFileSelector, setShowFileSelector] = useState(true);

  const handleFileSelect = (data) => {
    const filteredData = data.barcode.map((item) => ({
      OrgName: item.orgName,
      PhNumber: item.phNumber,
      ItemName: item.itemName,
      Quantity: item.quantity,
      MRP: item.mrp,
      SpecialCode: item.specialCode,
    }));
    setBarcodes(filteredData);
    setShowFileSelector(false);
  };

  const allBarcodeLabels = barcodes.flatMap((barcode, index) => {
    const pairCount = Math.floor(barcode.Quantity / 2); // Number of pairs
    const hasLeftover = barcode.Quantity % 2 === 1; // Check for odd number
    const labels = [];

    // Add pairs (side by side labels)
    for (let i = 0; i < pairCount; i++) {
      labels.push(
        <div key={`${index}-pair-${i}`} style={{ pageBreakAfter: "always" }}>
          <div>
            <BarcodeLabel
              barcodeValue={barcode.SpecialCode}
              orgName={barcode.OrgName}
              phNumber={barcode.PhNumber}
              itemName={barcode.ItemName}
              quantity={barcode.Quantity}
              mrp={barcode.MRP}
              special_code={barcode.SpecialCode}
              isPair={true}
            />
          </div>
        </div>
      );
    }

    // Add leftover single label (if quantity is odd)
    if (hasLeftover || barcode.Quantity === 1) {
      labels.push(
        <div key={`${index}-single`} style={{ pageBreakAfter: "always" }}>
          <div>
            <BarcodeLabel
              barcodeValue={barcode.SpecialCode}
              orgName={barcode.OrgName}
              phNumber={barcode.PhNumber}
              itemName={barcode.ItemName}
              quantity={barcode.Quantity}
              mrp={barcode.MRP}
              special_code={barcode.SpecialCode}
              isPair={false}
            />
          </div>
        </div>
      );
    }

    return labels;
  });

  return (
    <div>
      <div style={{ margin: "10px" }}>
        <button onClick={handlePrint}>Print Barcode</button>
      </div>
      <div ref={printContainerRef}>
        {showFileSelector && (
          <div style={{ pageBreakAfter: "always" }}>
            <FileSelector
              onFileSelect={handleFileSelect}
              hideFileInput={false}
            />
          </div>
        )}
        {allBarcodeLabels}
      </div>
    </div>
  );
};

export default PrintBarcode;
