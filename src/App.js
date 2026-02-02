// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrintBarcode from "./PrintBarcode";
import Settings from "./Settings";
import Zicorp from "./Zicorp.png";

function HomePage() {
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
