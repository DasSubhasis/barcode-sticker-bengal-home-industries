# Settings Configuration Guide

## Overview
The barcode sticker application now supports configurable printer settings that can be changed after the build without recompiling the application.

## Features
- **PIN Protected Settings Page**: Secure access to settings with a 4-6 digit PIN
- **Configurable Dimensions**: Adjust sticker size, roll width, and gap between stickers
- **Post-Build Configuration**: Change settings without rebuilding the application

## Settings Parameters

### Available Settings
- **Sticker Width**: Width of individual sticker labels (default: 50mm)
- **Sticker Height**: Height of individual sticker labels (default: 25mm)
- **Roll Width**: Total width of the label roll (default: 105mm)
- **Gap Between Stickers**: Space between adjacent stickers (default: 0.2mm)
- **PIN**: Security code for accessing settings (default: 1234)

## How to Use

### Accessing Settings Page
1. Open the application in your browser
2. Click the **⚙️ Settings** button on the main page
3. Enter the PIN (default: `1234`)
4. Modify the settings as needed

### Updating Settings After Build

#### Option 1: Using the Settings Page (Recommended)
1. Navigate to Settings page
2. Enter your PIN
3. Modify the values
4. Click "Download Settings"
5. Replace `build/settings.json` with the downloaded file
6. Refresh your browser

#### Option 2: Manual Edit
1. Open `build/settings.json` in a text editor
2. Modify the values:
```json
{
  "pin": "1234",
  "stickerWidth": "50",
  "stickerHeight": "25",
  "rollWidth": "105",
  "gapBetweenStickers": "0.2",
  "unit": "mm"
}
```
3. Save the file
4. Refresh your browser

## Security

### Changing the PIN
1. Access the Settings page with current PIN
2. Update the PIN field
3. Download the updated settings file
4. Replace the settings.json file
5. Use the new PIN for future access

### Important Notes
- Keep your PIN secure
- The PIN is stored in plain text in settings.json
- For production use, consider implementing server-side authentication

## File Locations
- **Development**: `public/settings.json`
- **Production**: `build/settings.json`

## Routes
- `/` - Main application page
- `/settings` - Settings configuration page (PIN protected)

## Troubleshooting

### Settings not applying
- Clear browser cache and refresh
- Verify settings.json is in the correct location
- Check browser console for errors

### Cannot access Settings page
- Ensure you're using the correct PIN
- Check if settings.json file exists
- Verify the file has valid JSON format

### Invalid JSON error
- Use a JSON validator to check settings.json
- Ensure all values are properly quoted
- Check for missing commas or brackets

## Development

### Running in Development Mode
```bash
npm start
```
Settings will be loaded from `public/settings.json`

### Building for Production
```bash
npm run build
```
Make sure to copy `settings.json` to the `build` folder after building.

## Support
For issues or questions, contact your development team.
