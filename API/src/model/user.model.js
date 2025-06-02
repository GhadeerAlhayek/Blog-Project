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
}

export default UserModel;
