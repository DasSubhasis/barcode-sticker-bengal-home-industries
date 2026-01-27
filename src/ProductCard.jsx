import React from "react";
import BarcodeLabel from "./BarcodeLabel";

function ProductCard({ barcode }) {
  const { Code, Batch, ManufacturingDate } = barcode;

  return (
    <div style={{ padding: "0px 0px 0px 25px" }}>
      <br />
      <br />
      <div
        className="product-card card"
        style={{
          width: "70mm",
          height: "30mm",
          border: "1px solid black",
          borderRadius: "5px",
          marginBottom: "3mm",
          marginRight: "4mm",
          fontSize: "11px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "3px 8px 0px 0px",
        }}
      >
        <div className="text-right">
          <b>{Code}</b>
          <br />
          <BarcodeLabel barcodeValue={Batch} />
          <br />
          {`Mfg Date: ${ManufacturingDate}`}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
