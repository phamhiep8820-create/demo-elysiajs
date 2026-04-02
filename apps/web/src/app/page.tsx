import { getTodos } from "@/lib/api";
import { TodoForm } from "@/components/todo-form";
import { TodoItem } from "@/components/todo-item";

export default async function HomePage() {
  const todos = await getTodos();

  const total = todos.length;
  const done = todos.filter((todo) => todo.completed).length;
  const pending = total - done;

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-10">
      <section className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur md:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Todo App
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Quản lý công việc hằng ngày với Next.js + Elysia
          </p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Tổng số</p>
            <p className="mt-1 text-2xl font-semibold">{total}</p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-700">Đang chờ</p>
            <p className="mt-1 text-2xl font-semibold text-amber-800">
              {pending}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm text-emerald-700">Hoàn thành</p>
            <p className="mt-1 text-2xl font-semibold text-emerald-800">
              {done}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <TodoForm />
        </div>

        {todos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
            <p className="text-base font-medium text-slate-700">
              Chưa có công việc nào
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Hãy thêm todo đầu tiên của bạn.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
