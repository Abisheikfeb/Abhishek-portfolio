import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa"; // Spinner Icon
import sample1 from '../../pdf/sample1.pdf';
import sample2 from '../../pdf/sample2.pdf';
import sample3 from '../../pdf/sample3.pdf';
import sample4 from '../../pdf/sample4.pdf';
import sample5 from '../../pdf/sample5.pdf';
import sample6 from '../../pdf/sample6.pdf';
import sample7 from '../../pdf/sample7.pdf';

import img1 from '../../assets/oracle-logo.svg';
import img2 from '../../assets/finger.svg';
import img3 from '../../assets/virus.svg';
import img4 from '../../assets/password.svg';
import img5 from '../../assets/protection.svg';
import img6 from '../../assets/vrification.svg';
import img7 from '../../assets/warning.svg';

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center space-x-2">
    <FaSpinner className="animate-spin text-white" />
    <span>Downloading...</span>
  </div>
);

const PdfDownloadCard = () => {
  const [loadingIndex, setLoadingIndex] = useState(null); // Track loading state

  const pdfFiles = [
    { title: "Oracle Cloud", file: sample1, image: img1 },
    { title: "Threat Modeling", file: sample2, image: img2 },
    { title: "Security Standards and Regulations", file: sample3, image: img3 },
    { title: "Cyber Security", file: sample4, image: img4 },
    { title: "Identity Governance and Administration", file: sample5, image: img5 },
    { title: "Ethical Hacker: Risk Assessment", file: sample6, image: img6 },
    { title: "Cyber Security Audits", file: sample7, image: img7 },
  ];

  const handleDownload = async (fileUrl, title, index) => {
    setLoadingIndex(index); 
    try {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = `${title.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setTimeout(() => setLoadingIndex(null), 2000); 
    }
  };

  return (
    <div id="certificate" className="mt-12">
      <h1 className="text-center font-bold mt-10 text-4xl">
        <span className="text-red-500 text-5xl">C</span>ertificates
      </h1>
      <div className="grid place-items-center grid-cols-1 md:grid-cols-3 gap-6 p-10">
        {pdfFiles.map((pdf, index) => (
          <div
            key={index}
            className="bg-gray-300 shadow-lg rounded-lg p-6 h-72 w-72 flex flex-col items-center justify-between border border-gray-200 hover:shadow-2xl transition-shadow"
          >
            <img
              src={pdf.image}
              alt={`PDF ${index + 1}`}
              className="w-32 h-32 object-cover rounded-lg mb-4 border-2 border-red-400 shadow-lg"
            />
            <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">
              {pdf.title}
            </h3>
            <button
              onClick={() => handleDownload(pdf.file, pdf.title, index)}
              className={`flex items-center justify-center px-4 py-2 text-white rounded-full transition ${
                loadingIndex === index
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-300 hover:bg-blue-700 border-2 border-red-500"
              }`}
              disabled={loadingIndex === index}
              aria-label={`Download ${pdf.title}`}
            >
              {loadingIndex === index ? <LoadingSpinner /> : (
                <>
                  <span>Download</span>
                  <FaDownload className="ml-2" />
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PdfDownloadCard;

