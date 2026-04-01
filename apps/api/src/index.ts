// import { Elysia } from "elysia";
// import { cors } from "@elysiajs/cors";
// import { env } from "./lib/env";
// import { todoRoutes } from "./routes/todos";

// const app = new Elysia()
//   .use(
//     cors({
//       origin: true,
//       credentials: true
//     })
//   )
//   .get("/", () => ({ message: "Todo API is running" }))
//   .use(todoRoutes)
//   .listen(env.PORT);

// console.log(`API running at http://localhost:${env.PORT}`);

// import { Elysia } from "elysia";
// import { cors } from "@elysiajs/cors";
// import { node } from "@elysiajs/node";
// import { env } from "./lib/env";
// import { todoRoutes } from "./routes/todos";

// const app = new Elysia({
//   adapter: node()
// })
//   .use(
//     cors({
//       origin: true,
//       credentials: true
//     })
//   )
//   .get("/", () => ({ message: "Todo API is running" }))
//   .use(todoRoutes)
//   .listen(env.PORT);

// console.log(`API running at http://localhost:${env.PORT}`);

import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { node } from "@elysiajs/node";
import { openapi } from "@elysiajs/openapi";
import { env } from "./lib/env";
import { todoRoutes } from "./routes/todos";

const app = new Elysia({
  adapter: node()
})
  .use(
    cors({
      origin: true,
      credentials: true
    })
  )
  .use(
    openapi({
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
  .use(todoRoutes)
  .listen(env.PORT);

console.log(`API running at http://localhost:${env.PORT}`);
console.log(`OpenAPI docs: http://localhost:${env.PORT}/openapi`);