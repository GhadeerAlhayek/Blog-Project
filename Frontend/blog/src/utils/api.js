const API_BASE_URL = 'http://localhost:3000/api';

class ApiService {
  // Get auth token from localStorage
  getAuthToken() {
    return localStorage.getItem('token');
  }

  // Create headers with auth token
  getHeaders() {
    const token = this.getAuthToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // Generic API request method
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
      headers: this.getHeaders(),
      credentials: 'include',
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth methods
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  }

  async register(name, email, password) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST'
    });
  }

  // Article methods
  async getArticles() {
    return this.request('/articles');
  }

  async getArticle(id) {
    return this.request(`/articles/${id}`);
  }

  async createArticle(article) {
    return this.request('/articles', {
      method: 'POST',
      body: JSON.stringify(article)
    });
  }

  async updateArticle(id, article) {
    return this.request(`/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(article)
    });
  }

  async deleteArticle(id) {
    return this.request(`/articles/${id}`, {
      method: 'DELETE'
    });
  }

  // Comment methods
  async getComments(articleId) {
    return this.request(`/articles/${articleId}/comments`);
  }

  async createComment(articleId, content) {
    return this.request(`/articles/${articleId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content })
    });
  }
}

export default new ApiService();