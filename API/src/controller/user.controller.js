import UserModel from "../model/user.model.js";

/********************
 * Find user by ID
 * GET /api/users/:id
 ********************/

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID is numeric
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    console.error("Get user by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/********************
 * Find user by EMAIL
 * GET /api/users/:email
 ********************/

//{{{{{we will use this in the auth,controller it is better}}}}/

/*************************
 * Create user
 * POST /api/users/create
 ************************/

//{{{{{we will use this in the auth,controller it is better}}}}

/********************
 * Update user by ID
 * PUT /api/users/:id
 *******************/
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    // Validate ID is numeric
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    // Check if at least one field to update is provided
    if (!name && !email && !password && !role) {
      return res.status(400).json({
        success: false,
        message: "At least one field to update must be provided",
      });
    }

    // If email is provided, validate format
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid email address",
        });
      }

      // Check if new email already exists for a different user
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser && existingUser.id !== parseInt(id)) {
        return res.status(409).json({
          success: false,
          message: "Email is already registered to another user",
        });
      }
    }

    // If password is provided, validate length
    if (password && password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // If role is provided, validate value
    if (role && !["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role specified",
      });
    }

    // Update the user
    const updatedUser = await UserModel.update(id, {
      name,
      email,
      password,
      role,
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found or no changes made",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: error.message,
    });
  }
};

/************************
 * Delete user by ID
 * DELETE /api/users/:id
 ***********************/
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID is numeric
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    const deletedUser = await UserModel.delete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: {
        user: deletedUser,
      },
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};

/********************
 * Get all users
 * GET /api/users
 ********************/
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAll();

    res.status(200).json({
      success: true,
      count: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
      error: error.message,
    });
  }
};

/*

we need to add a User Profile Management :

1) profile viewing
2)profile editing
3) accoubt setting

These endpoints would be protected by authentication
 middleware, but wouldn't require admin
 privileges since users are only modifying their own data.


*/
