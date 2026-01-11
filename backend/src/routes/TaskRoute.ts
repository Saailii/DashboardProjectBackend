import { Hono } from 'hono'
import TaskController from '../controllers/TaskController'

const taskRoute = new Hono()

// GET ROUTES
taskRoute.get('/:id', TaskController.getAllByProjectId)
taskRoute.put('/:id', TaskController.updateTaskById)

export default taskRoute
