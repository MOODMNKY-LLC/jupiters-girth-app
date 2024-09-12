import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { FullPageChat } from 'flowise-embed-react';
import './custom.css'; // Ensure to import your custom CSS
import girthLogo from './assets/girth_logo.png'; // Import the bot avatar

const Chat = () => {
  const [chatflowid, setChatflowid] = useState('b6e94afb-3db0-473c-bba7-f42f92dc9577'); // Placeholder chatflowid
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      navigate('/'); // Redirect to the home page or login page after logout
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <button className="button block" onClick={() => navigate('/account')}>
          Account
        </button>
        <button className="button block" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="chat-content">
        <FullPageChat
          chatflowid={chatflowid}
          apiHost="https://flowise-local.moodmnky.com"
          theme={{
            chatWindow: {
              welcomeMessage: "Welcomme back Guardian! How may I be of assistance?",
              backgroundColor: "#101010", // Dark background color
              height: "100%", // Full height
              width: "100%", // Full width
              fontSize: 16,
              poweredByTextColor: "#101010", // Grey text color for "powered by"
              botMessage: {
                backgroundColor: "#5E35B2", // Darker background for bot messages
                textColor: "#FFFFFF", // White text color for bot messages
                showAvatar: true,
                avatarSrc: girthLogo, // Bot avatar URL
              },
              userMessage: {
                backgroundColor: "#4A4A4A", // Purple background for user messages
                textColor: "#FFFFFF", // White text color for user messages
                showAvatar: true,
                avatarSrc: "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png", // User avatar URL
              },
              textInput: {
                placeholder: "Type your question...",
                backgroundColor: "#101010", // Dark input background
                textColor: "#FFFFFF", // White text color for input
                sendButtonColor: "#6C63FF", // Purple send button color
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default Chat;
