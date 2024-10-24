const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/authentication.middleware');
const taskController = require('../controllers/task.controller');

module.exports = () =>{

    // Create new task
    router.post('/createTask', isAuthenticated, taskController.createTask);
    
    // Update task
    router.put('/updateTask/:id', isAuthenticated, taskController.updateTask);
    
    // Delete task
    router.delete('/deleteTask/:id', isAuthenticated, taskController.deleteTask);
    
    // Get all tasks
    router.get('/getTasks', isAuthenticated, taskController.getAllTasks);

    router.get('/getTask/:id' , isAuthenticated , taskController.getTaskById)
 
    return router;
}