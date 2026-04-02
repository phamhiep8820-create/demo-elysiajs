import { desc, eq, sql } from "drizzle-orm"

import { db } from "../../db"
import { todos } from "../../db/schema"

export const todoService = {
  getAll() {
    return db.select().from(todos).orderBy(desc(todos.createdAt))
  },

  async getById(id: number) {
    const [todo] = await db.select().from(todos).where(eq(todos.id, id))
    return todo
  },

  async create(title: string) {
    const [todo] = await db.insert(todos).values({ title }).returning()

    return todo
  },

  async update(id: number, data: any) {
    const [updated] = await db
      .update(todos)
      .set({
        ...data,
        updatedAt: sql`now()`,
      })
      .where(eq(todos.id, id))
      .returning()

    return updated
  },

  async remove(id: number) {
    const [deleted] = await db.delete(todos).where(eq(todos.id, id)).returning()

    return deleted
  },
}
