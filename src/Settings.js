import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

function Settings() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [settings, setSettings] = useState({
    pin: "1234",
    stickerWidth: "50",
    stickerHeight: "25",
    rollWidth: "105",
    gapBetweenStickers: "0.2",
    unit: "mm",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Load settings from localStorage first, then fall back to settings.json
    const savedSettings = localStorage.getItem("printerSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    } else {
      // Load settings from public/settings.json
      fetch("/settings.json")
        .then((response) => response.json())
        .then((data) => {
          setSettings(data);
        })
        .catch((err) => {
          console.error("Error loading settings:", err);
          setError("Failed to load settings");
        });
    }
  }, []);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === settings.pin) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid PIN. Please try again.");
      setPinInput("");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveSettings = () => {
    // Save settings to localStorage
    localStorage.setItem("printerSettings", JSON.stringify(settings));
    
    setMessage("Settings saved successfully! Changes will take effect immediately.");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  if (!isAuthenticated) {
    return (
      <div className="settings-container">
        <div className="pin-card">
          <h2>🔒 Settings Access</h2>
          <p>Enter PIN to access settings</p>
          <form onSubmit={handlePinSubmit}>
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Enter PIN"
              className="pin-input"
              maxLength="6"
              autoFocus
            />
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="btn-submit">
              Unlock
            </button>
          </form>
          <button onClick={handleBackToHome} className="btn-back">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-container">
      <div className="settings-card">
        <h2>⚙️ Printer Settings</h2>

        {message && <div className="success-message">{message}</div>}

        <div className="settings-form">
          <div className="dimensions-row">
            <div className="form-group">
              <label htmlFor="stickerWidth">Sticker Width ({settings.unit})</label>
              <input
                type="number"
                id="stickerWidth"
                name="stickerWidth"
                value={settings.stickerWidth}
                onChange={handleInputChange}
                step="0.1"
                min="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="stickerHeight">Sticker Height ({settings.unit})</label>
              <input
                type="number"
                id="stickerHeight"
                name="stickerHeight"
                value={settings.stickerHeight}
                onChange={handleInputChange}
                step="0.1"
                min="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="rollWidth">Roll Width ({settings.unit})</label>
              <input
                type="number"
                id="rollWidth"
                name="rollWidth"
                value={settings.rollWidth}
                onChange={handleInputChange}
                step="0.1"
                min="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gapBetweenStickers">
                Gap Between Stickers ({settings.unit})
              </label>
              <input
                type="number"
                id="gapBetweenStickers"
                name="gapBetweenStickers"
                value={settings.gapBetweenStickers}
                onChange={handleInputChange}
                step="0.1"
                min="0"
              />
            </div>
          </div>

          <div className="pin-row">
            <div className="form-group">
              <label htmlFor="pin">Change PIN</label>
              <input
                type="password"
                id="pin"
                name="pin"
                value={settings.pin}
                onChange={handleInputChange}
                maxLength="6"
              />
            </div>
          </div>

          <div className="button-group">
            <button onClick={handleSaveSettings} className="btn-save">
              💾 Save Settings
            </button>
            <button onClick={handleBackToHome} className="btn-back">
              ← Back to Home
            </button>
          </div>

          <div className="info-box">
            <strong>ℹ️ Instructions:</strong>
            <ol>
              <li>Modify the settings as needed</li>
              <li>Click "Save Settings" to apply changes</li>
              <li>Settings are saved in browser and take effect immediately</li>
              <li>To reset to defaults, clear browser data or reload settings.json</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
