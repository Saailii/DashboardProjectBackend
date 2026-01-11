import { Hono } from 'hono'
import ProjectController from '../controllers/ProjectsController'
import TaskController from '../controllers/TaskController'

const projectRoute = new Hono()

// GET ROUTES
projectRoute.get('/', ProjectController.get)
projectRoute.get('/:id', ProjectController.getById)
// POST ROUTES
projectRoute.post('/', ProjectController.create)
projectRoute.post('/:id', TaskController.create)

//TODO Creer un project et le stocké en db (mariadb ? sqlite ?)
export default projectRoute
