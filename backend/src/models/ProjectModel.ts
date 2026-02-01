import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { projectTable, taskTable } from '../db/schema'
import { createClient } from '@libsql/client';
import type { Project } from '../types/projectsType'
import { eq } from 'drizzle-orm';

const client = createClient({ url: process.env.DB_FILE_NAME! });
const db = drizzle({ client });

export class ProjectModel {

  public static async getAll() {
    const projects = await db.select().from(projectTable);
    return projects;
  }

  public static async getById(id: number) {
    if (!id) return "No id Provided to the model"
    const project = await db.selectDistinct().from(projectTable).where(eq(projectTable.id, id)).leftJoin(taskTable, eq(projectTable.id, taskTable.projectId));
    return project;
  }

  public static async createProject(project: Project) {
    await db.insert(projectTable).values(project);
  }
}


