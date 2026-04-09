import React, { useState } from "react";
import { FaDownload, FaSpinner } from "react-icons/fa";

// Imports (Assuming these paths remain the same)
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

const PdfDownloadCard = () => {
  const [loadingIndex, setLoadingIndex] = useState(null);

  const pdfFiles = [
    { title: "Oracle Cloud", file: sample1, image: img1 },
    { title: "Threat Modeling", file: sample2, image: img2 },
    { title: "Security Standards", file: sample3, image: img3 },
    { title: "Cyber Security", file: sample4, image: img4 },
    { title: "Identity Governance", file: sample5, image: img5 },
    { title: "Risk Assessment", file: sample6, image: img6 },
    { title: "Security Audits", file: sample7, image: img7 },
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
      setTimeout(() => setLoadingIndex(null), 1500);
    }
  };

  return (
    <div id="certificate" className="min-h-screen bg-[#f8fafc] py-20 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-red-500 font-bold tracking-widest uppercase text-sm mb-3">My Achievements</h2>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
          Official <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Certifications.</span>
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          A collection of my professional credentials and technical specializations in Cybersecurity and Cloud.
        </p>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {pdfFiles.map((pdf, index) => (
          <div
            key={index}
            className="group bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-red-500/5 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
          >
            {/* Image Container */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-red-500/10 rounded-2xl blur-xl group-hover:bg-red-500/20 transition-colors"></div>
              <img
                src={pdf.image}
                alt={pdf.title}
                className="relative w-24 h-24 md:w-28 md:h-28 object-contain p-4 bg-white rounded-2xl border border-slate-50 shadow-inner"
              />
            </div>

            {/* Content */}
            <div className="flex-grow flex flex-col justify-center mb-6">
              <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-red-600 transition-colors">
                {pdf.title}
              </h3>
              <p className="text-xs text-slate-400 mt-2 uppercase tracking-widest font-semibold">Verified Credential</p>
            </div>

            {/* Action Button */}
            <button
              onClick={() => handleDownload(pdf.file, pdf.title, index)}
              disabled={loadingIndex === index}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all active:scale-95 ${
                loadingIndex === index
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-slate-900 text-white hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30"
              }`}
            >
              {loadingIndex === index ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Download PDF</span>
                  <FaDownload className="text-xs" />
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