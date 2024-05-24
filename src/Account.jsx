import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Avatar from './Avatar';  // Import the Avatar component
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [access_token, setAccessToken] = useState(null);
  const [refresh_token, setRefreshToken] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [chatflowid, setChatflowid] = useState(null); // New state for Chatflow ID
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from('profiles')
        .select(`username, access_token, refresh_token, avatar_url, chatflowid`) // Include chatflowid
        .eq('id', user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setAccessToken(data.access_token);
          setRefreshToken(data.refresh_token);
          setAvatarUrl(data.avatar_url);
          setChatflowid(data.chatflowid); // Set chatflowid
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  async function updateProfile(event, avatarUrl) {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      access_token,
      refresh_token,
      avatar_url: avatarUrl || avatar_url,  // Use new avatarUrl if provided, otherwise keep the existing one
      chatflowid, // Include chatflowid in updates
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
      alert(error.message);
    } else if (avatarUrl) {
      setAvatarUrl(avatarUrl);  // Update the avatar URL state only if a new URL is provided
    }
    setLoading(false);
  }

  return (
    <form onSubmit={updateProfile} className="form-widget">
      <Avatar
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          updateProfile(null, url);
        }}
      />
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          required
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="access_token">Access Token</label>
        <input
          id="access_token"
          type="text"
          value={access_token || ''}
          onChange={(e) => setAccessToken(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="refresh_token">Refresh Token</label>
        <input
          id="refresh_token"
          type="text"
          value={refresh_token || ''}
          onChange={(e) => setRefreshToken(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="chatflowid">Chatflow ID</label> {/* New Chatflow ID field */}
        <input
          id="chatflowid"
          type="text"
          value={chatflowid || ''}
          onChange={(e) => setChatflowid(e.target.value)}
        />
      </div>
      <div>
        <button className="button block primary" type="submit" disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>
      <div>
        <button className="button block" type="button" onClick={() => {
          supabase.auth.signOut();
          navigate('/sign-in');  // Redirect to sign-in page after sign-out
        }}>
          Sign Out
        </button>
      </div>
      <div>
        <button className="button block" type="button" onClick={() => navigate('/chat')}>
          Go to Chat
        </button>
      </div>
      <div>
        <button className="button block" type="button" onClick={() => window.open('https://bungie-oauth.moodmnky.com/', '_blank', 'noopener,noreferrer')}>
          Sync your ghost...
        </button>
      </div>
    </form>
  );
}
