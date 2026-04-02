import { z } from "zod";

export const todoIdParamsSchema = z.object({
  id: z.coerce.number().int().positive()
});

export const createTodoSchema = z.object({
  title: z.string().trim().min(1).max(255)
});

export const updateTodoSchema = z.object({
  title: z.string().trim().min(1).max(255).optional(),
  completed: z.boolean().optional()
});

export const todoSchema = z.object({
  id: z.number(),
  title: z.string().trim(),
  completed: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const todoListSchema = z.array(todoSchema);

export const messageSchema = z.object({
  message: z.string()
});