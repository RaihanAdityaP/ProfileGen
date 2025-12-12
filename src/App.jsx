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
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="container">
          <h1 className="display-4 fw-bold text-white mb-2">
            <i className="bi bi-person-badge me-3"></i>
            Profile Card Generator
          </h1>
          <p className="lead text-white-50">Create beautiful profile cards in seconds</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-5">
        <div className="row g-4">
          {/* Form Section */}
          <div className="col-lg-6">
            <div className="card shadow-lg border-0 form-card">
              <div className="card-body p-4">
                <h3 className="card-title mb-4">
                  <i className="bi bi-pencil-square me-2"></i>
                  Enter Your Details
                </h3>
                <form onSubmit={handleSubmit} id="profile-form">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-semibold">
                      <i className="bi bi-person me-2"></i>Full Name *
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      id="name"
                      className="form-control form-control-lg" 
                      placeholder="Your Name"
                      onChange={handleInputChange}
                      value={profileData.name}
                      required 
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="role" className="form-label fw-semibold">
                      <i className="bi bi-briefcase me-2"></i>Role / Title
                    </label>
                    <input 
                      type="text" 
                      name="role" 
                      id="role"
                      className="form-control form-control-lg" 
                      placeholder="Your Role or Title"
                      onChange={handleInputChange}
                      value={profileData.role}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                      <i className="bi bi-envelope me-2"></i>Email
                    </label>
                    <input 
                      type="email" 
                      name="email" 
                      id="email"
                      className="form-control form-control-lg" 
                      placeholder="youremail@example.com"
                      onChange={handleInputChange}
                      value={profileData.email}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label fw-semibold">
                      <i className="bi bi-telephone me-2"></i>Phone
                    </label>
                    <input 
                      type="tel" 
                      name="phone" 
                      id="phone"
                      className="form-control form-control-lg" 
                      placeholder="+1 234 567 8900"
                      onChange={handleInputChange}
                      value={profileData.phone}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="bio" className="form-label fw-semibold">
                      <i className="bi bi-chat-left-text me-2"></i>Bio
                    </label>
                    <textarea 
                      name="bio" 
                      id="bio"
                      className="form-control form-control-lg" 
                      rows="4" 
                      placeholder="Tell us about yourself..."
                      onChange={handleInputChange}
                      value={profileData.bio}
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="photo" className="form-label fw-semibold">
                      <i className="bi bi-image me-2"></i>Profile Photo
                    </label>
                    <input 
                      type="file" 
                      name="photo" 
                      id="photo"
                      className="form-control form-control-lg" 
                      accept="image/*" 
                      onChange={handleInputChange} 
                    />
                    <small className="text-muted">Recommended: Square image, max 5MB</small>
                  </div>

                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary btn-lg">
                      <i className="bi bi-stars me-2"></i>
                      Generate Card
                    </button>
                    {showCard && (
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary btn-lg"
                        onClick={handleReset}
                      >
                        <i className="bi bi-arrow-counterclockwise me-2"></i>
                        Reset
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="col-lg-6">
            <div className="preview-section">
              {showCard ? (
                <>
                  <h3 className="mb-4">
                    <i className="bi bi-eye me-2"></i>
                    Preview
                  </h3>
                  <ProfileCard data={profileData} />
                </>
              ) : (
                <div className="empty-state">
                  <i className="bi bi-card-image empty-icon"></i>
                  <h4 className="mt-3">No Preview Yet</h4>
                  <p className="text-muted">Fill out the form and click "Generate Card" to see your profile card</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <div className="container text-center">
          <p className="mb-0">
            Made with <i className="bi bi-heart-fill text-danger"></i> by 
            <a href="https://github.com/RaihanAdityaP" target="_blank" rel="noopener noreferrer" className="ms-2">
              RaihanAdityaP
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;