import type { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

type TodoListProps = {
    todos: Todo[];
    onToggle: (todoId: string) => void;
    onEdit: (todo: Todo) => void;
    onDelete: (todo: Todo) => void;
};

const TodoList = ({ todos, onToggle, onEdit, onDelete }: TodoListProps) => {
    if (todos.length === 0) {
        return (
            <div className="rounded-sm border border-dashed border-gray-300 bg-white p-8 text-center">
                <p className="font-medium text-gray-700">Không có công việc nào.</p>
                <p className="mt-1 text-sm text-gray-500">
                    Hãy thêm công việc mới hoặc thay đổi bộ lọc.
                </p>
            </div>
        );
    }

    return (
        <ul>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    )
}

export default TodoList
