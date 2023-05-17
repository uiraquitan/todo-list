const connection = require("./connection");


// Funcção responsável por buscar dados
const getAll = async () => {
    const [task] = await connection.execute("SELECT * FROM tasks");
    return task;
};

// Funcção responsável por criar dados
const createTask = async (task) => {
    const { title } = task;

    const query = "INSERT INTO tasks (title, status, created_at) VALUES (?,?,?)";

    const dateUTC = new Date(Date.now()).toUTCString();

    const [createdTask] = await connection.execute(query, [title, 'pendente', dateUTC]);

    return { "insertId": createdTask.insertId };
};

// Funcção responsável por deletar dados
const deleteTask = async (id) => {
    const [removedTask] = await connection.execute("DELETE FROM tasks WHERE id = ?", [id])
    return removedTask;
};

const updateTask = async (id, task) => {
    
    const { title, status } = task;

    const query = "UPDATE tasks SET title = ?, status = ? WHERE id = ?";

    const [updatedTask] = await connection.execute(query, [title, status, id]);

    return updatedTask;

};
module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask
};