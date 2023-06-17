import React from "react";

const DownloadButton = (data) => {
  const handleDownload = () => {
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: "application/json" });

    // Tạo đường dẫn URL cho đối tượng Blob
    const blobURL = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobURL;
    link.download = "data.txt"; // Tên tệp tin

    // Simulate a click event to trigger the download
    const clickEvent = new MouseEvent("click");
    link.dispatchEvent(clickEvent);

    // Thu hồi URL đối tượng Blob
    URL.revokeObjectURL(blobURL);
  };

  return <button onClick={handleDownload}>Download Data</button>;
};

export default DownloadButton;
