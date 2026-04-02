// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export type Todo = {
//   id: number;
//   title: string;
//   completed: boolean;
//   createdAt: string;
//   updatedAt: string;
// };

// export async function getTodos(): Promise<Todo[]> {
//   const res = await fetch(`${API_URL}/todos/`, {
//     cache: "no-store"
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch todos");
//   }

//   return res.json();
// }

// export async function createTodo(title: string): Promise<Todo> {
//   const res = await fetch(`${API_URL}/todos/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ title })
//   });

//   if (!res.ok) {
//     throw new Error("Failed to create todo");
//   }

//   return res.json();
// }

// export async function updateTodo(
//   id: number,
//   data: Partial<Pick<Todo, "title" | "completed">>
// ): Promise<Todo> {
//   const res = await fetch(`${API_URL}/todos/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(data)
//   });

//   if (!res.ok) {
//     throw new Error("Failed to update todo");
//   }

//   return res.json();
// }

// export async function deleteTodo(id: number): Promise<{ message: string }> {
//   const res = await fetch(`${API_URL}/todos/${id}`, {
//     method: "DELETE"
//   });

//   if (!res.ok) {
//     throw new Error("Failed to delete todo");
//   }

//   return res.json();
// }

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(`${API_URL}/todos/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }

  return res.json();
}