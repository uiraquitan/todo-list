const taskModel = require("../models/taskModel");

// Controle de buscar dados
const getAll = async (_req, res) => {

    const task = await taskModel.getAll()
    return res.status(200).json(task);

};

// Controle de criação
const createTask = async (req, res) => {

    const createdTask = await taskModel.createTask(req.body);

    return res.status(201).json(createdTask);
}
// Controle de delete
const deleteTask = async (req, res) => {
    const { id } = req.params;
    await taskModel.deleteTask(id);
    return res.status(204).json();
}

// Controle de update
const updateTask = async (req, res) => {

    const { id } = req.params;

    await taskModel.updateTask(id, req.body);

    return res.status(204).json();
}

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask
};