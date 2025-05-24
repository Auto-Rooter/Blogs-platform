import { useState, useEffect } from 'react';

const GDPRConsent = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const accepted = localStorage.getItem("gdpr-consent") === "true";
        setVisible(!accepted);
    }, []);

    const accept = () => {
        localStorage.setItem('gdpr-consent', 'true');
        setVisible(false);
    }

    if(!visible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50 bg-gray-900 text-white p-4 rounded shadow-lg max-w-xl mx-auto">
          <p className="text-sm">
            We use browser fingerprinting and IP-based location tracking to help improve content and prevent abuse.
            By continuing to use this site, you acknowledge this practice.
          </p>
          <div className="mt-2 flex justify-end">
            <button
              onClick={accept}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm"
            >
              Accept
            </button>
          </div>
        </div>
      );
}

export default GDPRConsent