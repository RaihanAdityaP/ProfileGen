import { useState } from 'react';
import { Form } from 'react-bits'; // Assuming react-bits has a Form component; adjust if not
import ProfileCard from './components/ProfileCard';

function App() {
  const [profileData, setProfileData] = useState({ name: '', bio: '', photo: null });
  const [showCard, setShowCard] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCard(true);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setProfileData({ ...profileData, [name]: files ? files[0] : value });
  };

  return (
    <div className="container mt-5">
      <h1>Profile Card Generator</h1>
      <Form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" name="name" className="form-control" onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="bio" className="form-label">Bio</label>
          <textarea name="bio" className="form-control" rows="3" onChange={handleInputChange}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="photo" className="form-label">Photo</label>
          <input type="file" name="photo" className="form-control" accept="image/*" onChange={handleInputChange} />
        </div>
        <button type="submit" className="btn btn-primary">Generate Card</button>
      </Form>
      {showCard && <ProfileCard data={profileData} />}
    </div>
  );
}

export default App;