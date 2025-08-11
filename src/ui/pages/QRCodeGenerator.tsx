import { QRCodeCanvas } from "qrcode.react";
import React, { useRef, useState } from "react";
import Logo from "../../assets/qr-tof-bike.png";

const QRCodeGenerator: React.FC = () => {
  const [url, setUrl] = useState("");
  const qrRef = useRef<HTMLCanvasElement>(null);

  function downloadQR() {
    if (!qrRef.current) return;

    // Récupérer le canvas du QR généré
    const qrCanvas = qrRef.current;
    const qrWidth = qrCanvas.width;
    const qrHeight = qrCanvas.height;

    // Définir la bordure autour
    const borderSize = 20;

    // Créer un canvas final plus grand
    const canvas = document.createElement("canvas");
    canvas.width = qrWidth + borderSize * 2;
    canvas.height = qrHeight + borderSize * 2;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fond blanc
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dessiner le QR code centré
    ctx.drawImage(qrCanvas, borderSize, borderSize);

    // Dessiner le logo au centre
    const logo = new Image();
    logo.src = Logo; // chemin vers ton image
    logo.onload = () => {
      const logoSize = qrWidth * 0.2; // 20% de la taille du QR
      const x = (canvas.width - logoSize) / 2;
      const y = (canvas.height - logoSize) / 2;
      ctx.drawImage(logo, x, y, logoSize, logoSize);

      // Télécharger le PNG
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "qrcode.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="mb-4 text-center text-2xl font-bold">
        Générateur de QR Code
      </h1>

      <input
        type="text"
        placeholder="Entrez un lien..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="mb-4 w-full max-w-md rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      {url && (
        <div className="relative inline-block">
          {/* QR Code */}
          <QRCodeCanvas value={url} size={200} level="H" ref={qrRef} />

          {/* Logo centré */}
          <img
            src={Logo}
            alt="Logo"
            className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 bg-white p-1"
          />
        </div>
      )}

      {url && (
        <button
          onClick={downloadQR}
          className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Télécharger en PNG
        </button>
      )}
    </div>
  );
};

export default QRCodeGenerator;
