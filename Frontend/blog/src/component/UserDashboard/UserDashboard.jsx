import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import ApiService from "../../utils/api.js";

export default function UserDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [myArticles, setMyArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingArticle, setEditingArticle] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadMyArticles();
    }
  }, [isAuthenticated]);

  const loadMyArticles = async () => {
    try {
      const data = await ApiService.getMyArticles();
      console.log("📝 My articles response:", data);

      // Handle nested structure
      const articles = data.articles || data || [];
      setMyArticles(Array.isArray(articles) ? articles : []);
    } catch (error) {
      setError("Failed to load your articles");
      console.error("Error loading my articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = async (articleId) => {
    try {
      await ApiService.deleteArticle(articleId);
      setMyArticles(myArticles.filter((article) => article.id !== articleId));
      setShowDeleteConfirm(null);
      console.log("✅ Article deleted successfully");
    } catch (error) {
      setError("Failed to delete article");
      console.error("Error deleting article:", error);
    }
  };
  // Add this function inside your UserDashboard component
  const handleUpdateArticle = async (articleData) => {
    try {
      const updatedArticle = await ApiService.updateArticle(articleData.id, {
        title: articleData.title,
        content: articleData.content,
        image_url: articleData.image_url,
        published: articleData.published || 1,
      });

      console.log("✅ Article updated successfully:", updatedArticle);

      // Update the article in the local state
      setMyArticles(
        myArticles.map((article) =>
          article.id === articleData.id
            ? { ...article, ...articleData }
            : article
        )
      );

      setEditingArticle(null);
      setError(""); // Clear any previous errors

      // Optional: Show success message
      // setSuccessMessage('Article updated successfully!');
    } catch (error) {
      setError("Failed to update article");
      console.error("Error updating article:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateContent = (content, maxLength = 100) => {
    if (!content) return "";
    return content.length > maxLength
      ? content.substring(0, maxLength) + "..."
      : content;
  };

  if (!isAuthenticated) {
    return (
      <main className="user-dashboard">
        <div className="dashboard-container">
          <div className="auth-required">
            <div className="auth-icon">🔐</div>
            <h2>Authentication Required</h2>
            <p>Please sign in to access your dashboard</p>
          </div>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="user-dashboard">
        <div className="dashboard-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading your articles...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="user-dashboard">
      <div className="dashboard-container">
        {/* Dashboard Header */}
        <header className="dashboard-header">
          <div className="user-info">
            <h1>My Dashboard</h1>
            <p>Welcome back, {user?.name || "User"}!</p>
          </div>
          <div className="dashboard-actions">
            <Link to="/create-article" className="btn btn-primary">
              ✏️ Create New Article
            </Link>
          </div>
        </header>

        {/* Dashboard Stats */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-number">{myArticles.length}</div>
            <div className="stat-label">Articles</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {myArticles.reduce(
                (total, article) => total + (article.comments_count || 0),
                0
              )}
            </div>
            <div className="stat-label">Total Comments</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {myArticles.filter((article) => article.published).length}
            </div>
            <div className="stat-label">Published</div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
            <button onClick={() => setError("")} className="error-close">
              ✕
            </button>
          </div>
        )}

        {/* My Articles Section */}
        <section className="my-articles-section">
          <div className="section-header">
            <h2>My Articles</h2>
            <span className="article-count">{myArticles.length} articles</span>
          </div>

          {myArticles.length === 0 ? (
            <div className="no-articles">
              <div className="no-articles-icon">📝</div>
              <h3>No Articles Yet</h3>
              <p>Start sharing your thoughts with the world!</p>
              <Link to="/create-article" className="btn btn-primary">
                Create Your First Article
              </Link>
            </div>
          ) : (
            <div className="articles-grid">
              {myArticles.map((article) => (
                <article key={article.id} className="article-card">
                  {/* Article Image */}
                  {article.image_url && (
                    <div className="article-image">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  {/* Article Content */}
                  <div className="article-content">
                    <div className="article-header">
                      <h3 className="article-title">{article.title}</h3>
                      <div className="article-status">
                        <span
                          className={`status-badge ${
                            article.published ? "published" : "draft"
                          }`}
                        >
                          {article.published ? "✅ Published" : "📝 Draft"}
                        </span>
                      </div>
                    </div>

                    <p className="article-excerpt">
                      {truncateContent(article.content)}
                    </p>

                    <div className="article-meta">
                      <div className="meta-info">
                        <span className="date">
                          {formatDate(article.created_at)}
                        </span>
                        <span className="comments">
                          💬 {article.comments_count || 0}
                        </span>
                      </div>
                    </div>

                    {/* Article Actions */}
                    <div className="article-actions">
                      <Link
                        to={`/article/${article.id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        👁️ View
                      </Link>
                      <button
                        onClick={() => setEditingArticle(article)}
                        className="btn btn-secondary btn-sm"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(article.id)}
                        className="btn btn-danger btn-sm"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Delete Article</h3>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete this article? This action
                  cannot be undone.
                </p>
              </div>
              <div className="modal-actions">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteArticle(showDeleteConfirm)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Article Modal (Basic) */}
        {editingArticle && (
          <div className="modal-overlay">
            <div className="modal edit-modal">
              <div className="modal-header">
                <h3>Edit Article</h3>
                <button
                  onClick={() => setEditingArticle(null)}
                  className="modal-close"
                >
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={editingArticle.title}
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle,
                        title: e.target.value,
                      })
                    }
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Content</label>
                  <textarea
                    value={editingArticle.content}
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle,
                        content: e.target.value,
                      })
                    }
                    className="form-textarea"
                    rows="10"
                  />
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="url"
                    value={editingArticle.image_url || ""}
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle,
                        image_url: e.target.value,
                      })
                    }
                    className="form-input"
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button
                  onClick={() => setEditingArticle(null)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateArticle(editingArticle)}
                  className="btn btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
