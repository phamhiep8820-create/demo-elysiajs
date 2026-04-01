import { z } from "zod";
import { Todo, todoSchema } from "./schemas";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(`${API_URL}/todos`, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }

  const json = await res.json();
  return z.array(todoSchema).parse(json);
}

export async function createTodo(title: string): Promise<void> {
  const res = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title })
  });

  if (!res.ok) {
    throw new Error("Failed to create todo");
  }
}

export async function toggleTodo(id: number, completed: boolean): Promise<void> {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ completed })
  });

  if (!res.ok) {
    throw new Error("Failed to update todo");
  }
}

export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    throw new Error("Failed to delete todo");
  }
}