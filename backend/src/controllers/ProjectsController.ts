import { ProjectModel } from '../models/ProjectModel.ts'
import { projectSchema } from '../validators/projects'
import vine from '@vinejs/vine'

class ProjectController {

  static public async get(c) {
    const projectModel = new ProjectModel();
    const all = await projectModel.getAll(); 
    if (!all) return c.text("No project founded")
    return c.text("test")
  }

  static public async create(c) {
    const body = await c.req.json();
    console.log(body)
    
    const projectModel = new ProjectModel();
    const date = new Date();
    const newProject = { name: body.name, status: body.status, createdAt: `${date.getTime()}`, updatedAt: `${date.getTime()}` }
    const validatedData = await vine.validate({schema: projectSchema, data: newProject })
    await projectModel.createProject(validatedData)
    return c.text("Project created")
  }

}
export default ProjectController
