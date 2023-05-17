const express = require("express");
const router = express.Router();

const taskController = require("./controllers/taskController");
const taskMiddleware = require('./middlewares/taskMiddlewares');

router.get("/task", taskController.getAll);
router.post("/task", taskMiddleware.validateFieldTitle, taskController.createTask);
router.delete("/task/:id", taskController.deleteTask);
router.put("/task/:id",
    taskMiddleware.validateFieldTitle,
    taskMiddleware.validateFieldStatus,
    taskController.updateTask
);

module.exports = router;