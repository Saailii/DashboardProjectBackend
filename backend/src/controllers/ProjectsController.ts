import type { Context, HonoRequest } from 'hono';
import { ProjectModel } from '../models/ProjectModel'
import { projectSchema } from '../validators/projectsValidator'
import vine from '@vinejs/vine'
import type { Project } from '../types/projectsType';

class ProjectController {

  public static async get(c: Context) {
    const all = await ProjectModel.getAll();

    if (!all) return c.text("No project founded");
    return c.json(all);
  }

  public static async getById(c: Context) {
    // Get the id from the params
    const id = c.req.param("id");
    if (!id) return c.text("No id provided from the query param")

    const project = await ProjectModel.getById(id)
    return c.json(project);
  }

  public static async create(c: Context) {
    // get the body in json and verifiy if it's provided enough information
    const body = await c.req.json();
    if (!body.name || !body.status) return c.text("Manque un nom de projet ou un status");
    // Create the project based on the data provided. Date are created when the method is being called. (Need to figure it out how to change the updatedAt)
    const date = new Date();
    const newProject = { name: body.name, status: body.status, createdAt: date.getTime(), updatedAt: date.getTime() };
    // Using vineJs as a validator with the an precise schema
    const validatedData = await vine.validate({ schema: projectSchema, data: newProject }) as Project;

    if (!validatedData) return c.text("Data not validated");
    await ProjectModel.createProject(validatedData);
    return c.text("Project was successfully created");
  }

}
export default ProjectController
