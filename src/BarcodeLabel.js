import React, { useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";

const BarcodeLabel = React.forwardRef((props, ref) => {
  const [config, setConfig] = useState(null); // Store the config
  const [settings, setSettings] = useState(null); // Store the settings
  const barcodeRefs = useRef([React.createRef(), React.createRef()]);

  // Fetch config.json and settings.json files
  useEffect(() => {
    // Check localStorage first for settings
    const savedSettings = localStorage.getItem("printerSettings");
    
    if (savedSettings) {
      Promise.all([
        fetch("/config.json").then((response) => response.json()),
      ])
        .then(([configData]) => {
          setConfig(configData);
          setSettings(JSON.parse(savedSettings));
        })
        .catch((error) => {
          console.error("Error fetching configuration:", error);
        });
    } else {
      Promise.all([
        fetch("/config.json").then((response) => response.json()),
        fetch("/settings.json").then((response) => response.json()),
      ])
        .then(([configData, settingsData]) => {
          setConfig(configData);
          setSettings(settingsData);
        })
        .catch((error) => {
          console.error("Error fetching configuration:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (config && settings) {
      // Generate barcodes for visible labels
      const refsToUse = props.isPair
        ? barcodeRefs.current
        : [barcodeRefs.current[0]];
      refsToUse.forEach((barcodeRef) => {
        JsBarcode(barcodeRef.current, props.barcodeValue, {
          format: "CODE128",
          width: 1,
          height: 30,
          fontSize: 8,
          displayValue: false,
          margin: 2,
        });
      });
    }
  }, [props.barcodeValue, config, settings, props.isPair]);

  if (!config || !settings) {
    return <div>Loading configuration...</div>; // Display loading until config is fetched
  }

  const {
    container,
    labelBox,
    headerPanel,
    gapBetweenLabel,
    bodyPanel,
    footerPanel,
  } = config;

  // Use settings for dimensions
  const containerWidth = settings.rollWidth + settings.unit;
  const containerHeight = settings.stickerHeight + settings.unit;
  const labelWidth = settings.stickerWidth + settings.unit;
  const labelHeight = settings.stickerHeight + settings.unit;
  const labelGap = settings.gapBetweenStickers + settings.unit;

  const Label = ({ barcodeRef }) => (
    <div
      style={{
        width: labelWidth,
        height: labelHeight,
        border: "none",
        borderRadius: "5px",
        textAlign: "center",
        fontSize: 10,
        fontWeight: "bolder",
        paddingTop: labelBox.paddingTop,
        paddingLeft: labelBox.paddingLeft,
        paddingBottom: labelBox.paddingBottom,
        marginTop: "1mm",
      }}
    >
      <div
        style={{
          textAlign: "center",
          paddingTop: headerPanel.paddingTop,
          paddingLeft: headerPanel.paddingLeft,
          paddingBottom: "0mm",
          marginBottom: "0mm",
          lineHeight: 0.9,
        }}
      >
        <div>{props.orgName}</div>
        <div>Ph.No:{props.phNumber}</div>
      </div>
      <div
        style={{
          fontSize: 10,
          textAlign: "left",
          paddingTop: bodyPanel.paddingTop,
          paddingLeft: bodyPanel.paddingLeft,
          paddingBottom: "0mm",
          marginBottom: "0.5mm",
        }}
      >
        <table style={{ borderSpacing: 0, width: "100%" }}>
          <tbody>
            <tr style={{ height: "1px" }}>
              <td style={{ lineHeight: 0.8, width: "50%" }}>{props.itemName}</td>
              <td style={{ lineHeight: 0.8, width: "50%", textAlign: "right", paddingRight: bodyPanel.paddingLeft }}>{props.godownCode}</td>
            </tr>
            <tr style={{ height: "1px" }}>
              <td style={{ lineHeight: 0.8, width: "50%" }}>MRP- {props.mrp}</td>
              <td style={{ lineHeight: 0.8, width: "50%", textAlign: "right", paddingRight: bodyPanel.paddingLeft }}>Qty- {props.quantity}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <svg
        ref={barcodeRef}
        style={{ maxWidth: "100%", width: "100%", height: "20px", display: "block", margin: "-3mm 0 -3mm 0" }}
      />
      <div
        style={{
          fontSize: 9,
          textAlign: "center",
          paddingTop: "0mm",
          marginTop: "-0.5mm",
          paddingLeft: footerPanel.paddingLeft,
          paddingBottom: footerPanel.paddingBottom,
        }}
      >
        {props.special_code}
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: containerWidth,
        height: containerHeight,
        border: container.border === "yes" ? "1px solid black" : "none",
        paddingTop: container.paddingTop,
        paddingLeft: container.paddingLeft,
        paddingBottom: container.paddingBottom,
        FontFace: "Courier",
      }}
    >
      <Label barcodeRef={barcodeRefs.current[0]} />
      {props.isPair && (
        <>
          <div style={{ paddingLeft: labelGap }}></div>
          <Label barcodeRef={barcodeRefs.current[1]} />
        </>
      )}
    </div>
  );
});

export default BarcodeLabel;
