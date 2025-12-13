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
      <section className="main-section">
        <div className="content-wrapper">
          <div className="page-header">
            <h1>Profile Card Generator</h1>
            <p>Create professional profile cards instantly</p>
          </div>

          <div className="grid-container">
            <div className="form-section">
              <div className="section-header">
                <h2>
                  <i className="bi bi-pencil-square"></i>
                  Your Information
                </h2>
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
                  <small>Square image recommended, max 5MB</small>
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

            <div className="preview-section">
              <div className="section-header">
                <h2>
                  <i className="bi bi-eye"></i>
                  Live Preview
                </h2>
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
                    <p>Fill the form and generate your card</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="app-footer">
        <p>Profile Card Generator</p>
      </footer>
    </div>
  );
}

export default App;