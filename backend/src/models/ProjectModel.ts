import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { projectTable } from '../db/schema.ts'
import { createClient } from '@libsql/client';
import type { Project } from '../types/projectsType'

const client = createClient({ url: process.env.DB_FILE_NAME! });
const db = drizzle({ client });

export class ProjectModel {

  public async getAll() {
    const projects = await db.select().from(projectTable);
    return projects;
  } 

  public async createProject(project: Project) {
    const date = new Date();
    await db.insert(projectTable).values(project)
  }
}


