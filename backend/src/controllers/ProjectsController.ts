import { ProjectModel } from '../models/ProjectModel.ts'

class ProjectController {

  //Trouve pas la methode get ?? 
  static public get(c) {
    const projectModel = new ProjectModel();
    const all = projectModel.getAll(); 
    return c.text("test")
  } 

  static public async create(c) {
    const projectModel = new ProjectModel();
    const createData = await c.req.json();

    //TODO Valider les datas (vinejs si possible)
    await projectModel.createProject()
  }

}
export default ProjectController
