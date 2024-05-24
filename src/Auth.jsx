import React from 'react';
import { supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import './custom.css'; // Import the custom CSS file

const AuthComponent = () => {
  return (
    <div className="auth-container">
      <div className="auth">
        <img src="https://cdn.shopify.com/s/files/1/0693/4328/1426/files/ghost_mnky_favicon.svg" alt="MOOD MNKY Logo" className="auth-logo" />
        <h2>GIRTH</h2>
        <h3>The A.I. Ghost of Jupiter's Girth</h3>
        <Auth
          supabaseClient={supabase}
          providers={['discord']}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#5e35b1', // Deep Purple for the brand color
                  brandAccent: '#4c2f9e', // Slightly darker purple for accent
                  defaultButtonBackground: '#5e35b1', // Deep Purple
                  defaultButtonBackgroundHover: '#4c2f9e', // Slightly darker purple on hover
                  defaultButtonBorder: '#5e35b1',
                  defaultButtonText: '#ffffff', // White text color
                  inputBorder: '#5e35b1', // Deep purple border on focus
                  inputBackground: '#333', // Dark input background
                  inputPlaceholder: '#666',
                  inputText: '#ffffff', // White text color
                  messageText: '#ffffff', // White text color
                  text: '#ffffff', // White text color
                  anchorTextColor: '#5e35b1', // Deep Purple for links
                },
                fontSizes: {
                  baseBodySize: '16px',
                  baseInputSize: '16px',
                  baseLabelSize: '14px',
                  baseButtonSize: '16px',
                  baseAnchorSize: '14px',
                },
                fonts: {
                  bodyFontFamily: 'var(--custom-font-family)',
                  headingFontFamily: 'var(--custom-font-family)',
                  inputFontFamily: 'var(--custom-font-family)',
                  buttonFontFamily: 'var(--custom-font-family)',
                  anchorFontFamily: 'var(--custom-font-family)',
                },
                borders: {
                  borderRadius: '10px',
                },
              },
            },
          }}
          socialLayout="horizontal"
        />
      </div>
    </div>
  );
};

export default AuthComponent;
