import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from 'drizzle-orm';

export const projectTable = sqliteTable("project_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  status: text().notNull(),
  createdAt: int().notNull(),
  updatedAt: int().notNull(),
});


export const taskTable = sqliteTable("task_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  status: text().notNull(),
  description: text().notNull(),
  projectId: int().notNull().references(() => projectTable.id),
  createdAt: int().notNull(),
  updatedAt: int().notNull(),

});


export const projectTaskRelation = relations(projectTable, ({many}) => ({
  tasks: many(taskTable),
}));

export const taskProjectRelation = relations(taskTable, ({one}) => ({
  projetId: one(projectTable, {
    fields: [taskTable.projectId],
    references: [projectTable.id]
  }),
}));

