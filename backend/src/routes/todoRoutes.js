const {
  createTodo,
  getTodos,
  updateTodo,
  updateGoogleTodo,
} = require("../controllers/TodoController");
const verifyJWTToken = require("../middleware/middleware");

const router = require("express").Router();

router.post("/create", verifyJWTToken, createTodo);
router.get("/get", verifyJWTToken, getTodos);
router.post("/update/:id", verifyJWTToken, updateTodo);
router.post("/update/google/:taskListID/:id", verifyJWTToken, updateGoogleTodo);

module.exports = router;
