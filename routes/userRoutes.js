const { Router } = require("express");
const {
  registerUser,
  login,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  userBulkCreate
} = require("../controllers/userController");
const {authMiddleware, isAdmin} = require("../middleware/authMiddleware");

const userRouter = Router();

userRouter.post("/user-bulk", userBulkCreate)
userRouter.post("/register", registerUser);
userRouter.post("/login", login);
userRouter.use(authMiddleware, isAdmin);
userRouter.get("/all-users", getAllUsers);
userRouter.route("/:id").get(getUser).delete(deleteUser).put(updateUser);
userRouter.put("/block-user/:id", blockUser)
userRouter.put("/unblock-user/:id", unblockUser)

module.exports = userRouter;
