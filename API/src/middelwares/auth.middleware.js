import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ArticleModel from "../model/articale.model.js";
import CommentModel from "../model/comment.model.js";
import AdminModel from "../model/admin.model.js";

dotenv.config();

export const checkUserOwnership = async (req, res, next) => {
  try {
    const { id } = req.params;
    const currentUserId = req.user.id;
    const currentUserRole = req.user.role;

    // Allow admin to update any user
    if (currentUserRole === "admin") {
      return next();
    }

    // Allow users to update only their own profile
    if (parseInt(id) === currentUserId) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: "You can only update your own profile",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authorization check failed",
    });
  }
};

export const authenticate = (req, res, next) => {
  try {
    // console.log("Cookies received:", req.cookies);
    // console.log("Auth header:", req.headers.authorization);
    // Check for token in cookies
    let token = req.cookies?.token;

    // If no cookie token, check Authorization header
    if (!token && req.headers.authorization) {
      // Format: "Bearer [token]"
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    //{{{{ ok this was not me who wrot the chicking, i have no idea where does the number 7 come from, don't takeout points please i can explaine}}}}

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication required" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export const authorize = (roles = []) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }

      // Check if user role is in allowed roles
      if (roles.includes(req.user.role)) {
        // For admin role, also verify in admin table
        if (req.user.role === "admin") {
          const isAdmin = await AdminModel.isAdmin(req.user.id);
          if (isAdmin) {
            return next();
          }
        } else {
          return next();
        }
      }

      return res.status(403).json({
        success: false,
        message: "Insufficient permissions",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Authorization error",
        error: error.message,
      });
    }
  };
};

/**
 * Check specific admin permission
 */
export const requirePermission = (permission) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }

      const hasPermission = await AdminModel.hasPermission(
        req.user.id,
        permission
      );

      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          message: `Permission '${permission}' required`,
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Permission check failed",
        error: error.message,
      });
    }
  };
};
/*************************
 * Check article ownership
 ************************/
export const checkArticleOwnership = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const article = await ArticleModel.findById(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    if (article.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only modify your own articles",
      });
    }

    req.article = article; // Store article in request for use in next middleware
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to verify article ownership",
    });
  }
};

/*************************
 * Check comment ownership
 ************************/
export const checkCommentOwnership = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const comment = await CommentModel.findById(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (comment.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only modify your own comments",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to verify comment ownership",
    });
  }
};
/*
Implementing Authentication Middleware
authenticate - Verifies the user is logged in (has a valid token)
authorize - Checks if the user has the required role(s)
checkArticleOwnership: For individual resource-level access

authorize vs isOwnerOrAdmin :

Key Differences
Scope:

authorize: Broad permissions based on user role
isOwnerOrAdmin: Specific permissions based on resource ownership
Information needed:

authorize: Just needs user role
isOwnerOrAdmin: Needs to query the database to check who owns the resource
Use cases:

authorize: For section/feature-level access
isOwnerOrAdmin: For individual resource-level access

*/
