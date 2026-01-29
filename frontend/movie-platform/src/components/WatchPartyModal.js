import React, { useState } from 'react';
import './WatchPartyModal.css';

const WatchPartyModal = ({ onClose, user }) => {
  const [partyData, setPartyData] = useState({
    movieId: '',
    watchDate: new Date().toISOString().split('T')[0],
    watchTime: '20:00',
    description: '',
    maxMembers: 10
  });
  const [loading, setLoading] = useState(false);
  const [partyCreated, setPartyCreated] = useState(null);

  const handleChange = (e) => {
    setPartyData({
      ...partyData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8082/api/watch-party/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(partyData)
      });

      if (response.ok) {
        const result = await response.json();
        setPartyCreated({
          partyCode: result.partyCode || generatePartyId(),
          shareableLink: `${window.location.origin}/party/${result.partyCode || generatePartyId()}`
        });
      } else {
        alert('Failed to create watch party');
      }
    } catch (error) {
      console.error('Error creating watch party:', error);
      alert('Error creating watch party');
    } finally {
      setLoading(false);
    }
  };

  const generatePartyId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create Watch Party</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {!partyCreated ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Movie ID</label>
              <input
                type="number"
                name="movieId"
                value={partyData.movieId}
                onChange={handleChange}
                placeholder="Enter movie ID"
                required
              />
            </div>

            <div className="form-group">
              <label>Watch Date</label>
              <input
                type="date"
                name="watchDate"
                value={partyData.watchDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Watch Time</label>
              <input
                type="time"
                name="watchTime"
                value={partyData.watchTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={partyData.description}
                onChange={handleChange}
                placeholder="Describe your watch party..."
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Max Members</label>
              <input
                type="number"
                name="maxMembers"
                value={partyData.maxMembers}
                onChange={handleChange}
                min="2"
                max="50"
                required
              />
            </div>

            <div className="modal-actions">
              <button type="button" className="btn btn-outline" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Creating...' : 'Create Party'}
              </button>
            </div>
          </form>
        ) : (
          <div className="party-created">
            <h3>🎉 Watch Party Created!</h3>
            <div className="party-details">
              <div className="detail-item">
                <label>Party Code:</label>
                <div className="copy-field">
                  <span>{partyCreated.partyCode}</span>
                  <button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(partyCreated.partyCode)}
                  >
                    Copy
                  </button>
                </div>
              </div>
              
              <div className="detail-item">
                <label>Shareable Link:</label>
                <div className="copy-field">
                  <span className="link">{partyCreated.shareableLink}</span>
                  <button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(partyCreated.shareableLink)}
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
            
            <button className="btn btn-primary" onClick={onClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPartyModal;