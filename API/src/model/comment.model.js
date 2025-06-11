import db from "../config/db.js";

class CommentModel {
  // Create a new comment
  static async create({ content, article_id, user_id }) {
    try {
      const [result] = await db.query(
        `INSERT INTO comments (content, article_id, user_id) 
         VALUES (?, ?, ?)`,
        [content, article_id, user_id]
      );

      const [newComment] = await db.query(
        `SELECT c.id, c.content, c.article_id, c.user_id, 
                c.created_at, c.updated_at, u.name as author_name
         FROM comments c
         JOIN users u ON c.user_id = u.id
         WHERE c.id = ?`,
        [result.insertId]
      );

      return newComment[0] ?? null;
    } catch (err) {
      throw new Error(`Database error: ${err.message}`);
    }
  }

  // Get all comments for an article
  static async getByArticleId(articleId) {
    try {
      const [rows] = await db.query(
        `SELECT c.id, c.content, c.article_id, c.user_id, 
                c.created_at, c.updated_at, u.name as author_name
         FROM comments c
         JOIN users u ON c.user_id = u.id
         WHERE c.article_id = ?
         ORDER BY c.created_at DESC`,
        [articleId]
      );
      return rows;
    } catch (err) {
      throw new Error(`Database error: ${err.message}`);
    }
  }

  // Get all comments (admin use)
  static async getAll() {
    try {
      const [rows] = await db.query(
        `SELECT c.id, c.content, c.article_id, c.user_id, 
                c.created_at, c.updated_at, u.name as author_name,
                a.title as article_title
         FROM comments c
         JOIN users u ON c.user_id = u.id
         JOIN articles a ON c.article_id = a.id
         ORDER BY c.created_at DESC`
      );
      return rows;
    } catch (err) {
      throw new Error(`Database error: ${err.message}`);
    }
  }

  // Get comment by ID
  static async findById(id) {
    try {
      const [rows] = await db.query(
        `SELECT c.id, c.content, c.article_id, c.user_id, 
                c.created_at, c.updated_at, u.name as author_name
         FROM comments c
         JOIN users u ON c.user_id = u.id
         WHERE c.id = ?`,
        [id]
      );
      return rows[0] ?? null;
    } catch (err) {
      throw new Error(`Database error: ${err.message}`);
    }
  }

  // Get comments by user ID
  static async getByUserId(userId) {
    try {
      const [rows] = await db.query(
        `SELECT c.id, c.content, c.article_id, c.user_id, 
                c.created_at, c.updated_at, u.name as author_name,
                a.title as article_title
         FROM comments c
         JOIN users u ON c.user_id = u.id
         JOIN articles a ON c.article_id = a.id
         WHERE c.user_id = ?
         ORDER BY c.created_at DESC`,
        [userId]
      );
      return rows;
    } catch (err) {
      throw new Error(`Database error: ${err.message}`);
    }
  }

  // Update comment
  static async update(id, { content }) {
    try {
      const [result] = await db.query(
        `UPDATE comments 
         SET content = ?
         WHERE id = ?`,
        [content, id]
      );

      return result.affectedRows > 0 ? await this.findById(id) : null;
    } catch (err) {
      throw new Error(`Database error: ${err.message}`);
    }
  }

  // Delete comment
  static async delete(id) {
    try {
      const [result] = await db.query(
        "DELETE FROM comments WHERE id = ?",
        [id]
      );
      return result.affectedRows > 0;
    } catch (err) {
      throw new Error(`Database error: ${err.message}`);
    }
  }
}

export default CommentModel;