const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const todos = [{ id: 1, name: 'Buy groceries', completed: false }];

router.get('/', function(req, res, next) {
    res.json(todos);
});

router.get('/:id', function(req, res, next) {
    const todo = todos.find(todo => todo.id === Number(req.params.id));

    if(!todo) {
        return next(createError(404, 'Not Found'))
    };

    res.json(todo);
});

router.post('/', function(req, res, next) {
    const { body } = req;

    if (typeof body.name !== 'string') {
        return next(createError(422, 'Unprocessable Entity'))
    }

    const newTodo = { 
        id: todos.length + 1, 
        name: body.name, 
        completed: false
    };

    todos.push(newTodo);

    res.status(201).json(newTodo);
});

module.exports = router;