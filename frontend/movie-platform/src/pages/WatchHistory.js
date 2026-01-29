import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import MainNavbar from '../components/MainNavbar';
import './WatchHistory.css';

const WatchHistory = () => {
  const { user } = useAuth();
  const [completedParties, setCompletedParties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompletedParties();
  }, []);

  const fetchCompletedParties = async () => {
    try {
      const response = await fetch('http://localhost:8082/api/watch-party/completed');
      if (response.ok) {
        const data = await response.json();
        setCompletedParties(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching completed parties:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateStr, timeStr) => {
    const date = new Date(dateStr + 'T' + timeStr);
    return date.toLocaleString();
  };

  if (loading) {
    return <div className="loading">Loading watch history...</div>;
  }

  return (
    <div className="watch-history-page">
      <MainNavbar />
      
      <div className="watch-history-content">
        <div className="page-header">
          <h1>📺 My Watch History</h1>
        </div>

        <div className="history-section">
          <h3>Completed Parties</h3>
          
          {completedParties.length === 0 ? (
            <div className="no-history">
              <h4>No completed watch parties yet</h4>
              <p>Complete your first watch party to see it here!</p>
            </div>
          ) : (
            <div className="history-grid">
              {completedParties.map((party) => (
                <div key={party.id} className="history-card">
                  <div className="party-header">
                    <h4>Party #{party.partyCode || party.id}</h4>
                    <span className={`party-status ${party.status.toLowerCase()}`}>
                      {party.status === 'ACTIVE' ? '🟢 Active' : '🔴 Ended'}
                    </span>
                  </div>
                  
                  <div className="party-details">
                    <p><strong>Movie ID:</strong> {party.movieId}</p>
                    <p><strong>Scheduled:</strong> {formatDateTime(party.watchDate, party.watchTime)}</p>
                    <p><strong>Members:</strong> {party.currentMembers || 0}/{party.maxMembers}</p>
                    {party.description && (
                      <p><strong>Description:</strong> {party.description}</p>
                    )}
                    <p><strong>Created:</strong> {new Date(party.createdAt).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="party-actions">
                    <span className="completed-badge">✓ Completed</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchHistory;