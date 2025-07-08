import React from "react";

export default function BackgroundVideo() {
  return (
    <div className="video-background">
      <video
        className="background-video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src="/glitch.webm" type="video/webm" />
        {/* optional fallback */}
        Your browser does not support video.
      </video>
    </div>
  );
}
