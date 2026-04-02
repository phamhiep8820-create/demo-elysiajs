"use client";

import { useState } from "react";

export function TodoForm() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Vui lòng nhập tiêu đề todo");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3001/todos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.message || data?.error || "Tạo todo thất bại");
        return;
      }

      setTitle("");
      setError("");
      window.location.reload();
    } catch (error) {
      console.error(error);
      setError("Không kết nối được tới server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
          placeholder="Nhập tiêu đề todo..."
          className={`h-12 flex-1 rounded-2xl border bg-white px-4 text-sm outline-none transition ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
              : "border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          }`}
        />

        <button
          type="submit"
          disabled={loading}
          className="h-12 rounded-2xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Đang thêm..." : "Thêm"}
        </button>
      </div>

      {error && (
        <p className="pl-1 text-sm text-red-600">{error}</p>
      )}
    </form>
  );
}