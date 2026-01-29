import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import MainNavbar from '../components/MainNavbar';
import WatchPartyModal from '../components/WatchPartyModal';
import './WatchParty.css';

const WatchParty = () => {
  const { user } = useAuth();
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [joinCode, setJoinCode] = useState('');

  useEffect(() => {
    fetchWatchParties();
  }, []);

  const fetchWatchParties = async () => {
    try {
      // Fetch only current user's parties
      const response = await fetch(`http://localhost:8082/api/watch-party/my-parties?userId=${user?.userId || 1}`);
      if (response.ok) {
        const data = await response.json();
        setParties(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching watch parties:', error);
    } finally {
      setLoading(false);
    }
  };

  const joinParty = async (partyId) => {
    try {
      const response = await fetch(`http://localhost:8082/api/watch-party/${partyId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        alert('✅ Successfully joined the watch party!');
        fetchWatchParties(); // Refresh the list
      } else {
        alert('❌ Failed to join watch party');
      }
    } catch (error) {
      console.error('Error joining party:', error);
      alert('❌ Error joining watch party');
    }
  };

  const markAsDone = async (partyId) => {
    try {
      const response = await fetch(`http://localhost:8082/api/watch-party/${partyId}/complete`, {
        method: 'POST'
      });
      
      if (response.ok) {
        alert('✅ Party marked as completed!');
        fetchWatchParties();
      }
    } catch (error) {
      console.error('Error marking party as done:', error);
    }
  };

  const deleteParty = async (partyId) => {
    if (window.confirm('Are you sure you want to delete this party?')) {
      try {
        const response = await fetch(`http://localhost:8082/api/watch-party/${partyId}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          alert('✅ Party deleted successfully!');
          fetchWatchParties();
        }
      } catch (error) {
        console.error('Error deleting party:', error);
      }
    }
  };

  const shareParty = (party) => {
    const partyCode = party.partyCode || party.partyId || party.id;
    const movieLink = `${window.location.origin}/movie/${party.movieId}?party=${partyCode}`;
    const shareText = `🎬 Join my watch party!\n\n🎯 Party Code: ${partyCode}\n📅 Date: ${party.watchDate}\n⏰ Time: ${party.watchTime}\n🎭 Movie: ${party.movieId}\n\n🔗 View movie details: ${movieLink}`;
    
    // Show sharing options
    const shareOption = window.confirm('Choose sharing method:\n\nOK = WhatsApp\nCancel = More Options');
    
    if (shareOption) {
      // WhatsApp share
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      // Show more sharing options
      const moreOptions = prompt('Choose sharing method:\n1 = Email\n2 = Facebook\n3 = Copy Link\n\nEnter number (1-3):');
      
      switch(moreOptions) {
        case '1':
          // Email share
          const emailSubject = encodeURIComponent('🎬 Watch Party Invitation');
          const emailBody = encodeURIComponent(shareText);
          window.open(`mailto:?subject=${emailSubject}&body=${emailBody}`, '_blank');
          break;
        case '2':
          // Facebook share
          const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(movieLink)}&quote=${encodeURIComponent(shareText)}`;
          window.open(fbUrl, '_blank');
          break;
        case '3':
        default:
          // Copy to clipboard
          navigator.clipboard.writeText(shareText).then(() => {
            alert('📋 Party invitation copied to clipboard!');
          }).catch(() => {
            prompt('Copy this invitation:', shareText);
          });
          break;
      }
    }
  };

  const joinByCode = async () => {
    if (!joinCode.trim()) {
      alert('Please enter a party code');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8082/api/watch-party/join-by-code/${joinCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        alert('✅ Successfully joined the watch party!');
        setJoinCode('');
        fetchWatchParties();
      } else {
        alert('❌ Invalid party code or party not found');
      }
    } catch (error) {
      console.error('Error joining party by code:', error);
      alert('❌ Error joining watch party');
    }
  };

  const formatDateTime = (dateStr, timeStr) => {
    const date = new Date(dateStr + 'T' + timeStr);
    return date.toLocaleString();
  };

  const handleCreateParty = () => {
    setShowCreateModal(false);
    fetchWatchParties();
  };

  if (loading) {
    return <div className="loading">Loading watch parties...</div>;
  }

  return (
    <div className="watch-party-page">
      <MainNavbar onCreateWatchParty={() => setShowCreateModal(true)} />
      
      <div className="watch-party-content">
        <div className="page-header">
          <h1>🎉 Watch Parties</h1>
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            Create New Party
          </button>
        </div>

        <div className="join-by-code">
          <h3>Join by Code</h3>
          <div className="join-input-group">
            <input
              type="text"
              placeholder="Enter party code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              className="join-input"
            />
            <button 
              className="btn btn-secondary"
              onClick={joinByCode}
            >
              Join Party
            </button>
          </div>
        </div>

        <div className="parties-section">
          <h3>Available Parties</h3>
          
          {parties.length === 0 ? (
            <div className="no-parties">
              <h4>No watch parties available</h4>
              <p>Create the first watch party and invite your friends!</p>
              <button 
                className="btn btn-primary"
                onClick={() => setShowCreateModal(true)}
              >
                Create First Party
              </button>
            </div>
          ) : (
            <div className="parties-grid">
              {parties.map((party) => (
                <div key={party.partyId || party.id} className="party-card">
                  <div className="party-header">
                    <h4>Party #{party.partyCode || party.partyId || party.id}</h4>
                    <span className="party-status">
                      {party.status === 'ACTIVE' ? '🟢 Active' : '🔴 Inactive'}
                    </span>
                  </div>
                  
                  <div className="party-details">
                    <p><strong>Movie ID:</strong> {party.movieId}</p>
                    <p><strong>Date & Time:</strong> {formatDateTime(party.watchDate, party.watchTime)}</p>
                    <p><strong>Members:</strong> {party.currentMembers || 0}/{party.maxMembers}</p>
                    {party.description && (
                      <p><strong>Description:</strong> {party.description}</p>
                    )}
                  </div>
                  
                  <div className="party-actions">
                    <button 
                      className="btn btn-primary"
                      onClick={() => joinParty(party.partyId || party.id)}
                      disabled={party.currentMembers >= party.maxMembers}
                    >
                      {party.currentMembers >= party.maxMembers ? 'Full' : 'Join Party'}
                    </button>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => shareParty(party)}
                    >
                      Share
                    </button>
                    <button 
                      className="btn btn-success"
                      onClick={() => markAsDone(party.partyId || party.id)}
                    >
                      Mark as Done
                    </button>
                    <button 
                      className="btn btn-danger"
                      onClick={() => deleteParty(party.partyId || party.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <WatchPartyModal 
          onClose={handleCreateParty}
          user={user}
        />
      )}
    </div>
  );
};

export default WatchParty;