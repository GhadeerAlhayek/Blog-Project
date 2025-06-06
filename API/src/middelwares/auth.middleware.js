import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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

    //{{{{ ok this was not me who wrot the chicking, i have no idea where does the number 7 come from, dot takeout points please i can explaine}}}}

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
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to access this resource",
      });
    }

    next();
  };
};

export const isOwnerOrAdmin = (getResourceOwnerId) => {
  return async (req, res, next) => {
    try {
      // Skip check if user is admin
      if (req.user.role === 'admin') {
        return next();
      }

      // Get owner ID from the resource
      const ownerId = await getResourceOwnerId(req);
      
      // Check if user is the owner
      if (req.user.id !== ownerId) {
        return res.status(403).json({
          success: false,
          message: "You don't have permission to modify this resource"
        });
      }

      next();
    } catch (error) {
      console.error("Authorization error:", error);
      return res.status(500).json({
        success: false,
        message: "Error checking resource ownership",
        error: error.message
      });
    }
  };
};
/*
Implementing Authentication Middleware
authenticate - Verifies the user is logged in (has a valid token)
authorize - Checks if the user has the required role(s)
isOwnerOrAdmin: For individual resource-level access

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
