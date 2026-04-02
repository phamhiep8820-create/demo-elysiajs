import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { env } from "./lib/env";
import { todoController } from "./modules/todos/todo.controller";
import { z } from "zod";


const app =new Elysia()
  .use(
    cors({
      origin: true,
      credentials: true
    })
  )
  .use(
    openapi({
        mapJsonSchema: {
                zod: (schema: unknown) =>
                  z.toJSONSchema(schema as z.ZodType, { io: "input", unrepresentable: "any" }),
              },
      documentation: {
        info: {
          title: "Todo API",
          version: "1.0.0",
          description: "API cho Todo App"
        },
        tags: [
          {
            name: "Todos",
            description: "Quản lý todo"
          }
        ]
      }
    })
  )
  .get("/", () => ({ message: "Todo API is running" }))
  .use(todoController)
  .listen(env.PORT);

console.log(`API running at http://localhost:${env.PORT}`);
console.log(`OpenAPI docs: http://localhost:${env.PORT}/openapi`);