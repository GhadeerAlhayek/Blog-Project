import db from "../config/db.js";

class ArticleModel {
  // Create
  static async create({
    title,
    content,
    image_url,
    user_id,
    published = true,
  }) {
    try {
      const [result] = await db.query(
        `INSERT INTO articles (title, content, image_url, user_id, published)
         VALUES (?, ?, ?, ?, ?)`,
        [title, content, image_url, user_id, published]
      );

      const [newArticle] = await db.query(
        `SELECT id, title, content, image_url, user_id, published, created_at, updated_at
         FROM articles
         WHERE id = ?`,
        [result.insertId]
      );

      return newArticle[0] ?? null;
    } catch (err) {
      throw new Error(`Database error: ${err.message}`);
    }
  }

  // Get all articles (with optional filtering)
  static async getAll({ published, user_id, limit, offset } = {}) {
    try {
      let query = `
        SELECT a.id, a.title, a.content, a.image_url, a.user_id, a.published, 
               a.created_at, a.updated_at, u.name as author_name
        FROM articles a
        JOIN users u ON a.user_id = u.id
      `;

      const [articles] = await db.query(query, queryParams);
      return articles;
    } catch (err) {
      throw new Error(`Database error: ${err.message}`);
    }
  }

  // Get article by id
  static async findById(id) {
    try {
      const [rows] = await db.query(
        `SELECT a.id, a.title, a.content, a.image_url, a.user_id, a.published, 
                a.created_at, a.updated_at, u.name as author_name
         FROM articles a
         JOIN users u ON a.user_id = u.id
         WHERE a.id = ?`,
        [id]
      );
      return rows[0] ?? null;
    } catch (err) {
      throw new Error(`Database error: ${err.message}`);
    }
  }

  // Update article
  static async update(id, { title, content, image_url, published }) {
    try {
      const articleId = Number(id);
      let updateFields = [];
      let queryParams = [];

      // Build dynamic query based on provided fields
      if (title !== undefined) {
        updateFields.push("title = ?");
        queryParams.push(title);
      }

      if (content !== undefined) {
        updateFields.push("content = ?");
        queryParams.push(content);
      }

      if (image_url !== undefined) {
        updateFields.push("image_url = ?");
        queryParams.push(image_url);
      }

      if (published !== undefined) {
        updateFields.push("published = ?");
        queryParams.push(published);
      }

      // If nothing was provided, there’s nothing to update:
      if (updateFields.length === 0) {
        return null;
      }

      // Add ID to query params as the last parameter
      queryParams.push(articleId);

      const query = `
        UPDATE articles 
        SET ${updateFields.join(", ")} 
        WHERE id = ?
      `;

      const [result] = await db.query(query, queryParams);

      if (result.affectedRows === 0) {
        return null;
      }

      // Return updated article
      return await this.findById(articleId);
    } catch (err) {
      throw new Error(`Database error: ${err.message}`);
    }
  }

  // Delete article
  static async delete(id) {
    try {
      const [result] = await db.query("DELETE FROM articles WHERE id = ?", [
        id,
      ]);
      return result.affectedRows > 0;
    } catch (err) {
      throw new Error(`Database error: ${err.message}`);
    }
  }

  // Get articles by user ID
  static async getByUserId(userId) {
    try {
      const [rows] = await db.query(
        `SELECT id, title, content, image_url, user_id, published, 
                created_at, updated_at
         FROM articles
         WHERE user_id = ?
         ORDER BY created_at DESC`,
        [userId]
      );
      return rows;
    } catch (err) {
      throw new Error(`Database error: ${err.message}`);
    }
  }

  // Search articles

  /*
  
 

This is a parameter for the search function that on the line 173:

Contains the text string that users want to search for in articles
Is used in the SQL query with LIKE to find partial matches
Gets wrapped in % wildcards to match the search term anywhere in the title or content
Example: If searchTerm is "javascript", the query would search for any articles
 containing "javascript" in either the title or content.

In the search method, the parameter is used to build a flexible search query 
that looks for the term in both title and 
content columns, letting users find articles by relevant keywords.
  
  
  
  
  
  */
  static async search(searchTerm) {
    try {
      const [rows] = await db.query(
        `SELECT a.id, a.title, a.content, a.image_url, a.user_id, a.published, 
                a.created_at, a.updated_at, u.name as author_name
         FROM articles a
         JOIN users u ON a.user_id = u.id
         WHERE a.title LIKE ? OR a.content LIKE ?
         ORDER BY a.created_at DESC`,
        [`%${searchTerm}%`, `%${searchTerm}%`]
      );
      return rows;
    } catch (err) {
      throw new Error(`Database error: ${err.message}`);
    }
  }
}







export default ArticleModel;
