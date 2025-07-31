import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import ApiService from '../../utils/api.js';

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // State management
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Data state
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalComments: 0
  });
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [recentArticles, setRecentArticles] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  // Check admin access
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    
    if (user?.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    
    loadAdminData();
  }, [isAuthenticated, user, navigate]);

  // Load admin dashboard data
  const loadAdminData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data.stats);
        setRecentArticles(data.data.recentArticles || []);
        setRecentUsers(data.data.recentUsers || []);
      } else {
        setError('Failed to load admin data');
      }
    } catch (error) {
      setError('Failed to connect to admin API');
      console.error('Admin data load error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load all articles
  const loadAllArticles = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/admin/articles', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setArticles(data.data.articles);
      } else {
        setError('Failed to load articles');
      }
    } catch (error) {
      setError('Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  // Load all users
  const loadAllUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.data.users);
      } else {
        setError('Failed to load users');
      }
    } catch (error) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  // Delete article
  const handleDeleteArticle = async (articleId, articleTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${articleTitle}"?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/admin/articles/${articleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Article deleted successfully');
        loadAllArticles(); // Reload articles
        loadAdminData(); // Reload stats
      } else {
        setError('Failed to delete article');
      }
    } catch (error) {
      setError('Failed to delete article');
    }
  };

  // Promote user to admin
  const handlePromoteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to promote "${userName}" to admin?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/admin/promote/${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(`${userName} promoted to admin successfully`);
        loadAllUsers(); // Reload users
      } else {
        setError(data.message || 'Failed to promote user');
      }
    } catch (error) {
      setError('Failed to promote user');
    }
  };

  // Handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'articles' && articles.length === 0) {
      loadAllArticles();
    } else if (tab === 'users' && users.length === 0) {
      loadAllUsers();
    }
  };

  // Show messages
  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 5000);
  };

  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(''), 3000);
  };

  // Render navigation
  const renderNavigation = () => (
    <nav className="dashboard-nav">
      <button
        className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
        onClick={() => handleTabChange('overview')}
      >
        📊 Overview
      </button>
      <button
        className={`nav-tab ${activeTab === 'articles' ? 'active' : ''}`}
        onClick={() => handleTabChange('articles')}
      >
        📄 All Articles
      </button>
      <button
        className={`nav-tab ${activeTab === 'users' ? 'active' : ''}`}
        onClick={() => handleTabChange('users')}
      >
        👥 All Users
      </button>
    </nav>
  );

  // Render overview tab
  const renderOverview = () => (
    <div className="dashboard-section">
      <h2>Admin Dashboard Overview</h2>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalUsers}</div>
            <div className="stat-label">Total Users</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📄</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalArticles}</div>
            <div className="stat-label">Total Articles</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🚀</div>
          <div className="stat-content">
            <div className="stat-number">{stats.publishedArticles}</div>
            <div className="stat-label">Published</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <div className="stat-number">{stats.draftArticles}</div>
            <div className="stat-label">Drafts</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💬</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalComments}</div>
            <div className="stat-label">Comments</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="admin-sections">
        <div className="admin-section">
          <h3>Recent Articles</h3>
          <div className="recent-list">
            {recentArticles.length > 0 ? (
              recentArticles.map(article => (
                <div key={article.id} className="recent-item">
                  <div className="item-info">
                    <h4>{article.title}</h4>
                    <p>By {article.author_name} • {new Date(article.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="item-status">
                    <span className={`status-badge ${article.published ? 'published' : 'draft'}`}>
                      {article.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>No recent articles</p>
            )}
          </div>
        </div>

        <div className="admin-section">
          <h3>Recent Users</h3>
          <div className="recent-list">
            {recentUsers.length > 0 ? (
              recentUsers.map(user => (
                <div key={user.id} className="recent-item">
                  <div className="item-info">
                    <h4>{user.name}</h4>
                    <p>{user.email} • {new Date(user.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="item-status">
                    <span className={`status-badge ${user.role === 'admin' ? 'admin' : 'user'}`}>
                      {user.role}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>No recent users</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => handleTabChange('articles')}
          >
            📄 Manage Articles
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => handleTabChange('users')}
          >
            👥 Manage Users
          </button>
          <Link to="/dashboard" className="btn btn-secondary">
            📊 My Dashboard
          </Link>
        </div>
      </div>
    </div>
  );

  // Render articles tab
  const renderArticles = () => (
    <div className="dashboard-section">
      <div className="section-header">
        <h2>All Articles Management</h2>
        <p>{articles.length} total articles</p>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading articles...</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📄</div>
          <h3>No articles found</h3>
          <p>No articles have been created yet.</p>
        </div>
      ) : (
        <div className="admin-articles-grid">
          {articles.map(article => (
            <div key={article.id} className="admin-article-card">
              <div className="article-header">
                <h3>{article.title}</h3>
                <div className="article-status">
                  <span className={`status-badge ${article.published ? 'published' : 'draft'}`}>
                    {article.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>

              <div className="article-meta">
                <p><strong>Author:</strong> {article.author_name}</p>
                <p><strong>Created:</strong> {new Date(article.created_at).toLocaleDateString()}</p>
                <p><strong>Updated:</strong> {new Date(article.updated_at).toLocaleDateString()}</p>
              </div>

              <div className="article-content">
                <p>{article.content?.substring(0, 100)}...</p>
              </div>

              <div className="article-actions">
                <Link 
                  to={`/article/${article.id}`}
                  className="btn btn-secondary"
                >
                  👁️ View
                </Link>
                <button
                  onClick={() => handleDeleteArticle(article.id, article.title)}
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

  // Render users tab
  const renderUsers = () => (
    <div className="dashboard-section">
      <div className="section-header">
        <h2>All Users Management</h2>
        <p>{users.length} total users</p>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading users...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <h3>No users found</h3>
          <p>No users have been registered yet.</p>
        </div>
      ) : (
        <div className="admin-users-grid">
          {users.map(user => (
            <div key={user.id} className="admin-user-card">
              <div className="user-header">
                <div className="user-avatar">
                  <div className="avatar-circle">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </div>
                <div className="user-info">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                </div>
                <div className="user-role">
                  <span className={`status-badge ${user.role === 'admin' ? 'admin' : 'user'}`}>
                    {user.role}
                  </span>
                </div>
              </div>

              <div className="user-meta">
                <p><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
                <p><strong>Last Updated:</strong> {new Date(user.updated_at).toLocaleDateString()}</p>
              </div>

              {user.role !== 'admin' && (
                <div className="user-actions">
                  <button
                    onClick={() => handlePromoteUser(user.id, user.name)}
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    ⬆️ Promote to Admin
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Don't render if not admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <main className="admin-dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-content">
            <div className="user-avatar">
              <div className="avatar-circle admin-avatar">
                👑
              </div>
            </div>
            <div className="user-info">
              <h1>Admin Dashboard</h1>
              <p>Welcome back, {user?.name}! Manage your blog platform</p>
            </div>
          </div>
          <div className="header-actions">
            <Link to="/dashboard" className="btn btn-secondary">
              📊 My Dashboard
            </Link>
          </div>
        </header>

        {/* Messages */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
            <button onClick={() => setError('')} className="error-close">✕</button>
          </div>
        )}

        {success && (
          <div className="success-message">
            <span className="success-icon">✅</span>
            <span>{success}</span>
            <button onClick={() => setSuccess('')} className="success-close">✕</button>
          </div>
        )}

        {/* Navigation */}
        {renderNavigation()}

        {/* Content */}
        <div className="dashboard-content">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'articles' && renderArticles()}
          {activeTab === 'users' && renderUsers()}
        </div>
      </div>
    </main>
  );
}