import { useRef } from 'react';
import html2canvas from 'html2canvas';

function ProfileCard({ data }) {
  const cardRef = useRef();

  const handleDownload = () => {
    html2canvas(cardRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'profile-card.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="mt-5">
      <div ref={cardRef} className="card" style={{ width: '18rem', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        {data.photo && <img src={URL.createObjectURL(data.photo)} className="card-img-top" alt="Profile Photo" style={{ borderRadius: '15px 15px 0 0' }} />}
        <div className="card-body">
          <h5 className="card-title">{data.name}</h5>
          <p className="card-text">{data.bio}</p>
        </div>
      </div>
      <button onClick={handleDownload} className="btn btn-success mt-3">Download Card</button>
    </div>
  );
}

export default ProfileCard;