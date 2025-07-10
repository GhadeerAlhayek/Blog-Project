import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import ApiService from '../../utils/api.js';

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Comment form state
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    if (id) {
      loadArticle();
      loadComments();
    }
  }, [id]);

  const loadArticle = async () => {
    try {
      const data = await ApiService.getArticleById(id);
      console.log('📄 Raw article response:', data);
      
      const articleData = data.article || data;
      console.log('📄 Processed article:', articleData);
      
      setArticle(articleData);
    } catch (error) {
      setError('Failed to load article');
      console.error('Error loading article:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const data = await ApiService.getCommentsByArticle(id);
      console.log('💬 Raw comments response:', data);
      
      const commentsData = data.comments || data || [];
      console.log('💬 Processed comments:', commentsData);
      
      setComments(Array.isArray(commentsData) ? commentsData : []);
    } catch (error) {
      console.error('Error loading comments:', error);
      setComments([]);
    }
  };

  // Comment submission
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      setError('Please enter a comment');
      return;
    }

    setSubmittingComment(true);
    try {
      const commentData = {
        content: newComment.trim(),
        article_id: parseInt(id)
      };

      const createdComment = await ApiService.createComment(commentData);
      console.log('✅ Comment created:', createdComment);
      
      // Add new comment to the list
      const newCommentWithUser = {
        ...createdComment,
        author_name: user?.name || 'You',
        created_at: new Date().toISOString()
      };
      
      setComments([newCommentWithUser, ...comments]);
      setNewComment('');
      setError('');
      
    } catch (error) {
      setError('Failed to post comment: ' + error.message);
      console.error('Error posting comment:', error);
    } finally {
      setSubmittingComment(false);
    }
  };

  // Comment editing
  const handleUpdateComment = async (commentId, newContent) => {
    try {
      const updatedComment = await ApiService.updateComment(commentId, {
        content: newContent
      });
      
      console.log('✅ Comment updated:', updatedComment);
      
      // Update comment in the list
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, content: newContent, updated_at: new Date().toISOString() }
          : comment
      ));
      
      setEditingComment(null);
      setError('');
      
    } catch (error) {
      setError('Failed to update comment: ' + error.message);
      console.error('Error updating comment:', error);
    }
  };

  // Comment deletion
  const handleDeleteComment = async (commentId) => {
    try {
      await ApiService.deleteComment(commentId);
      console.log('✅ Comment deleted');
      
      // Remove comment from the list
      setComments(comments.filter(comment => comment.id !== commentId));
      setShowDeleteConfirm(null);
      setError('');
      
    } catch (error) {
      setError('Failed to delete comment: ' + error.message);
      console.error('Error deleting comment:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const estimateReadingTime = (content) => {
    if (!content || typeof content !== 'string') {
      return 1;
    }
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  if (loading) {
    return (
      <main className="article-detail">
        <div className="article-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading article...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="article-detail">
        <div className="article-container">
          <div className="error-state">
            <div className="error-icon">📄</div>
            <h2>Article Not Found</h2>
            <p>{error || 'The article you\'re looking for doesn\'t exist.'}</p>
            <button 
              onClick={() => navigate('/')} 
              className="btn btn-primary"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="article-detail">
      <div className="article-container">
        
        {/* Back Navigation */}
        <div className="back-nav">
          <button 
            onClick={() => navigate('/')} 
            className="back-btn"
          >
            ← Back to Articles
          </button>
        </div>

        {/* Article Header */}
        <header className="article-header">
          <h1 className="article-title">{article.title}</h1>
          
          <div className="article-meta">
            <div className="author-info">
              <span className="author">By {article.author_name || 'Anonymous'}</span>
              <span className="date">{formatDate(article.created_at)}</span>
            </div>
            
            <div className="reading-info">
              <span className="reading-time">
                📖 {estimateReadingTime(article.content)} min read
              </span>
              <span className="comments-count">
                💬 {comments.length} comment{comments.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {article.image_url && (
          <div className="article-image">
            <img 
              src={article.image_url} 
              alt={article.title}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Article Content */}
        <div className="article-content">
          <div className="content-body">
            {article.content ? (
              article.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index}>{paragraph.trim()}</p>
                )
              ))
            ) : (
              <p>No content available</p>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
            <button 
              onClick={() => setError('')}
              className="error-close"
            >
              ✕
            </button>
          </div>
        )}

        {/* Comments Section */}
        <section className="comments-section">
          <div className="comments-header">
            <h3>Comments ({comments.length})</h3>
          </div>

          {/* Comment Form */}
          {isAuthenticated ? (
            <div className="comment-form">
              <h4>Leave a Comment</h4>
              <form onSubmit={handleSubmitComment}>
                <textarea 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="comment-input"
                  rows="4"
                  disabled={submittingComment}
                />
                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={submittingComment || !newComment.trim()}
                  >
                    {submittingComment ? 'Posting...' : 'Post Comment'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="auth-prompt">
              <p>Sign in to leave a comment</p>
            </div>
          )}

          {/* Comments List */}
          <div className="comments-list">
            {comments.length > 0 ? (
              comments.map(comment => (
                <div key={comment.id} className="comment">
                  <div className="comment-header">
                    <div className="comment-author">
                      <span className="author-name">
                        {comment.author_name || 'Anonymous'}
                      </span>
                      <span className="comment-date">
                        {formatDate(comment.created_at)}
                        {comment.updated_at && comment.updated_at !== comment.created_at && (
                          <span className="edited-indicator"> (edited)</span>
                        )}
                      </span>
                    </div>
                    
                    {/* Comment Actions - only show for comment owner */}
                    {isAuthenticated && user && comment.user_id === user.id && (
                      <div className="comment-actions">
                        <button 
                          onClick={() => setEditingComment(comment)}
                          className="btn-icon"
                          title="Edit comment"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => setShowDeleteConfirm(comment.id)}
                          className="btn-icon btn-danger"
                          title="Delete comment"
                        >
                          🗑️
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="comment-content">
                    <p>{comment.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-comments">
                <div className="no-comments-icon">💬</div>
                <p>No comments yet. Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </section>

        {/* Edit Comment Modal */}
        {editingComment && (
          <div className="modal-overlay">
            <div className="modal comment-modal">
              <div className="modal-header">
                <h3>Edit Comment</h3>
                <button 
                  onClick={() => setEditingComment(null)}
                  className="modal-close"
                >
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <textarea 
                  value={editingComment.content}
                  onChange={(e) => setEditingComment({
                    ...editingComment,
                    content: e.target.value
                  })}
                  className="comment-input"
                  rows="4"
                />
              </div>
              <div className="modal-actions">
                <button 
                  onClick={() => setEditingComment(null)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleUpdateComment(editingComment.id, editingComment.content)}
                  className="btn btn-primary"
                  disabled={!editingComment.content.trim()}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Comment Confirmation */}
        {showDeleteConfirm && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Delete Comment</h3>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this comment? This action cannot be undone.</p>
              </div>
              <div className="modal-actions">
                <button 
                  onClick={() => setShowDeleteConfirm(null)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleDeleteComment(showDeleteConfirm)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}