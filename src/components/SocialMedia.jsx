import React from 'react';

export default function SocialMedia() {
  return (
    <div className="social-media">
      <h2>Social Media Promotion</h2>
      <p>Help us spread the word about our app!</p>
      <textarea
        rows="4"
        cols="50"
        placeholder="Write a message to promote the app..."
      ></textarea>
      <button>Share on Social Media</button>
    </div>
  );
};

