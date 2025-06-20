import React from "react";

const Article = ({ article }) => {
  // Default article data for development
  const defaultArticle = {
    id: 1,
    title: "Advanced Cybersecurity Techniques in Modern Web Development",
    content: [
      {
        type: "text",
        data: "In today's digital landscape, cybersecurity has become more critical than ever. As developers, we must implement robust security measures to protect our applications and users from increasingly sophisticated threats."
      },
      {
        type: "text",
        data: "One of the most effective approaches is implementing a multi-layered security strategy. This includes input validation, authentication mechanisms, encryption protocols, and regular security audits. Each layer provides an additional barrier against potential attacks."
      },
      {
        type: "image",
        data: {
          src: "https://via.placeholder.com/800x400/0a4d0a/00ff00?text=CYBERSECURITY+MATRIX",
          alt: "Cybersecurity concept illustration",
          caption: "Modern cybersecurity requires constant vigilance and advanced techniques"
        }
      },
      {
        type: "text",
        data: "Authentication systems have evolved significantly. Modern applications now use JWT tokens, OAuth 2.0, and multi-factor authentication to ensure user identity verification. These technologies provide both security and user experience improvements."
      },
      {
        type: "text",
        data: "Data encryption remains a cornerstone of cybersecurity. Whether it's encrypting data at rest or in transit, proper encryption ensures that even if data is intercepted, it remains unreadable to unauthorized parties."
      }
    ],
    author: {
      name: "Alex Cipher",
      avatar: "https://via.placeholder.com/60x60/00ff00/000000?text=AC",
      bio: "Cybersecurity Expert & Full-Stack Developer"
    },
    publishedDate: "2024-01-15T10:30:00Z",
    readTime: "8 min read",
    tags: ["Cybersecurity", "Web Development", "Authentication", "Encryption", "Security"]
  };

  const articleData = article || defaultArticle;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const renderContent = (contentItem, index) => {
    switch (contentItem.type) {
      case "text":
        return (
          <div key={index} className="content-card">
            <p className="article-paragraph">
              {contentItem.data}
            </p>
          </div>
        );
      case "image":
        return (
          <div key={index} className="content-card content-card--image">
            <div className="article-image-container">
              <img
                src={contentItem.data.src}
                alt={contentItem.data.alt}
                className="article-image"
                loading="lazy"
              />
              {contentItem.data.caption && (
                <p className="article-image-caption">
                  {contentItem.data.caption}
                </p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="article-page">
      <div className="article-container">
        {/* Main Article Card */}
        <div className="article-main-card">
          
          {/* Header Card */}
          <div className="article-header-card">
            <h1 className="article-title">{articleData.title}</h1>
            
            <div className="article-meta-card">
              <div className="article-author">
                <img 
                  src={articleData.author.avatar} 
                  alt={articleData.author.name}
                  className="author-avatar"
                />
                <div className="author-info">
                  <span className="author-name">{articleData.author.name}</span>
                  <span className="author-bio">{articleData.author.bio}</span>
                </div>
              </div>
              
              <div className="article-details">
                <span className="publish-date">
                  {formatDate(articleData.publishedDate)}
                </span>
                <span className="read-time">{articleData.readTime}</span>
              </div>
            </div>

            {/* Tags Card */}
            <div className="tags-card">
              {articleData.tags.map((tag, index) => (
                <span key={index} className="article-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content Cards */}
          <div className="article-content-wrapper">
            {articleData.content.map((contentItem, index) => 
              renderContent(contentItem, index)
            )}
          </div>

          {/* Footer Card */}
          <div className="article-footer-card">
            <div className="article-actions">
              <button className="action-btn action-btn--like">
                <span className="action-icon">♥</span>
                <span className="action-text">Like</span>
              </button>
              <button className="action-btn action-btn--share">
                <span className="action-icon">⚡</span>
                <span className="action-text">Share</span>
              </button>
              <button className="action-btn action-btn--bookmark">
                <span className="action-icon">⚑</span>
                <span className="action-text">Save</span>
              </button>
            </div>
            
            <div className="article-nav">
              <a href="/blog" className="btn-link">
                Back to Articles
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Article;