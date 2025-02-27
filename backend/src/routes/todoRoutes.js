const { createTodo, getTodos } = require("../controllers/TodoController");
const verifyJWTToken = require("../middleware/middleware");

const router = require("express").Router();

router.post("/create", verifyJWTToken, createTodo);
router.get("/get", verifyJWTToken, getTodos);

module.exports = router;
