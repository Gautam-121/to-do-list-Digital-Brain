const express = require("express")
const route = express.Router();

const  { addTodo, getAllTodos, toggleTodoDone, updateTodo, deleteTodo } = require("../controller/todo-controller");



route.post('/todos', addTodo)
route.get('/todos', getAllTodos);
route.get('/todos/:id', toggleTodoDone);
route.put('/todos/:id', updateTodo);
route.delete('/todos/:id', deleteTodo);


module.exports = route;