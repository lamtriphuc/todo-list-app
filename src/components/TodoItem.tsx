import { useState } from "react";
import type { Todo } from "../types/todo";

type TodoItemProps = {
    todo: Todo;
    onToggle: (todoId: string) => void;
    onEdit: (todo: Todo) => void;
    onDelete: (todo: Todo) => void;
};

const TodoItem = ({ todo, onToggle, onEdit, onDelete }: TodoItemProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const shouldShowToggle = (todo.description?.length ?? 0) > 120;

    return (
        <li className="rounded-sm border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <div className="flex min-w-0 flex-1 gap-3">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => onToggle(todo.id)}
                        className="mt-1 h-4 w-4 shrink-0"
                    />

                    <div className="min-w-0 flex-1">
                        <h3
                            title={todo.title}
                            className={`truncate font-semibold ${todo.completed
                                ? 'text-gray-400 line-through'
                                : 'text-gray-900'
                                }`}
                        >
                            {todo.title}
                        </h3>

                        {todo.description && (
                            <div className="mt-1">
                                <p
                                    className={`wrap-break-word text-sm text-gray-600 ${isExpanded ? '' : 'line-clamp-2'
                                        }`}
                                >
                                    {todo.description}
                                </p>

                                {shouldShowToggle && (
                                    <button
                                        type="button"
                                        onClick={() => setIsExpanded((prev) => !prev)}
                                        className="mt-1 text-xs font-medium text-blue-600 hover:text-blue-700"
                                    >
                                        {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                                    </button>
                                )}
                            </div>
                        )}

                        <p className="mt-2 text-xs text-gray-400">
                            Cập nhật: {new Date(todo.updatedAt).toLocaleString('vi-VN')}
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-2 sm:shrink-0">
                    <button
                        type="button"
                        onClick={() => onEdit(todo)}
                        className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200"
                    >
                        Sửa
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(todo)}
                        className="rounded-lg bg-red-50 px-3 py-1.5 text-sm text-red-600 hover:bg-red-100"
                    >
                        Xóa
                    </button>
                </div>
            </div>
        </li>
    )
}

export default TodoItem