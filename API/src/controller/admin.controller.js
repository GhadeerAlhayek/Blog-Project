import ArticleModel from "../model/articale.model.js";
import UserModel from "../model/user.model.js";
import AdminModel from "../model/admin.model.js";
import db from "../config/db.js";

/**
 * Log admin actions for audit trail
 */
const logAdminAction = async (adminId, actionType, targetType, targetId, description) => {
  try {
    await db.query(
      `INSERT INTO admin_actions (admin_id, action_type, target_type, target_id, description)
       VALUES (?, ?, ?, ?, ?)`,
      [adminId, actionType, targetType, targetId, description]
    );
  } catch (error) {
    console.error('Failed to log admin action:', error);
  }
};

/**
 * Get admin dashboard stats
 * GET /api/admin/stats
 */
export const getAdminStats = async (req, res) => {
  try {
    // Get basic counts
    const [usersResult] = await db.query('SELECT COUNT(*) as count FROM users');
    const [articlesResult] = await db.query('SELECT COUNT(*) as count FROM articles');
    const [publishedResult] = await db.query('SELECT COUNT(*) as count FROM articles WHERE published = 1');
    const [draftsResult] = await db.query('SELECT COUNT(*) as count FROM articles WHERE published = 0');
    const [commentsResult] = await db.query('SELECT COUNT(*) as count FROM comments');

    // Get recent articles
    const [recentArticles] = await db.query(
      `SELECT a.id, a.title, a.published, a.created_at, u.name as author_name
       FROM articles a 
       JOIN users u ON a.user_id = u.id 
       ORDER BY a.created_at DESC 
       LIMIT 5`
    );

    // Get recent users
    const [recentUsers] = await db.query(
      `SELECT id, name, email, role, created_at
       FROM users 
       ORDER BY created_at DESC 
       LIMIT 5`
    );

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalUsers: usersResult[0].count,
          totalArticles: articlesResult[0].count,
          publishedArticles: publishedResult[0].count,
          draftArticles: draftsResult[0].count,
          totalComments: commentsResult[0].count
        },
        recentArticles,
        recentUsers
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve admin stats",
      error: error.message
    });
  }
};

/**
 * Get all articles (including drafts) - Admin only
 * GET /api/admin/articles
 */
export const getAllArticlesAdmin = async (req, res) => {
  try {
    const articles = await ArticleModel.getAll();
    
    res.status(200).json({
      success: true,
      message: "Articles retrieved successfully",
      data: {
        articles,
        count: articles.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve articles",
      error: error.message
    });
  }
};

/**
 * Delete any article - Admin only
 * DELETE /api/admin/articles/:id
 */
export const deleteArticleAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.id;

    // Get article details before deletion for logging
    const article = await ArticleModel.findById(id);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found"
      });
    }

    // Delete the article
    const deleted = await ArticleModel.delete(id);
    
    if (!deleted) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete article"
      });
    }

    // Log admin action
    await logAdminAction(
      adminId, 
      'article_delete', 
      'article', 
      id, 
      `Deleted article: "${article.title}" by ${article.author_name}`
    );

    res.status(200).json({
      success: true,
      message: "Article deleted successfully",
      data: { deletedArticle: article }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete article",
      error: error.message
    });
  }
};

/**
 * Update any article - Admin only
 * PUT /api/admin/articles/:id
 */
export const updateArticleAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image_url, published } = req.body;
    const adminId = req.user.id;

    // Get original article for logging
    const originalArticle = await ArticleModel.findById(id);
    if (!originalArticle) {
      return res.status(404).json({
        success: false,
        message: "Article not found"
      });
    }

    // Update article
    const updatedArticle = await ArticleModel.update(id, {
      title: title || originalArticle.title,
      content: content || originalArticle.content,
      image_url: image_url !== undefined ? image_url : originalArticle.image_url,
      published: published !== undefined ? published : originalArticle.published
    });

    if (!updatedArticle) {
      return res.status(500).json({
        success: false,
        message: "Failed to update article"
      });
    }

    // Log admin action
    await logAdminAction(
      adminId, 
      'article_update', 
      'article', 
      id, 
      `Updated article: "${originalArticle.title}" by ${originalArticle.author_name}`
    );

    res.status(200).json({
      success: true,
      message: "Article updated successfully",
      data: { article: updatedArticle }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update article",
      error: error.message
    });
  }
};

/**
 * Get all users - Admin only
 * GET /api/admin/users
 */
export const getAllUsersAdmin = async (req, res) => {
  try {
    const users = await UserModel.getAll();
    
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: {
        users,
        count: users.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
      error: error.message
    });
  }
};

/**
 * Grant admin privileges to a user
 * POST /api/admin/promote/:userId
 */
export const promoteToAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const adminId = req.user.id;

    // Check if user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check if user is already admin
    const isAlreadyAdmin = await AdminModel.isAdmin(userId);
    if (isAlreadyAdmin) {
      return res.status(400).json({
        success: false,
        message: "User is already an admin"
      });
    }

    // Grant admin privileges
    const granted = await AdminModel.grantAdmin(userId);
    
    if (!granted) {
      return res.status(500).json({
        success: false,
        message: "Failed to grant admin privileges"
      });
    }

    // Log admin action
    await logAdminAction(
      adminId,
      'user_promote',
      'user',
      userId,
      `Promoted user "${user.name}" to admin`
    );

    res.status(200).json({
      success: true,
      message: "User promoted to admin successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to promote user to admin",
      error: error.message
    });
  }
};