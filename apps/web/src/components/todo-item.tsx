"use client"

import { useState } from "react"

type Todo = {
  id: number
  title: string
  completed: boolean
}

export function TodoItem({ todo }: { todo: Todo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [loading, setLoading] = useState(false)

  async function toggleCompleted() {
    try {
      setLoading(true)

      const res = await fetch(`http://localhost:3001/todos/${todo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      })

      if (!res.ok) throw new Error("Update failed")

      window.location.reload()
    } catch (error) {
      console.error(error)
      alert("Không cập nhật được trạng thái")
    } finally {
      setLoading(false)
    }
  }

  async function saveEdit() {
    if (!title.trim()) return

    try {
      setLoading(true)

      const res = await fetch(`http://localhost:3001/todos/${todo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      })

      if (!res.ok) throw new Error("Edit failed")

      setIsEditing(false)
      window.location.reload()
    } catch (error) {
      console.error(error)
      alert("Không sửa được todo")
    } finally {
      setLoading(false)
    }
  }

  async function confirmDelete() {
    try {
      setLoading(true)

      const res = await fetch(`http://localhost:3001/todos/${todo.id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Delete failed")

      setShowDeleteModal(false)
      window.location.reload()
    } catch (error) {
      console.error(error)
      alert("Không xóa được todo")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <li className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={toggleCompleted}
            disabled={loading}
            className="h-4 w-4 accent-blue-600"
          />

          <span
            className={`inline-flex min-w-[80px] justify-center rounded-full px-3 py-1 text-xs font-semibold ${
              todo.completed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
            }`}
          >
            {todo.completed ? "Done" : "Pending"}
          </span>

          {isEditing ? (
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-10 flex-1 rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          ) : (
            <span
              className={`truncate text-sm font-medium ${
                todo.completed ? "text-slate-400 line-through" : "text-slate-800"
              }`}
            >
              {todo.title}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={saveEdit}
                disabled={loading}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
              >
                Lưu
              </button>

              <button
                onClick={() => {
                  setIsEditing(false)
                  setTitle(todo.title)
                }}
                disabled={loading}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
              >
                Hủy
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                disabled={loading}
                title="Sửa"
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm transition hover:bg-slate-100 disabled:opacity-60"
              >
                ✏️
              </button>

              <button
                onClick={() => setShowDeleteModal(true)}
                disabled={loading}
                title="Xóa"
                className="rounded-xl border border-red-200 bg-white px-3 py-2 text-sm transition hover:bg-red-50 disabled:opacity-60"
              >
                🗑️
              </button>
            </>
          )}
        </div>
      </li>

      {showDeleteModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900">Xác nhận xóa</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Bạn có chắc muốn xóa todo{" "}
              <span className="font-semibold text-slate-900">"{todo.title}"</span> không?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={loading}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
              >
                Hủy
              </button>

              <button
                onClick={confirmDelete}
                disabled={loading}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {loading ? "Đang xóa..." : "Xóa"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
