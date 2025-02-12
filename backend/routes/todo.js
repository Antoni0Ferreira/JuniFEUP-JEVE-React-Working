const express = require('express');
const router = express.Router();
const controller = require('../controllers/todo');

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Retrieve a list of todos
 *     description: Retrieve a list of todos from the database.
 *     responses:
 *       200:
 *         description: A list of todos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The todo ID.
 *                     example: 1
 *                   title:
 *                     type: string
 *                     description: The todo title.
 *                     example: Buy groceries
 *                   done:
 *                     type: boolean
 *                     description: The todo status.
 *                     example: false
 */
router.get('/', controller.getTodos);

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     description: Create a new todo and add it to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The todo title.
 *                 example: Buy groceries
 *     responses:
 *       201:
 *         description: The created todo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The todo ID.
 *                   example: 1
 *                 title:
 *                   type: string
 *                   description: The todo title.
 *                   example: Buy groceries
 *                 done:
 *                   type: boolean
 *                   description: The todo status.
 *                   example: false
 */
router.post('/', controller.createTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a todo
 *     description: Update the details of an existing todo.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The todo title.
 *                 example: Buy groceries
 *               done:
 *                 type: boolean
 *                 description: The todo status.
 *                 example: false
 *     responses:
 *       200:
 *         description: The updated todo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The todo ID.
 *                   example: 1
 *                 title:
 *                   type: string
 *                   description: The todo title.
 *                   example: Buy groceries
 *                 done:
 *                   type: boolean
 *                   description: The todo status.
 *                   example: false
 */
router.put('/:id', controller.updateTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     description: Delete an existing todo from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID.
 *     responses:
 *       204:
 *         description: No content.
 */
router.delete('/:id', controller.deleteTodo);

module.exports = router;