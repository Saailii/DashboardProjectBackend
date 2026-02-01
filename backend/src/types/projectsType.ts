import type { Task } from './taskType'

export type Project = {
  name: string,
  status: string,
  tasks: Task[],
  createdAt: number,
  updatedAt: number
}


