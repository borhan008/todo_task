const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "pending",
    },
    dueDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    googleTaskID: {
      type: String,
      required: false,
      default: null,
    },
    taskListID: {
      type: String,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
