import { Elysia, t } from "elysia";
import { db } from "../db";
import { todos } from "../db/schema";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

const createTodoSchema = z.object({
  title: z.string().min(1).max(255)
});

const updateTodoSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  completed: z.boolean().optional()
});

export const todoRoutes = new Elysia({ prefix: "/todos" })
  .get(
    "/",
    async () => {
      return await db.select().from(todos).orderBy(desc(todos.createdAt));
    },
    {
      detail: {
        summary: "Lấy danh sách todo",
        tags: ["Todos"]
      }
    }
  )
  .get(
    "/:id",
    async ({ params, set }) => {
      const id = Number(params.id);

      const [todo] = await db.select().from(todos).where(eq(todos.id, id));

      if (!todo) {
        set.status = 404;
        return { message: "Todo not found" };
      }

      return todo;
    },
    {
      params: t.Object({
        id: t.String()
      }),
      detail: {
        summary: "Lấy chi tiết một todo",
        tags: ["Todos"]
      }
    }
  )
  .post(
    "/",
    async ({ body, set }) => {
      const parsed = createTodoSchema.safeParse(body);

      if (!parsed.success) {
        set.status = 400;
        return {
          message: "Validation error",
          errors: parsed.error.flatten()
        };
      }

      const [todo] = await db
        .insert(todos)
        .values({
          title: parsed.data.title
        })
        .returning();

      set.status = 201;
      return todo;
    },
    {
      body: t.Object({
        title: t.String()
      }),
      detail: {
        summary: "Tạo todo mới",
        tags: ["Todos"]
      }
    }
  )
  .patch(
    "/:id",
    async ({ params, body, set }) => {
      const id = Number(params.id);
      const parsed = updateTodoSchema.safeParse(body);

      if (!parsed.success) {
        set.status = 400;
        return {
          message: "Validation error",
          errors: parsed.error.flatten()
        };
      }

      const [existing] = await db.select().from(todos).where(eq(todos.id, id));

      if (!existing) {
        set.status = 404;
        return { message: "Todo not found" };
      }

      const [updated] = await db
        .update(todos)
        .set({
          ...parsed.data,
          updatedAt: new Date()
        })
        .where(eq(todos.id, id))
        .returning();

      return updated;
    },
    {
      params: t.Object({
        id: t.String()
      }),
      body: t.Object({
        title: t.Optional(t.String()),
        completed: t.Optional(t.Boolean())
      }),
      detail: {
        summary: "Cập nhật todo",
        tags: ["Todos"]
      }
    }
  )
  .delete(
    "/:id",
    async ({ params, set }) => {
      const id = Number(params.id);

      const [deleted] = await db
        .delete(todos)
        .where(eq(todos.id, id))
        .returning();

      if (!deleted) {
        set.status = 404;
        return { message: "Todo not found" };
      }

      return { message: "Deleted successfully" };
    },
    {
      params: t.Object({
        id: t.String()
      }),
      detail: {
        summary: "Xóa todo",
        tags: ["Todos"]
      }
    }
  );