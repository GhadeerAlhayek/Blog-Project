import UserModel from "../model/user.model.js";

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user has permission to view this user (admin or self)
    // if (req.user) {
    //   // Check if user has permission to view this user (admin or self) (we will change this latter by)
    //   if (req.user.role !== "admin" && req.user.id !== parseInt(id, 10)) {
    //     return res.status(403).json({
    //       success: false,
    //       message: "Access denied - Insufficient permissions",
    //     });
    //   }
    // } else {
    //   // If no authentication is set up yet, allow the request for development
    //   console.warn("Warning: No authentication middleware detected. Access control bypassed.");
    // }
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get user by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
//we will use this in the auth,controller it is better
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

