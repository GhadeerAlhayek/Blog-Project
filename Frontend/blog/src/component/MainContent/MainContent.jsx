import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import ApiService from "../../utils/api.js";
import { Link } from "react-router-dom";

export default function MainContent() {
  const { user, isAuthenticated } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const data = await ApiService.getAllArticles();

      if (Array.isArray(data)) {
        setArticles(data);
      } else if (data.articles) {
        setArticles(data.articles);
      } else {
        setArticles([]);
      }
    } catch (error) {
      setError("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="main-content">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading articles...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="content-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Welcome to DOM NEWS</h1>
            <p>Document Your Development Journey</p>
            {!isAuthenticated && (
              <p className="auth-prompt">
                Sign in to create and manage your articles
              </p>
            )}
          </div>
        </section>

        {/* User Dashboard (if authenticated) */}
        {isAuthenticated && (
          <section className="user-dashboard">
            <div className="dashboard-header">
              <h2>Welcome back, {user.name}!</h2>
              <div className="dashboard-actions">
                <button className="btn btn-primary">
                  <span>📝</span> Create New Article
                </button>
                <button className="btn btn-secondary">
                  <span>📄</span> My Articles
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Articles Section */}
        <section className="articles-section">
          <div className="section-header">
            <h2>Latest Articles</h2>
            <div className="articles-count">
              {articles.length} article{articles.length !== 1 ? "s" : ""}{" "}
              available
            </div>
          </div>

          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={loadArticles} className="retry-btn">
                Try Again
              </button>
            </div>
          )}

          <div className="articles-grid">
            {articles.length > 0 ? (
              articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            ) : (
              <div className="no-articles">
                <div className="no-articles-icon">📄</div>
                <h3>No articles yet</h3>
                <p>Be the first to share your development journey!</p>
                {isAuthenticated && (
                  <button className="btn btn-primary">
                    Create First Article
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

// Article Card Component
// Update the ArticleCard component
function ArticleCard({ article }) {
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    return content.length > maxLength
      ? content.substring(0, maxLength) + "..."
      : content;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <article className="article-card">
      {article.image_url && !imageError && (
        <div className="article-image">
          <img
            src={article.image_url}
            alt={article.title}
            onError={handleImageError}
          />
        </div>
      )}

      <div className="article-content">
        <div className="article-meta">
          <span className="author">
            By {article.author_name || "Anonymous"}
          </span>
          <span className="date">{formatDate(article.created_at)}</span>
        </div>

        <h3 className="article-title">{article.title}</h3>
        <p className="article-excerpt">{truncateContent(article.content)}</p>

        <div className="article-actions">
          <Link to={`/article/${article.id}`} className="read-more-btn">
            Read More <span>→</span>
          </Link>

          <div className="article-stats">
            <span className="comments-count">
              💬 {article.comments_count || 0}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
