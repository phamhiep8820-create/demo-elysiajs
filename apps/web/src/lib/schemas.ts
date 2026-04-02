import { z } from "zod"

export const todoSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
})

export const createTodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
})

export type Todo = z.infer<typeof todoSchema>
export type CreateTodoInput = z.infer<typeof createTodoSchema>
