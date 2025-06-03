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
        message: "Invalid user ID format"
      });
    }
    
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user
      }
    });
  } catch (error) {
    console.error("Get user by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
//{{{{{we will use this in the auth,controller it is better}}}}/
/********************
 * Find user by EMAIL
 * GET /api/users/:email
 ********************/
// export const getUserByEmail = async (req, res) => {
//   try {
//     const { email } = req.params;
//     const user = await UserModel.findByEmail(email);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     console.error("Get user by ID error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };


/*************************
 * Create user 
 * POST /api/users/create
 ************************/
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required fields",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }
    //we need to check this when prisenting the serves of creating a password
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Check for duplicate email
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }

    // Validate role if provided
    if (role && !["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role specified",
      });
    }

    // Create the user finally
    const newUser = await UserModel.create({
      name,
      email,
      password,
      role: role || "user",
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.error("User creation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: error.message,
    });
  }
};




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
        message: "Invalid user ID format"
      });
    }
    
    // Check if at least one field to update is provided
    if (!name && !email && !password && !role) {
      return res.status(400).json({
        success: false,
        message: "At least one field to update must be provided"
      });
    }
    
    // If email is provided, validate format
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid email address"
        });
      }
      
      // Check if new email already exists for a different user
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser && existingUser.id !== parseInt(id)) {
        return res.status(409).json({
          success: false,
          message: "Email is already registered to another user"
        });
      }
    }
    
    // If password is provided, validate length
    if (password && password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long"
      });
    }
    
    // If role is provided, validate value
    if (role && !["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role specified"
      });
    }
    
    // Update the user
    const updatedUser = await UserModel.update(id, { name, email, password, role });
    
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found or no changes made"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: {
        user: updatedUser
      }
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: error.message
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
        message: "Invalid user ID format"
      });
    }
    
    const deletedUser = await UserModel.delete(id);
    
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: {
        user: deletedUser
      }
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message
    });
  }
};