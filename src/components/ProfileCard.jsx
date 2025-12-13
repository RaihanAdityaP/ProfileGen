import { useRef, useState, useMemo } from 'react';
import html2canvas from 'html2canvas';
import './ProfileCard.css';

function ProfileCard({ data, dimensions = { width: 420, height: 500 } }) {
  const cardRef = useRef();
  const [isDownloading, setIsDownloading] = useState(false);

  // Calculate scale factor based on card size
  const scale = useMemo(() => {
    const baseWidth = 420;
    return Math.min(dimensions.width / baseWidth, 1.2);
  }, [dimensions.width]);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        backgroundColor: null,
        logging: false,
        useCORS: true,
      });
      
      const link = document.createElement('a');
      link.download = `profile-card-${data.name.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
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

            {data.bio && (
              <p className="card-bio">{data.bio}</p>
            )}

            {/* Contact Grid */}
            {(data.email || data.phone) && (
              <div className="contact-grid">
                {data.email && (
                  <div className="contact-box">
                    <div className="contact-icon">
                      <i className="bi bi-envelope-fill"></i>
                    </div>
                    <div className="contact-info">
                      <span className="contact-label">Email</span>
                      <span className="contact-value">{data.email}</span>
                    </div>
                  </div>
                )}
                {data.phone && (
                  <div className="contact-box">
                    <div className="contact-icon">
                      <i className="bi bi-telephone-fill"></i>
                    </div>
                    <div className="contact-info">
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