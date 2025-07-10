import React from 'react'
import BackgroundVideo from "./component/BackgroundVideo/BackgroundVideo.jsx"
import Header from './component/Header/Header.jsx'
import Footer from './component/Footer/Footer.jsx'
import { AuthProvider } from './context/AuthContext.jsx';

function App() {
 

  return (
    <AuthProvider>
    <BackgroundVideo />
    <Header />
    <Footer />
    
    </AuthProvider>

  )
  
}

export default App