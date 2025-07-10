import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  withCredentials: true, // Include cookies in requests
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
// Response interceptor to handle errors
// Response interceptor to handle your API response structure
api.interceptors.response.use(
  (response) => {
    // Handle your API response structure: { success, message, data }
    if (response.data && response.data.success && response.data.data) {
      return response.data.data; // Return the nested data object
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
    return api.post("/articles/create", articleData);
  },

  async getAllArticles() {
    return api.get("/articles/");
  },

  async getArticleById(id) {
    return api.get(`/articles/${id}`);
  },

  async getUserArticles() {
    return api.get("/articles/user/my-articles");
  },

  async updateArticle(id, articleData) {
    return api.put(`/articles/${id}`, articleData);
  },

  async deleteArticle(id) {
    return api.delete(`/articles/${id}`);
  },

  // Comment methods
  async getCommentsByArticle(articleId) {
    return api.get(`/comments/article/${articleId}`);
  },

  async createComment(content, articleId) {
    return api.post("/comments/", { content, article_id: articleId });
  },

  async getUserComments() {
    return api.get("/comments/my-comments");
  },

  async updateComment(id, content) {
    return api.put(`/comments/${id}`, { content });
  },

  async deleteComment(id) {
    return api.delete(`/comments/${id}`);
  },
};

export default ApiService;
