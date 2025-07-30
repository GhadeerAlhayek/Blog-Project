import db from "../config/db.js";

class AdminModel {
  /**
   * Check if user is admin
   */
  static async isAdmin(userId) {
    try {
      const [rows] = await db.query(
        `SELECT u.role, a.permissions 
         FROM users u 
         LEFT JOIN admins a ON u.id = a.user_id 
         WHERE u.id = ?`,
        [userId]
      );
      
      return rows.length > 0 && rows[0].role === 'admin';
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  }

  /**
   * Get admin permissions
   */
  static async getPermissions(userId) {
    try {
      const [rows] = await db.query(
        `SELECT permissions FROM admins WHERE user_id = ?`,
        [userId]
      );
      
      if (rows.length === 0) return [];
      
      // Convert SET to array
      return rows[0].permissions ? rows[0].permissions.split(',') : [];
    } catch (error) {
      console.error('Error getting admin permissions:', error);
      return [];
    }
  }

  /**
   * Grant admin privileges to user
   */
  static async grantAdmin(userId, permissions = null) {
    try {
      const defaultPermissions = 'read_all_articles,create_articles,update_any_article,delete_any_article';
      
      // First update user role
      await db.query(
        `UPDATE users SET role = 'admin' WHERE id = ?`,
        [userId]
      );

      // Then add to admins table
      const [result] = await db.query(
        `INSERT INTO admins (user_id, permissions) 
         VALUES (?, ?) 
         ON DUPLICATE KEY UPDATE permissions = VALUES(permissions)`,
        [userId, permissions || defaultPermissions]
      );

      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error granting admin privileges:', error);
      throw error;
    }
  }

  /**
   * Revoke admin privileges
   */
  static async revokeAdmin(userId) {
    try {
      // Update user role to regular user
      await db.query(
        `UPDATE users SET role = 'user' WHERE id = ?`,
        [userId]
      );

      // Remove from admins table
      const [result] = await db.query(
        `DELETE FROM admins WHERE user_id = ?`,
        [userId]
      );

      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error revoking admin privileges:', error);
      throw error;
    }
  }

  /**
   * Get all admins
   */
  static async getAllAdmins() {
    try {
      const [rows] = await db.query(
        `SELECT u.id, u.name, u.email, a.permissions, a.granted_at
         FROM users u 
         JOIN admins a ON u.id = a.user_id 
         WHERE u.role = 'admin'
         ORDER BY a.granted_at DESC`
      );
      
      return rows;
    } catch (error) {
      console.error('Error getting all admins:', error);
      throw error;
    }
  }

  /**
   * Check if admin has specific permission
   */
  static async hasPermission(userId, permission) {
    try {
      const permissions = await this.getPermissions(userId);
      return permissions.includes(permission);
    } catch (error) {
      console.error('Error checking permission:', error);
      return false;
    }
  }
}

export default AdminModel;