import CommentModel from "../model/comment.model.js";
import ArticleModel from "../model/articale.model.js";

/**
 * Create a new comment
 * POST /api/comments
 */
export const createComment = async (req, res) => {
  try {
    const { content, article_id } = req.body;
    const user_id = req.user.id;

    // Validate required fields
    if (!content || !article_id) {
      return res.status(400).json({
        success: false,
        message: "Content and article_id are required"
      });
    }

    // Check if article exists
    const article = await ArticleModel.findById(article_id);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found"
      });
    }

    const newComment = await CommentModel.create({
      content,
      article_id,
      user_id
    });

    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      data: { comment: newComment }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create comment"
    });
  }
};

/**
 * Get comments for an article
 * GET /api/comments/article/:articleId
 */
export const getCommentsByArticle = async (req, res) => {
  try {
    const { articleId } = req.params;

    const comments = await CommentModel.getByArticleId(articleId);

    res.status(200).json({
      success: true,
      message: "Comments retrieved successfully",
      data: { comments, count: comments.length }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve comments"
    });
  }
};

/**
 * Get my comments
 * GET /api/comments/my-comments
 */
export const getMyComments = async (req, res) => {
  try {
    const userId = req.user.id;

    const comments = await CommentModel.getByUserId(userId);

    res.status(200).json({
      success: true,
      message: "Your comments retrieved successfully",
      data: { comments, count: comments.length }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve your comments"
    });
  }
};

/**
 * Update comment
 * PUT /api/comments/:id
 */
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Content is required"
      });
    }

    const updatedComment = await CommentModel.update(id, { content });

    if (!updatedComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      data: { comment: updatedComment }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update comment"
    });
  }
};

/**
 * Delete comment
 * DELETE /api/comments/:id
 */
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await CommentModel.delete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Comment not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete comment"
    });
  }
};