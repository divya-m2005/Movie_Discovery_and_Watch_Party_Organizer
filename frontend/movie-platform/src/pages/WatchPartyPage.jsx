import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getParty, rsvpParty } from "../features/watchParty/watchPartyService";

export default function WatchPartyPage() {
  const { partyCode } = useParams();
  const [party, setParty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rsvpStatus, setRsvpStatus] = useState(""); // ✅ For success/fail message

  // Fetch party info
  useEffect(() => {
    getParty(partyCode)
      .then((data) => setParty(data))
      .finally(() => setLoading(false));
  }, [partyCode]);

  if (loading) return <p>Loading...</p>;
  if (!party) return <p>Watch Party not found!</p>;

  // RSVP handler
  const handleRSVP = async () => {
    try {
      const updated = await rsvpParty(partyCode); // calls backend to add user
      setParty(updated);
      setRsvpStatus("✅ You're now marked as interested!");
      setTimeout(() => setRsvpStatus(""), 3000);
    } catch (err) {
      console.error(err);
      setRsvpStatus("⚠️ Failed to RSVP.");
      setTimeout(() => setRsvpStatus(""), 3000);
    }
  };

  return (
    <div className="container mt-5">
      <h2>{party.movieTitle} Watch Party</h2>
      <p>📅 Date: {party.watchDate}</p>
      <p>⏱ Time: {party.watchTime}</p>
      <p>📝 Description: {party.description}</p>
      <p>👥 Members Interested: {party.currentMembers}/{party.maxMembers}</p>

      {/* RSVP Button */}
      <button className="btn btn-primary mt-2" onClick={handleRSVP}>
        I'm Interested
      </button>

      {/* Success/Fail message */}
      {rsvpStatus && (
        <div className="alert alert-success mt-2">{rsvpStatus}</div>
      )}

      {/* Share Again */}
      <a className="d-block mt-3" href={party.shareableLink}>
        Share Again
      </a>
    </div>
  );
}