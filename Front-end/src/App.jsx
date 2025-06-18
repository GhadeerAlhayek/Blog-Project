import React from "react";
import SignIn from "./component/Auth/SignUp/SignIn";
import "./App.scss";

const App = () => {
  const handleSignIn = (credentials) => {
    console.log("User signed in with:", credentials); // not for prodaction
    alert(`Welcome! Email: ${credentials.email}`); // not for prodaction
    // Here you would typically:
    // 1. Send credentials to your backend API
    // 2. Store user token/session
    // 3. Redirect to dashboard or main page
  };

  return (
    <div className="App">
        <div className="video-background">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="background-video"
        >
          <source src="/glitch.mov" type="video/mp4" />
          <source src="/glitch.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>
      </div>
   
      <div className="content">
        <SignIn onSignIn={handleSignIn} />
      </div>
    </div>
  );
};

export default App;
