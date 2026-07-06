import { useState } from "react";
import { useTodos } from "../hooks/useTodos"
import type { Todo } from "../types/todo";
import TodoSearch from "../components/TodoSearch";
import TodoFilter from "../components/TodoFilter";
import TodoList from "../components/TodoList";
import ConfirmModal from "../components/ConfirmModal";
import EditTodoModal from "../components/EditTodoModal";
import AddTodoModal from "../components/AddTodoModal";

const HomePage = () => {
    const {
        filteredTodos,
        searchText,
        filterStatus,
        todoStats,
        setSearchText,
        setFilterStatus,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
        clearCompletedTodos,
    } = useTodos();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
    const [deletingTodo, setDeletingTodo] = useState<Todo | null>(null);

    function handleConfirmDelete() {
        if (!deletingTodo) {
            return;
        }

        deleteTodo(deletingTodo.id);
        setDeletingTodo(null);
    }

    return (
        <main className="min-h-screen bg-gray-100 px-4 py-6 md:py-8">
            <div className="mx-auto max-w-3xl space-y-5">
                <header className="flex flex-col gap-4 rounded-sm bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                            Todo List
                        </h1>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsAddModalOpen(true)}
                        className="w-full rounded-sm bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 sm:w-auto"
                    >
                        + Thêm công việc
                    </button>
                </header>

                <section className="rounded-sm bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div className="min-w-0 flex-1">
                            <TodoSearch value={searchText} onChange={setSearchText} />
                        </div>

                        <TodoFilter
                            value={filterStatus}
                            total={todoStats.total}
                            active={todoStats.active}
                            completed={todoStats.completed}
                            onChange={setFilterStatus}
                        />
                    </div>

                    {todoStats.completed > 0 && (
                        <div className="mt-3 flex justify-end">
                            <button
                                type="button"
                                onClick={clearCompletedTodos}
                                className="text-sm font-medium text-gray-500 hover:text-red-600"
                            >
                                Xóa công việc đã hoàn thành
                            </button>
                        </div>
                    )}
                </section>

                <TodoList
                    todos={filteredTodos}
                    onToggle={toggleTodo}
                    onEdit={setEditingTodo}
                    onDelete={setDeletingTodo}
                />

            </div>

            <AddTodoModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={addTodo}
            />

            <EditTodoModal
                isOpen={Boolean(editingTodo)}
                todo={editingTodo}
                onClose={() => setEditingTodo(null)}
                onSubmit={updateTodo}
            />

            <ConfirmModal
                isOpen={Boolean(deletingTodo)}
                title="Xóa công việc?"
                message={`Bạn có chắc muốn xóa "${deletingTodo?.title || 'công việc này'
                    }"? Hành động này không thể hoàn tác.`}
                confirmText="Xóa"
                cancelText="Hủy"
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeletingTodo(null)}
            />
        </main>
    )
}

export default HomePage