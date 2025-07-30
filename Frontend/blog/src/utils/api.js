import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  withCredentials: true, // Include cookies in requests
});
// Add this BEFORE your response interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Add Bearer token to Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Your existing response interceptor...

// Request interceptor to add auth token
// Update your response interceptor in api.js
api.interceptors.response.use(
  (response) => {
    // Handle your API response structure: { success, message, data }
    if (response.data && response.data.success && response.data.data) {
      const data = response.data.data;

      // Handle nested article structure
      if (data.article) {
        return data.article; // Return the article object directly
      }

      // Handle nested comments structure
      if (data.comments) {
        return data.comments; // Return the comments array directly
      }
      // Handle single comment structure (singular) ← ADD THIS
      if (data.comment) {
        return data.comment; // Return the single comment object
      }

      // Handle nested articles structure (for getAllArticles)
      if (data.articles) {
        return data.articles; // Return the articles array directly
      }

      return data; // Return the nested data object for other endpoints
    }

    // For other responses, return as-is
    return response.data;
  },
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || "Server error occurred";

      if (error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
      }

      return Promise.reject(new Error(message));
    } else if (error.request) {
      return Promise.reject(
        new Error("Network error. Please check your connection.")
      );
    } else {
      return Promise.reject(new Error("An unexpected error occurred."));
    }
  }
);

// API service methods - Updated to match your backend endpoints
const ApiService = {
  // Auth methods
  async login(email, password) {
    return api.post("/auth/login", { email, password });
  },

  async register(name, email, password) {
    return api.post("/auth/register", { name, email, password });
  },

  async logout() {
    return api.post("/auth/logout");
  },

  async getUserByEmail(email) {
    return api.get(`/auth/user/${email}`);
  },

  async forgotPassword(email) {
    return api.post("/auth/password/forgot", { email });
  },

  async resetPassword(token, password) {
    return api.post("/auth/password/reset", { token, password });
  },

  // User methods
  async getAllUsers() {
    return api.get("/users/");
  },

  async getUserById(id) {
    return api.get(`/users/${id}`);
  },

  async updateUser(id, userData) {
    return api.put(`/users/${id}`, userData);
  },

  async deleteUser(id) {
    return api.delete(`/users/${id}`);
  },

  // Article methods (All require authentication)
    async createArticle(articleData) {
    try {
      console.log('📝 Creating article:', articleData);
      const response = await api.post('/articles/create', articleData);
      console.log('✅ Article created response:', response);
      return response;
    } catch (error) {
      console.error('❌ Error creating article:', error);
      throw error;
    }
  },

  async getAllArticles() {
    try {
      const response = await api.get("/articles/");
      // Handle the nested structure specifically for articles
      return response.articles || response || [];
    } catch (error) {
      throw error;
    }
  },

  // Article methods
  async getArticleById(id) {
    try {
      const response = await api.get(`/articles/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getMyArticles() {
    try {
      const response = await api.get("/articles/user/my-articles");
      return response;
    } catch (error) {
      throw error;
    }
  },

  // async getUserArticles() {
  //   try {
  //     const response = await api.get("/articles/user/my-articles");
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  async updateArticle(id, articleData) {
    try {
      const response = await api.put(`/articles/${id}`, articleData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async deleteArticle(id) {
    try {
      const response = await api.delete(`/articles/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

   // Upload methods
  async uploadImage(file) {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  async deleteImage(filename) {
    try {
      const response = await api.delete(`/upload/image/${filename}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async createComment(commentData) {
    try {
      const response = await api.post("/comments", commentData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async updateComment(id, commentData) {
    try {
      const response = await api.put(`/comments/${id}`, commentData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async deleteComment(id) {
    try {
      const response = await api.delete(`/comments/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getMyComments() {
    try {
      const response = await api.get("/comments/my-comments");
      return response;
    } catch (error) {
      throw error;
    }
  },
  async getCommentsByArticle(articleId) {
    try {
      const response = await api.get(`/comments/article/${articleId}`);
      return response;
    } catch (error) {
      console.error("❌ Error fetching comments:", error);
      throw error;
    }
  },
  // async getCommentsByArticle(articleId) {
  //   try {
  //     const response = await api.get(`/comments/article/${articleId}`);
  //     return response;
  //   } catch (error) {
  //     console.error("❌ Error fetching comments:", error);
  //     throw error;
  //   }
  // },

  // Add these missing methods for UserDashboard
  async updateUserProfile(profileData) {
    try {
      const response = await api.put(`/users/${profileData.id}`, profileData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async changePassword(passwordData) {
    try {
      const response = await api.post("/auth/password/change", passwordData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async updatePreferences(preferences) {
    try {
      const response = await api.put("/users/preferences", preferences);
      return response;
    } catch (error) {
      throw error;
    }
  },

};

export default ApiService;
