const Task = require('../models/task.model');

// Create new task
exports.createTask = async (req, res) => {
  try {
    const newTask = new Task({
      userId: req.user.id,
      title: req.body.title,
      description: req.body.description
    });
    const task = await newTask.save();
    return res.json({
      message: "Task created successfully",
      status: "Success",
      code: 201,
      data: task
    });
  } catch (err) {
    console.error(err);
    return res.json({
      message: "Internal server error",
      status: "Failure",
      code: 500,
      data: {}
    });
  }
};

// Edit task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.userId.toString() !== req.user.id) {
      return res.json({
        message: "Not authorized to update this task",
        status: "Failure",
        code: 401,
        data: {}
      });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;

    const updatedTask = await task.save();
    return res.json({
      message: "Task updated successfully",
      status: "Success",
      code: 200,
      data: updatedTask
    });
  } catch (err) {
    console.error(err);
    return res.json({
      message: "Internal server error",
      status: "Failure",
      code: 500,
      data: {}
    });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.userId.toString() !== req.user.id) {
      return res.json({
        message: "Not authorized to delete this task",
        status: "Failure",
        code: 401,
        data: {}
      });
    }

    await Task.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Task deleted successfully",
      status: "Success",
      code: 200,
      data: {}
    });
  } catch (err) {
    console.error(err);
    return res.json({
      message: "Internal server error",
      status: "Failure",
      code: 500,
      data: {}
    });
  }
};

// Get all tasks for the authenticated user
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    return res.json({
      message: "Tasks fetched successfully",
      status: "Success",
      code: 200,
      data: tasks
    });
  } catch (err) {
    console.error(err);
    return res.json({
      message: "Internal server error",
      status: "Failure",
      code: 500,
      data: {}
    });
  }
};

exports.getTaskById = async (req, res) => {
  const { id } = req.params; // Extract the task ID from the request parameters

  try {
    const task = await Task.findOne({ _id: id, userId: req.user.id });

    if (!task) {
      return res.json({
        message: "Task not found",
        status: "Failure",
        code: 404,
        data: {}
      });
    }

    return res.json({
      message: "Task fetched successfully",
      status: "Success",
      code: 200,
      data: task
    });
  } catch (err) {
    console.error(err);
    return res.json({
      message: "Internal server error",
      status: "Failure",
      code: 500,
      data: {}
    });
  }
};

