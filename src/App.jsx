import { useState } from 'react';
import ProfileCard from './components/ProfileCard';
import './App.css';

function App() {
  const [profileData, setProfileData] = useState({ 
    name: '', 
    bio: '', 
    photo: null,
    role: '',
    email: '',
    phone: ''
  });
  const [showCard, setShowCard] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCard(true);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setProfileData({ ...profileData, [name]: files ? files[0] : value });
  };

  const handleReset = () => {
    setProfileData({ 
      name: '', 
      bio: '', 
      photo: null,
      role: '',
      email: '',
      phone: ''
    });
    setShowCard(false);
    document.getElementById('profile-form').reset();
  };

  return (
    <div className="app-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <i className="bi bi-stars"></i>
            <span>Free Tool</span>
          </div>
          <h1 className="hero-title">
            Create Stunning
            <span className="gradient-text"> Profile Cards</span>
          </h1>
          <p className="hero-subtitle">
            Design beautiful, professional profile cards in seconds. 
            Perfect for social media, portfolios, and business cards.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="main-section">
        <div className="content-wrapper">
          <div className="grid-container">
            {/* Form Section */}
            <div className="form-section">
              <div className="section-header">
                <h2>
                  <i className="bi bi-pencil-square"></i>
                  Your Information
                </h2>
                <p>Fill in your details to generate your card</p>
              </div>

              <form onSubmit={handleSubmit} id="profile-form" className="profile-form">
                <div className="form-group">
                  <label htmlFor="name">
                    <i className="bi bi-person"></i>
                    Full Name *
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    id="name"
                    placeholder="Enter your full name"
                    onChange={handleInputChange}
                    value={profileData.name}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role">
                    <i className="bi bi-briefcase"></i>
                    Role / Title
                  </label>
                  <input 
                    type="text" 
                    name="role" 
                    id="role"
                    placeholder="e.g., Software Developer"
                    onChange={handleInputChange}
                    value={profileData.role}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="bi bi-envelope"></i>
                      Email
                    </label>
                    <input 
                      type="email" 
                      name="email" 
                      id="email"
                      placeholder="your@email.com"
                      onChange={handleInputChange}
                      value={profileData.email}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      <i className="bi bi-telephone"></i>
                      Phone
                    </label>
                    <input 
                      type="tel" 
                      name="phone" 
                      id="phone"
                      placeholder="+1 234 567 890"
                      onChange={handleInputChange}
                      value={profileData.phone}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="bio">
                    <i className="bi bi-chat-left-text"></i>
                    Bio
                  </label>
                  <textarea 
                    name="bio" 
                    id="bio"
                    rows="4" 
                    placeholder="Tell us about yourself..."
                    onChange={handleInputChange}
                    value={profileData.bio}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="photo">
                    <i className="bi bi-image"></i>
                    Profile Photo
                  </label>
                  <div className="file-input-wrapper">
                    <input 
                      type="file" 
                      name="photo" 
                      id="photo"
                      accept="image/*" 
                      onChange={handleInputChange} 
                    />
                    <label htmlFor="photo" className="file-label">
                      <i className="bi bi-cloud-upload"></i>
                      <span>{profileData.photo ? profileData.photo.name : 'Choose a photo'}</span>
                    </label>
                  </div>
                  <small>Recommended: Square image, max 5MB</small>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-stars"></i>
                    Generate Card
                  </button>
                  {showCard && (
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={handleReset}
                    >
                      <i className="bi bi-arrow-counterclockwise"></i>
                      Reset
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Preview Section */}
            <div className="preview-section">
              <div className="section-header">
                <h2>
                  <i className="bi bi-eye"></i>
                  Live Preview
                </h2>
                <p>See your card in real-time</p>
              </div>

              <div className="preview-wrapper">
                {showCard ? (
                  <ProfileCard data={profileData} />
                ) : (
                  <div className="empty-preview">
                    <div className="empty-icon">
                      <i className="bi bi-card-image"></i>
                    </div>
                    <h3>No Preview Yet</h3>
                    <p>Fill out the form and click "Generate Card" to see your profile card here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>
            Made with <i className="bi bi-heart-fill"></i> by 
            <a href="https://github.com/RaihanAdityaP" target="_blank" rel="noopener noreferrer">
              RaihanAdityaP
            </a>
          </p>
          <div className="footer-links">
            <a href="https://github.com/RaihanAdityaP/ProfileGen" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-github"></i>
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;