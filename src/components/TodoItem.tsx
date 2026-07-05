import type { Todo } from "../types/todo";

type TodoItemProps = {
    todo: Todo;
    onToggle: (todoId: string) => void;
    onEdit: (todo: Todo) => void;
    onDelete: (todo: Todo) => void;
};

const TodoItem = ({ todo, onToggle, onEdit, onDelete }: TodoItemProps) => {
    return (
        <li className="rounded-sm border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
                {/* Check box */}
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    className="mt-1 h-5 w-5"
                />


                <div className="flex-1">
                    <h3
                        className={`font-semibold ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-900'
                            }`}
                    >
                        {todo.title}
                    </h3>

                    {todo.description && (
                        <p className="mt-1 text-sm text-gray-600">{todo.description}</p>
                    )}

                    <p className="mt-2 text-xs text-gray-400">
                        Cập nhật: {new Date(todo.updatedAt).toLocaleString('vi-VN')}
                    </p>
                </div>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => onEdit(todo)}
                        className="rounded-sm bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200"
                    >
                        Sửa
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(todo)}
                        className="rounded-sm bg-red-50 px-3 py-1 text-sm text-red-600 hover:bg-red-100"
                    >
                        Xóa
                    </button>
                </div>
            </div>
        </li>
    )
}

export default TodoItem