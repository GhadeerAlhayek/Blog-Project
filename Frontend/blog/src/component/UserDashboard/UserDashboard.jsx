import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import ApiService from "../../utils/api.js";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUser } = useAuth();

  // Core state
  const [activeTab, setActiveTab] = useState("overview");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Profile state - only name and email
  const [profileData, setProfileData] = useState({
    name: "",
    email: ""
  });

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Modal states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [deletingArticle, setDeletingArticle] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    content: "",
    image_url: ""
  });

  // Initialize component
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    // Set profile data from user
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || ""
      });
    }

    // Load articles on mount
    loadUserArticles();
  }, [isAuthenticated, navigate, user]);

  // Load user articles
  const loadUserArticles = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getMyArticles();
      setArticles(Array.isArray(response.data?.articles) ? response.data.articles : []);
    } catch (error) {
      console.error("Error loading articles:", error);
      setError("Failed to load articles");
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  // Show messages
  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(""), 5000);
  };

  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(""), 3000);
  };

  // Profile handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    if (!profileData.name.trim()) {
      showError("Name is required");
      return;
    }

    if (!profileData.email.trim()) {
      showError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.email)) {
      showError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const response = await ApiService.updateUserProfile({
        id: user.id,
        name: profileData.name.trim(),
        email: profileData.email.trim()
      });

      if (response.success) {
        updateUser({
          ...user,
          name: response.data.user.name,
          email: response.data.user.email
        });
        showSuccess("Profile updated successfully!");
      } else {
        showError(response.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      showError("Failed to update profile: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Password handlers
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!passwordData.currentPassword) {
      showError("Current password is required");
      return;
    }

    if (!passwordData.newPassword) {
      showError("New password is required");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showError("New password must be at least 6 characters long");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showError("New passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await ApiService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      if (response.success) {
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
        showSuccess("Password changed successfully!");
      } else {
        showError(response.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Password change error:", error);
      showError("Failed to change password: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Article handlers
  const handleEditClick = (article) => {
    setEditingArticle(article);
    setEditFormData({
      title: article.title,
      content: article.content,
      image_url: article.image_url || ""
    });
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingArticle) return;

    try {
      setLoading(true);
      const response = await ApiService.updateArticle(editingArticle.id, editFormData);
      
      if (response.success) {
        setArticles(articles.map(article =>
          article.id === editingArticle.id 
            ? { ...article, ...response.data.article }
            : article
        ));
        setEditModalOpen(false);
        setEditingArticle(null);
        showSuccess("Article updated successfully!");
      } else {
        showError(response.message || "Failed to update article");
      }
    } catch (error) {
      console.error("Update article error:", error);
      showError("Failed to update article: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (article) => {
    setDeletingArticle(article);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingArticle) return;

    try {
      setLoading(true);
      const response = await ApiService.deleteArticle(deletingArticle.id);
      
      if (response.success) {
        setArticles(articles.filter(article => article.id !== deletingArticle.id));
        setDeleteModalOpen(false);
        setDeletingArticle(null);
        showSuccess("Article deleted successfully!");
      } else {
        showError(response.message || "Failed to delete article");
      }
    } catch (error) {
      console.error("Delete article error:", error);
      showError("Failed to delete article: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const totalArticles = articles.length;
  const publishedArticles = articles.filter(article => article.published).length;
  const draftArticles = totalArticles - publishedArticles;
  const totalComments = articles.reduce((sum, article) => sum + (article.comment_count || 0), 0);

  // Render navigation
  const renderNavigation = () => (
    <nav className="dashboard-nav">
      <button 
        className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
        onClick={() => setActiveTab('overview')}
      >
        📊 Overview
      </button>
      <button 
        className={`nav-tab ${activeTab === 'articles' ? 'active' : ''}`}
        onClick={() => setActiveTab('articles')}
      >
        📝 My Articles
      </button>
      <button 
        className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
        onClick={() => setActiveTab('profile')}
      >
        👤 Profile
      </button>
      <button 
        className={`nav-tab ${activeTab === 'password' ? 'active' : ''}`}
        onClick={() => setActiveTab('password')}
      >
        🔒 Password
      </button>
    </nav>
  );

  // Render overview tab
  const renderOverview = () => (
    <div className="dashboard-section">
      <h2>Dashboard Overview</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📄</div>
          <div className="stat-content">
            <div className="stat-number">{totalArticles}</div>
            <div className="stat-label">Total Articles</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🚀</div>
          <div className="stat-content">
            <div className="stat-number">{publishedArticles}</div>
            <div className="stat-label">Published</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <div className="stat-number">{draftArticles}</div>
            <div className="stat-label">Drafts</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💬</div>
          <div className="stat-content">
            <div className="stat-number">{totalComments}</div>
            <div className="stat-label">Comments</div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <Link to="/create-article" className="btn btn-primary">
            ✏️ Create New Article
          </Link>
          <button 
            className="btn btn-secondary"
            onClick={() => setActiveTab('articles')}
          >
            📝 View All Articles
          </button>
        </div>
      </div>
    </div>
  );

  // Render articles tab
  const renderArticles = () => (
    <div className="dashboard-section">
      <div className="section-header">
        <h2>My Articles</h2>
        <Link to="/create-article" className="btn btn-primary">
          ✏️ Create New Article
        </Link>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your articles...</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No articles yet</h3>
          <p>Start writing your first article to share your thoughts with the world!</p>
          <Link to="/create-article" className="btn btn-primary">
            Create Your First Article
          </Link>
        </div>
      ) : (
        <div className="articles-grid">
          {articles.map((article) => (
            <div key={article.id} className="article-card">
              <div className="article-header">
                <h3>{article.title}</h3>
                <div className="article-status">
                  <span className={`status-badge ${article.published ? 'published' : 'draft'}`}>
                    {article.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>

              <div className="article-meta">
                <div className="meta-item">
                  <span className="meta-icon">📅</span>
                  <span>{new Date(article.created_at).toLocaleDateString()}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">💬</span>
                  <span>{article.comment_count || 0} comments</span>
                </div>
              </div>

              <div className="article-content">
                <p>{article.content?.substring(0, 100)}...</p>
              </div>

              <div className="article-actions">
                <Link to={`/article/${article.id}`} className="btn btn-secondary">
                  👁️ View
                </Link>
                <button 
                  onClick={() => handleEditClick(article)}
                  className="btn btn-primary"
                  disabled={loading}
                >
                  ✏️ Edit
                </button>
                <button 
                  onClick={() => handleDeleteClick(article)}
                  className="btn btn-danger"
                  disabled={loading}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Render profile tab
  const renderProfile = () => (
    <div className="dashboard-section">
      <h2>Profile Settings</h2>
      <form className="profile-form" onSubmit={handleProfileSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            value={profileData.name}
            onChange={handleProfileChange}
            placeholder="Enter your full name"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={profileData.email}
            onChange={handleProfileChange}
            placeholder="Enter your email address"
            required
            disabled={loading}
          />
          <div className="form-hint">
            Make sure this email is accessible as it's used for account notifications
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </form>
    </div>
  );

  // Render password tab
  const renderPassword = () => (
    <div className="dashboard-section">
      <h2>Change Password</h2>
      <form className="profile-form" onSubmit={handlePasswordSubmit}>
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            className="form-input"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            placeholder="Enter your current password"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="form-input"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            placeholder="Enter new password"
            required
            disabled={loading}
            minLength="6"
          />
          <div className="form-hint">
            Password must be at least 6 characters long
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-input"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            placeholder="Confirm new password"
            required
            disabled={loading}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Changing...' : 'Change Password'}
          </button>
        </div>
      </form>
    </div>
  );

  // Render edit modal
  const renderEditModal = () => (
    <div className="modal-overlay" onClick={() => setEditModalOpen(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Edit Article</h3>
          <button onClick={() => setEditModalOpen(false)} className="modal-close">
            ✕
          </button>
        </div>

        <form onSubmit={handleEditSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="edit-title">Title</label>
            <input
              type="text"
              id="edit-title"
              value={editFormData.title}
              onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-image">Image URL (Optional)</label>
            <input
              type="url"
              id="edit-image"
              value={editFormData.image_url}
              onChange={(e) => setEditFormData({...editFormData, image_url: e.target.value})}
              className="form-input"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-content">Content</label>
            <textarea
              id="edit-content"
              value={editFormData.content}
              onChange={(e) => setEditFormData({...editFormData, content: e.target.value})}
              className="form-textarea"
              rows="10"
              required
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={() => setEditModalOpen(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Render delete modal
  const renderDeleteModal = () => (
    <div className="modal-overlay" onClick={() => setDeleteModalOpen(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Delete Article</h3>
          <button onClick={() => setDeleteModalOpen(false)} className="modal-close">
            ✕
          </button>
        </div>

        <div className="modal-content">
          <p>Are you sure you want to delete "{deletingArticle?.title}"?</p>
          <p><strong>This action cannot be undone.</strong></p>
        </div>

        <div className="modal-actions">
          <button
            onClick={() => setDeleteModalOpen(false)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteConfirm}
            className="btn btn-danger"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Article'}
          </button>
        </div>
      </div>
    </div>
  );

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="user-dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-content">
            <div className="user-avatar">
              <div className="avatar-circle">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
            </div>
            <div className="user-info">
              <h1>Welcome back, {user?.name || "User"}!</h1>
              <p>Manage your articles and account settings</p>
            </div>
          </div>
          <div className="header-actions">
            <Link to="/create-article" className="btn btn-primary">
              ✏️ Create New Article
            </Link>
          </div>
        </header>

        {/* Messages */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
            <button onClick={() => setError("")} className="error-close">✕</button>
          </div>
        )}

        {success && (
          <div className="success-message">
            <span className="success-icon">✅</span>
            <span>{success}</span>
            <button onClick={() => setSuccess("")} className="success-close">✕</button>
          </div>
        )}

        {/* Navigation */}
        {renderNavigation()}

        {/* Content */}
        <div className="dashboard-content">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'articles' && renderArticles()}
          {activeTab === 'profile' && renderProfile()}
          {activeTab === 'password' && renderPassword()}
        </div>

        {/* Modals */}
        {editModalOpen && renderEditModal()}
        {deleteModalOpen && renderDeleteModal()}
      </div>
    </main>
  );
}