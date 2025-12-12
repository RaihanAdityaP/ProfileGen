import { useRef } from 'react';
import html2canvas from 'html2canvas';
import './ProfileCard.css';

function ProfileCard({ data }) {
  const cardRef = useRef();

  const handleDownload = () => {
    html2canvas(cardRef.current, {
      scale: 2,
      backgroundColor: null,
      logging: false,
    }).then((canvas) => {
      const link = document.createElement('a');
      link.download = `profile-card-${data.name.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  return (
    <div className="profile-card-container">
      <div ref={cardRef} className="profile-card">
        {/* Background Pattern */}
        <div className="card-background"></div>
        
        {/* Card Content */}
        <div className="card-content">
          {/* Profile Photo */}
          <div className="profile-photo-wrapper">
            {data.photo ? (
              <img 
                src={URL.createObjectURL(data.photo)} 
                className="profile-photo" 
                alt="Profile" 
              />
            ) : (
              <div className="profile-photo-placeholder">
                <i className="bi bi-person-circle"></i>
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="profile-info">
            <h2 className="profile-name">{data.name || 'Your Name'}</h2>
            {data.role && (
              <p className="profile-role">
                <i className="bi bi-briefcase-fill me-2"></i>
                {data.role}
              </p>
            )}
            {data.bio && (
              <p className="profile-bio">{data.bio}</p>
            )}
          </div>

          {/* Contact Info */}
          {(data.email || data.phone) && (
            <div className="contact-info">
              {data.email && (
                <div className="contact-item">
                  <i className="bi bi-envelope-fill"></i>
                  <span>{data.email}</span>
                </div>
              )}
              {data.phone && (
                <div className="contact-item">
                  <i className="bi bi-telephone-fill"></i>
                  <span>{data.phone}</span>
                </div>
              )}
            </div>
          )}

          {/* Decorative Elements */}
          <div className="card-decoration">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
            <div className="decoration-circle circle-3"></div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button onClick={handleDownload} className="btn btn-download">
        <i className="bi bi-download me-2"></i>
        Download Card
      </button>
    </div>
  );
}

export default ProfileCard;