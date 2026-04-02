const API_URL = process.env.NEXT_PUBLIC_API_URL

export type Todo = {
  id: number
  title: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(`${API_URL}/todos/`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch todos")
  }

  return res.json()
}
