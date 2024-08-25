const { Router } = require("express");
const {
  registerUser,
  login,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", login);
userRouter.get("/all-users", getAllUsers);
userRouter.route("/:id").get(getUser).delete(deleteUser).put(updateUser);

module.exports = userRouter;
