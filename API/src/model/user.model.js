// src/models/UserModel.js
import db from "../config/db.js";
import bcrypt from "bcrypt";

class UserModel {
  // READ by ID (without password)
  static async findById(id) {
    try {
      const [rows] = await db.query(
        "SELECT id, name, email, role, created_at FROM users WHERE id = ?",
        [id]
      );
      return rows[0] ?? null;
    } catch (err) {
      throw new Error(`Database error: ${err.message}`);
    }
  }
  // READ by email
  static async findByEmail(email) {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      return rows[0] ?? null;
    } catch (err) {
      throw new Error(`Database error: ${err.message}`);
    }
  }

  // CREATE (with password hashing)
  static async create({ name, email, password, role = "user" }) {
    try {
      // 1) generate salt & hash
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      // 2) insert
      const [result] = await db.query(
        `INSERT INTO users (name, email, password, role)
         VALUES (?, ?, ?, ?)`,
        [name, email, passwordHash, role]
      );

      // 3) fetch and return the newly created user (sans password)
      const [newRows] = await db.query(
        `SELECT id, name, email, role, created_at
         FROM users
         WHERE id = ?`,
        [result.insertId]
      );
      return newRows[0] ?? null;
    } catch (err) {
      throw new Error(`Database error: ${err.message}`);
    }
  }

  // READ all users
  static async getAll() {
    try {
      const [rows] = await db.query(
        "SELECT id, name, email, role, created_at FROM users"
      );
      return rows;
    } catch (err) {
      throw new Error(`Database error: ${err.message}`);
    }
  }

   // UPDATE user
  static async update(id, { name, email, password, role }) {
    try {
      let updateFields = [];
      let queryParams = [];

      // Build dynamic query based on provided fields
      if (name) {
        updateFields.push("name = ?");
        queryParams.push(name);
      }

      if (email) {
        updateFields.push("email = ?");
        queryParams.push(email);
      }

      if (password) {
        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        updateFields.push("password = ?");
        queryParams.push(passwordHash);
      }

      if (role) {
        updateFields.push("role = ?");
        queryParams.push(role);
      }

      // If no fields to update, return early
      if (updateFields.length === 0) {
        return null;
      }

      // Add ID to query params
      queryParams.push(id);

      // Perform update
      const [result] = await db.query(
        `UPDATE users 
         SET ${updateFields.join(", ")} 
         WHERE id = ?`,
        queryParams
      );

      // Check if update was successful
      if (result.affectedRows === 0) {
        return null;
      }

      // Return updated user (without password)
      const [updatedRows] = await db.query(
        `SELECT id, name, email, role, created_at, updated_at
         FROM users
         WHERE id = ?`, 
        [id]
      );

      return updatedRows[0] ?? null;
    } catch (err) {
      throw new Error(`Database error: ${err.message}`);
    }
  }

  // DELETE user
  static async delete(id) {
    try {
      // {{{{{Get the user first to return it after deletion}}}}}
      const user = await this.findById(id);
      
      if (!user) {
        return null;
      }

      // Delete the user
      const [result] = await db.query(
        "DELETE FROM users WHERE id = ?", 
        [id]
      );

      if (result.affectedRows === 0) {
        return null;
      }

      return user;
    } catch (err) {
      throw new Error(`Database error: ${err.message}`);
    }
  }

}

export default UserModel;
