import { Hono } from 'hono'
import { ProjectModel } from '../models/ProjectModel.ts'
import ProjectController from '../controllers/ProjectsController'
const projectRoute = new Hono()

projectRoute.get('/', ProjectController.get)

//TODO Creer un project et le stocké en db (mariadb ? sqlite ?)
export default projectRoute
