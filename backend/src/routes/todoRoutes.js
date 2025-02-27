const {
  createTodo,
  getTodos,
  updateTodo,
  updateGoogleTodo,
  deleteTodo,
  deleteGoogleTodo,
} = require("../controllers/TodoController");
const verifyJWTToken = require("../middleware/middleware");

const router = require("express").Router();

router.post("/create", verifyJWTToken, createTodo);
router.get("/get", verifyJWTToken, getTodos);
router.post("/update/:id", verifyJWTToken, updateTodo);
router.post("/update/google/:taskListID/:id", verifyJWTToken, updateGoogleTodo);
router.delete("/delete/:id", verifyJWTToken, deleteTodo);
router.delete(
  "/delete/google/:taskListID/:id",
  verifyJWTToken,
  deleteGoogleTodo
);

module.exports = router;
