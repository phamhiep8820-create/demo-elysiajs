import { Elysia, NotFoundError } from "elysia";
import {
  createTodoSchema,
  todoIdParamsSchema,
  updateTodoSchema,
  todoSchema,
  todoListSchema,
  messageSchema
} from "./todo.schema";
import { todoService } from "./todo.service";

export const todoController = new Elysia({ prefix: "/todos", tags: ["Todos"] })
  .get("/", async () => {
      return todoService.getAll();
    },
    {
      detail: {
        summary: "Lấy danh sách todo",
      },
      response: {
        200: todoListSchema
      }
    }
  )

  .post(
    "/",
    async ({ body, set }) => {
      const todo = await todoService.create(body.title);
      set.status = 201;
      return todo;
    },
    {
      body: createTodoSchema,
      detail: {
        summary: "Tạo todo mới",
      },
      response: {
        201: todoSchema
      }
    }
  )
  .get(
    "/:id",
    async ({ params, set }) => {
      const todo = await todoService.getById(params.id);

      if (!todo) throw new NotFoundError("Todo not found");

      return todo;
    },
    {
      params: todoIdParamsSchema,
      detail: {
        summary: "Lấy chi tiết todo",
      },
      response: {
        200: todoSchema,
        404: messageSchema
      }
    }
  )
  .patch(
    "/:id",
    async ({ params, body, set }) => {
      const existing = await todoService.getById(params.id);

      if (!existing) throw new NotFoundError("Todo not found");

      return todoService.update(params.id, body);
    },
    {
      params: todoIdParamsSchema,
      body: updateTodoSchema,
      detail: {
        summary: "Cập nhật todo",
      },
      response: {
        200: todoSchema,
        404: messageSchema
      }
    }
  )
  .delete(
    "/:id",
    async ({ params, set }) => {
      const deleted = await todoService.remove(params.id);

      if (!deleted) throw new NotFoundError("Todo not found");

      return { message: "Deleted successfully" };
    },
    {
      params: todoIdParamsSchema,
      detail: {
        summary: "Xóa todo",
      },
      response: {
        200: messageSchema,
        404: messageSchema
      }
    }
  );