import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ← Add this import
import BackgroundVideo from "./component/BackgroundVideo/BackgroundVideo.jsx";
import Header from "./component/Header/Header.jsx";
import Footer from "./component/Footer/Footer.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import MainContent from "./component/MainContent/MainContent.jsx";
import ArticleDetail from "./component/ArticleDetail/ArticleDetail.jsx";
import UserDashboard from "./component/UserDashboard/UserDashboard.jsx";



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <BackgroundVideo />
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/dashboard" element={<UserDashboard />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;