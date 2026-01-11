import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { taskTable } from '../db/schema.ts'
import { createClient } from '@libsql/client';
import type { Task } from '../types/taskType'
import { eq } from "drizzle-orm"

const client = createClient({ url: process.env.DB_FILE_NAME! });
const db = drizzle({ client });

export class TaskModel {

  static public async getAll() {
    const task = await db.select().from(taskTable);
    return task;
  }

  static public async getAllByProjectId(projectId: number) { 
    const tasks = await db.select().from(taskTable).where(eq(taskTable.projectId, projectId));
    return tasks;
  }

  static public async createTask(task: Task) {
    const date = new Date();
    await db.insert(taskTable).values(task);
  }

  static public async updateTaskById(id: number, task: Task) { 
    const dataUpdated = await db.update(taskTable).set(task).where(eq(taskTable.id, id))
    return dataUpdated;
  }
}


