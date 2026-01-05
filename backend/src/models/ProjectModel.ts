import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { projectTable } from '../db/schema.ts'
import { createClient } from '@libsql/client';

const client = createClient({ url: process.env.DB_FILE_NAME! });
const db = drizzle({ client });

export class ProjectModel {
  public async getAll() {
    const projects = await db.select().from(projectTable);
    return projects;
  } 

  //TODO Retirer ce any et faire un type project ou qlqc du genre
  public async createProject(project: any) {
    const date = new Date();
    await db.insert().values(project)
  }
}


