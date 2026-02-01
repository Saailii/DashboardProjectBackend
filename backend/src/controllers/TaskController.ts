import type { Context } from 'hono';
import { TaskModel } from '../models/TaskModel'
import { taskValidator } from '../validators/taskValidator'
import vine from '@vinejs/vine'

class TaskController {

  public static async get(c: Context) {
    const all = await TaskModel.getAll();
    if (!all) return c.text("No Task founded");
    return c.json(all);
  }

  public static async getAllByProjectId(c: Context) {
    const id = c.req.param("id");
    if (!id) return c.text("no params provided");

    const allTasks = await TaskModel.getAllByProjectId(id);
    if (!allTasks) return c.text("No tasks found for this project");
    return c.json(allTasks);
  }

  public static async create(c: Context) {
    // Get the body in json and verify if enough information is provided
    const body = await c.req.json();
    if (!body.name || !body.status || !body.description) return c.text("Manque le nom de la task ou le status ou la description...");

    // using the params as an value to get the project
    const id = c.req.param("id");
    if (!id) return c.text("Manque un project Id ")

    // Instantiante an date when  the method is being called (createdAt, updatedAt)
    const date = new Date();

    const newTask = {
      name: body.name,
      status: body.status,
      description: body.description,
      projectId: id,
      createdAt: date.getTime(),
      updatedAt: date.getTime()
    };

    const validatedData = await vine.validate({ schema: taskValidator, data: newTask });
    if (!validatedData) return c.text("Data not validated");


    await TaskModel.createTask(validatedData);
    return c.text("Task was successfully created");

  }

  public static async updateTaskById(c: Context) {
    const id = c.req.param("id");
    if (!id) return c.text("No id provided")
    const body = await c.req.json();
    if (!body) return c.text("Need an task as a body")
    console.log(body)
    const date = new Date();
    const updatedTask = {
      name: body.name,
      status: body.status,
      description: body.description,
      projectId: body.projectId,
      createdAt: date.getTime(),
      updatedAt: date.getTime()
    }

    const task = await vine.validate({ schema: taskValidator, data: updatedTask });

    const taskUpdated = await TaskModel.updateTaskById(id, task)
    if (!taskUpdated) return c.text("Cannot Update the task")
    return c.json(taskUpdated);
  }
}
export default TaskController
