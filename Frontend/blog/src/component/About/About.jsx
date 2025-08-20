// Frontend/blog/src/component/About/About.jsx
import React from 'react';

export default function About() {
  return (
    <main className="about-page">
      <div className="about-container">
        
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-content">
            <h1>About DOM NEWS</h1>
            <p className="hero-subtitle">Document Your Development Journey</p>
            <div className="hero-description">
              <p>
                DOM NEWS is a modern platform designed specifically for developers, 
                tech enthusiasts, and digital creators who want to share their knowledge, 
                document their projects, and build a community around technology and innovation.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="about-section mission-section">
          <div className="section-content">
            <div className="section-header">
              <span className="section-icon">🎯</span>
              <h2>Our Mission</h2>
            </div>
            <div className="section-text">
              <p>
                We believe that every developer has a unique story to tell and valuable 
                experiences to share. DOM NEWS provides a platform where technical knowledge 
                meets storytelling, creating a space for developers to document their journey, 
                share solutions, and inspire others in the tech community.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="about-section features-section">
          <div className="section-header">
            <h2>Why Choose DOM NEWS?</h2>
            <p>Built by developers, for developers</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✏️</div>
              <h3>Easy Publishing</h3>
              <p>
                Intuitive editor with drag & drop image upload, 
                making it simple to create and publish technical content.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Modern Design</h3>
              <p>
                Beautiful, responsive interface with glass morphism design 
                that works perfectly on all devices.
              </p>
            </div>

            <div className="feature-card">
              <div class="feature-icon">💬</div>
              <h3>Interactive Community</h3>
              <p>
                Engage with readers through comments, build discussions, 
                and create meaningful connections in the tech community.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Reliable</h3>
              <p>
                Enterprise-grade security with JWT authentication, 
                data protection, and reliable hosting infrastructure.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Analytics Dashboard</h3>
              <p>
                Track your content performance with detailed analytics 
                and insights about your readers and engagement.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast & Optimized</h3>
              <p>
                Lightning-fast loading times with optimized images, 
                efficient caching, and modern web technologies.
              </p>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="about-section tech-section">
          <div className="section-header">
            <span className="section-icon">🛠️</span>
            <h2>Built With Modern Technology</h2>
            <p>Powered by cutting-edge web technologies</p>
          </div>
          
          <div className="tech-grid">
            <div className="tech-category">
              <h3>Frontend</h3>
              <div className="tech-items">
                <span className="tech-item">React.js</span>
                <span className="tech-item">Vite</span>
                <span className="tech-item">SCSS</span>
                <span className="tech-item">Responsive Design</span>
              </div>
            </div>

            <div className="tech-category">
              <h3>Backend</h3>
              <div className="tech-items">
                <span className="tech-item">Node.js</span>
                <span className="tech-item">Express.js</span>
                <span className="tech-item">JWT Auth</span>
                <span className="tech-item">RESTful API</span>
              </div>
            </div>

            <div className="tech-category">
              <h3>Database & Storage</h3>
              <div className="tech-items">
                <span className="tech-item">MySQL</span>
                <span className="tech-item">Cloud Storage</span>
                <span className="tech-item">Image Optimization</span>
                <span className="tech-item">Data Security</span>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="about-section stats-section">
          <div className="section-header">
            <h2>Growing Community</h2>
            <p>Join thousands of developers sharing their stories</p>
          </div>
          
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Active Writers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5000+</div>
              <div className="stat-label">Published Articles</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">25K+</div>
              <div className="stat-label">Monthly Readers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Community Interactions</div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="about-section cta-section">
          <div className="cta-content">
            <h2>Ready to Share Your Story?</h2>
            <p>
              Join our community of developers and start documenting your journey today. 
              Whether you're a seasoned professional or just starting out, your voice matters.
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary">
                🚀 Start Writing
              </button>
              <button className="btn btn-secondary">
                👥 Join Community
              </button>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="about-section contact-section">
          <div className="section-header">
            <span className="section-icon">📧</span>
            <h2>Get In Touch</h2>
            <p>Have questions or feedback? We'd love to hear from you!</p>
          </div>
          
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div className="contact-details">
                <h4>Email Us</h4>
                <p>hello@domnews.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">💬</div>
              <div className="contact-details">
                <h4>Community Support</h4>
                <p>Join our Discord community for real-time help and discussions</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">🐛</div>
              <div className="contact-details">
                <h4>Report Issues</h4>
                <p>Found a bug? Let us know on our GitHub repository</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}