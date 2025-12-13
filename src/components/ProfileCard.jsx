import { useRef, useState, useMemo } from 'react';
import html2canvas from 'html2canvas';
import './ProfileCard.css';

function ProfileCard({ data, dimensions = { width: 420, height: 500 } }) {
  const cardRef = useRef();
  const [isDownloading, setIsDownloading] = useState(false);

  const scale = useMemo(() => {
    const baseWidth = 420;
    return Math.min(dimensions.width / baseWidth, 1.2);
  }, [dimensions.width]);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    setIsDownloading(true);

    try {
      // 1. Clone elemen asli
      const original = cardRef.current;
      const clone = original.cloneNode(true);

      // 2. Atur posisi clone agar bisa dirender oleh html2canvas (tapi tidak mengganggu UI)
      clone.style.position = 'fixed';
      clone.style.top = '0';
      clone.style.left = '0';
      clone.style.zIndex = '-1'; // di belakang semua elemen
      clone.style.opacity = '0'; // transparan
      clone.style.pointerEvents = 'none';
      clone.style.transform = 'none';
      clone.style.transition = 'none';
      clone.style.width = `${dimensions.width}px`;
      clone.style.height = `${dimensions.height}px`;

      document.body.appendChild(clone);

      // 3. Paksa semua elemen dalam clone ke state akhir (terlihat penuh)
      const forceVisible = (node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          node.style.opacity = '1';
          node.style.transform = 'none';
          node.style.filter = 'none';
          node.style.animation = 'none';
          node.style.transition = 'none';
          node.style.textShadow = 'none';
          node.style.boxShadow = 'none';
          node.style.background = getComputedStyle(node).background; // pertahankan background
          for (const child of node.children) {
            forceVisible(child);
          }
        }
      };

      forceVisible(clone);

      // 4. Tunggu sebentar agar browser merender clone
      await new Promise(resolve => setTimeout(resolve, 100));

      // 5. Ambil screenshot — pastikan background sesuai
      const canvas = await html2canvas(clone, {
        scale: 3,
        backgroundColor: null, // biarkan transparan jika mau
        logging: false,
        useCORS: true,
        allowTaint: false,
        letterRendering: true,
      });

      // 6. Hapus clone
      document.body.removeChild(clone);

      // 7. Download
      const filename = `profile-card-${(data.name || 'user').replace(/\s+/g, '-').toLowerCase()}.png`;
      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating card:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="card-container">
      {/* Card Preview */}
      <div
        ref={cardRef}
        className="modern-card"
        style={{
          '--card-width': `${dimensions.width}px`,
          '--card-height': `${dimensions.height}px`,
          '--scale-factor': scale,
        }}
      >
        <div className="card-gradient"></div>
        <div className="card-pattern"></div>

        <div className="card-inner">
          {/* Profile Photo */}
          <div className="photo-wrapper">
            {data.photo ? (
              <img
                src={URL.createObjectURL(data.photo)}
                className="profile-img"
                alt="Profile"
              />
            ) : (
              <div className="profile-placeholder">
                <i className="bi bi-person-circle"></i>
              </div>
            )}
            <div className="photo-ring"></div>
          </div>

          {/* Profile Details */}
          <div className="card-details">
            <h2 className="card-name">{data.name || 'Your Name'}</h2>

            {data.role && (
              <div className="card-role">
                <i className="bi bi-briefcase-fill"></i>
                <span>{data.role}</span>
              </div>
            )}

            {data.bio && <p className="card-bio">{data.bio}</p>}

            {(data.email || data.phone) && (
              <div className="contact-grid">
                {data.email && (
                  <div className="contact-box">
                    <i className="bi bi-envelope-fill"></i>
                    <div>
                      <span className="contact-label">Email</span>
                      <span className="contact-value">{data.email}</span>
                    </div>
                  </div>
                )}
                {data.phone && (
                  <div className="contact-box">
                    <i className="bi bi-telephone-fill"></i>
                    <div>
                      <span className="contact-label">Phone</span>
                      <span className="contact-value">{data.phone}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="card-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="download-btn"
        style={{ maxWidth: `${dimensions.width}px` }}
        disabled={isDownloading}
      >
        {isDownloading ? (
          <>
            <span className="spinner"></span>
            Generating...
          </>
        ) : (
          <>
            <i className="bi bi-download"></i>
            Download Card
          </>
        )}
      </button>
    </div>
  );
}

export default ProfileCard;