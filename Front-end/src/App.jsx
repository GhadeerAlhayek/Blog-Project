import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignIn from "./component/Auth/Login/SignIn.jsx";
import SignUp from "./component/Auth/SignUp/SignUp.jsx";
import ForgotPasswordPage from "./component/Auth/Password-resset/ForgotPasswordPage.jsx";
import Article from "./component/Article/ArticlePage.jsx";

const App = () => {
  return (
    <Router>
      <div className="video-background">
        <video autoPlay loop muted playsInline className="background-video">
          <source src="/glitch.mov" type="video/mp4" />
          <source src="/glitch.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="App">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/article" element={<Article />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
