import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import ApiService from '../../utils/api.js';

export default function CreateArticle() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    published: true
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!formData.content.trim()) {
      setError('Content is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const articleData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        image_url: formData.image_url.trim() || null,
        published: formData.published ? 1 : 0
      };

      console.log('📝 Creating article:', articleData);
      const createdArticle = await ApiService.createArticle(articleData);
      console.log('✅ Article created:', createdArticle);

      // Redirect to the new article
      navigate(`/article/${createdArticle.id}`);
      
    } catch (error) {
      setError('Failed to create article: ' + error.message);
      console.error('Error creating article:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    // Simple preview - you can enhance this later
    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Preview: ${formData.title}</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            h1 { color: #333; }
            p { line-height: 1.6; }
            img { max-width: 100%; height: auto; }
          </style>
        </head>
        <body>
          <h1>${formData.title}</h1>
          ${formData.image_url ? `<img src="${formData.image_url}" alt="Article image" />` : ''}
          <div>${formData.content.split('\n').map(p => `<p>${p}</p>`).join('')}</div>
        </body>
      </html>
    `);
    previewWindow.document.close();
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="create-article">
      <div className="create-article-container">
        
        {/* Header */}
        <header className="create-article-header">
          <div className="header-content">
            <h1>Create New Article</h1>
            <p>Share your thoughts with the world</p>
          </div>
          <div className="header-actions">
            <button 
              onClick={() => navigate('/dashboard')}
              className="btn btn-secondary"
            >
              ← Back to Dashboard
            </button>
          </div>
        </header>

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

        {/* Article Form */}
        <form onSubmit={handleSubmit} className="article-form">
          
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Article Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter an engaging title..."
              disabled={loading}
              maxLength={200}
            />
            <div className="form-hint">
              {formData.title.length}/200 characters
            </div>
          </div>

          {/* Image URL */}
          <div className="form-group">
            <label htmlFor="image_url">Featured Image URL (Optional)</label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
              className="form-input"
              placeholder="https://example.com/image.jpg"
              disabled={loading}
            />
            <div className="form-hint">
              Add a URL to an image that represents your article
            </div>
            {formData.image_url && (
              <div className="image-preview">
                <img 
                  src={formData.image_url} 
                  alt="Preview" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="form-group">
            <label htmlFor="content">Article Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="form-textarea"
              placeholder="Write your article content here..."
              disabled={loading}
              rows={15}
            />
            <div className="form-hint">
              {formData.content.length} characters • 
              {Math.ceil(formData.content.split(/\s+/).length / 200)} min read
            </div>
          </div>

          {/* Publish Status */}
          <div className="form-group">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={formData.published}
                onChange={handleInputChange}
                disabled={loading}
              />
              <label htmlFor="published">
                Publish immediately
              </label>
            </div>
            <div className="form-hint">
              {formData.published ? 
                'Article will be published and visible to everyone' : 
                'Article will be saved as draft'
              }
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button 
              type="button"
              onClick={handlePreview}
              className="btn btn-secondary"
              disabled={loading || !formData.title.trim() || !formData.content.trim()}
            >
              👁️ Preview
            </button>
            
            <button 
              type="submit"
              className="btn btn-primary"
              disabled={loading || !formData.title.trim() || !formData.content.trim()}
            >
              {loading ? 'Creating...' : (formData.published ? '🚀 Publish Article' : '📝 Save Draft')}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}