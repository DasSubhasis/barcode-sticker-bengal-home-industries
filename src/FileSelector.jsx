// import React, { useEffect } from "react";

// function FileSelector({ onFileSelect, hideFileInput }) {
//   useEffect(() => {
//     // Adding a timestamp to the fetch URL to prevent caching
//     const defaultFile = "/Barcode.json";
    
//     fetch(defaultFile)
//       .then((response) => response.json())
//       .then((data) => onFileSelect(data))
//       .catch((error) => console.error("Error fetching default file:", error));
//   }, [onFileSelect]);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const data = JSON.parse(e.target.result);
//         onFileSelect(data);
//       };
//       reader.readAsText(file);
//     }
//   };

//   if (hideFileInput) {
//     return null;
//   }

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//     </div>
//   );
// }

// export default FileSelector;

import React, { useEffect } from "react";

function FileSelector({ onFileSelect, hideFileInput }) {
  useEffect(() => {
    const fetchData = () => {
      // Adding a timestamp to the fetch URL to prevent caching
      const defaultFile = `/Barcode.json?t=${new Date().getTime()}`;

      fetch(defaultFile)
        .then((response) => response.json())
        .then((data) => onFileSelect(data))
        .catch((error) => console.error("Error fetching default file:", error));
    };

    // Initial fetch
    fetchData();

    // Set up an interval to refetch the data periodically if needed
    const interval = setInterval(fetchData, 30000); // 30 seconds interval

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [onFileSelect]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        onFileSelect(data);
      };
      reader.readAsText(file);
    }
  };

  if (hideFileInput) {
    return null;
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}

export default FileSelector;
