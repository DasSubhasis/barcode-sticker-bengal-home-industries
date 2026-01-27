// src/App.js
import React from "react";
import PrintBarcode from "./PrintBarcode";
import Zicorp from "./Zicorp.png";

function App() {
  return (
    <div className="App">
      <div
        style={{
          float: "right",
          padding: "5px", // Optional padding
        }}
      >
        <img
          src={Zicorp}
          alt="Company Logo"
          style={{ maxWidth: "70px", height: "auto" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "10px",
          color: "light-blue",
        }}
      >
        <img
          src="price-tag.png"
          alt="barcode-label"
          width={"35px"}
          height={"35px"}
        ></img>{" "}
        <h1>Label Printing</h1>
      </div>
      <PrintBarcode />
    </div>
  );
}

export default App;
