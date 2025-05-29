"use client";

import { useEffect, useState } from "react";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookieConsent");
    if (!accepted) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white p-4 rounded-xl shadow-lg border z-50 max-w-md mx-auto">
      <p className="text-sm text-gray-700 mb-2">
        Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{" "}
        <a href="/privacy-policy" className="underline text-pink-600" target="_blank" rel="noopener noreferrer">
          Política de Privacidade
        </a>.
      </p>
      <div className="text-right">
        <button
          onClick={handleAccept}
          className="bg-pink-600 text-white px-4 py-2 text-sm rounded hover:bg-pink-700 transition cursor-pointer"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
