import { useEffect, useMemo, useState } from "react";
import type { Todo, TodoFormData, TodoStatus } from "../types/todo";
import { getStorageItem, setStorageItem } from "../utils/storage";
import { TODO_STORAGE_KEY } from "../utils/constants";

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>(() => {
        return getStorageItem<Todo[]>(TODO_STORAGE_KEY, []);
    });

    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState<TodoStatus>('all');

    useEffect(() => {
        setStorageItem(TODO_STORAGE_KEY, todos);
    }, [todos]);

    // Lọc theo keyword và trạng thái
    const filteredTodos = useMemo(() => {
        const keyword = searchText.trim().toLowerCase();

        return todos.filter((todo) => {
            const matchesSearch =
                todo.title.toLowerCase().includes(keyword) ||
                todo.description?.toLowerCase().includes(keyword);

            const matchesStatus =
                filterStatus === 'all' ||
                (filterStatus === 'active' && !todo.completed) ||
                (filterStatus === 'completed' && todo.completed);

            return matchesSearch && matchesStatus;
        });
    }, [todos, searchText, filterStatus]);

    // Lấy thống kê số lượng công việc: tất cả - hoàn thành - đang làm
    const todoStats = useMemo(() => {
        const total = todos.length;
        const completed = todos.filter((todo) => todo.completed).length;
        const active = total - completed;

        return {
            total,
            completed,
            active,
        };
    }, [todos]);

    // Thêm công việc vào danh sách
    function addTodo(data: TodoFormData) {
        const now = new Date().toISOString();

        const newTodo: Todo = {
            id: crypto.randomUUID(),
            title: data.title.trim(),
            description: data.description?.trim() || '',
            completed: false,
            createdAt: now,
            updatedAt: now,
        };

        setTodos(prevTodos => [newTodo, ...prevTodos]);
    }

    // Sửa 1 công việc
    function updateTodo(todoId: string, data: TodoFormData) {
        setTodos(prevTodos =>
            prevTodos.map(todo => {
                if (todo.id != todoId) {
                    return todo;
                }

                return {
                    ...todo,
                    title: data.title.trim(),
                    description: data.description?.trim(),
                    updatedAt: new Date().toISOString()
                };
            })
        );
    }

    // Xóa 1 công việc
    function deleteTodo(todoId: string) {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
    }

    function toggleTodo(todoId: string) {
        setTodos(prevTodos =>
            prevTodos.map(todo => {
                if (todo.id !== todoId) {
                    return todo;
                }

                return {
                    ...todo,
                    completed: !todo.completed,
                    updatedAt: new Date().toISOString(),
                };
            }),
        );
    }

    function clearCompletedTodos() {
        setTodos((prevTodos) => prevTodos.filter(todo => !todo.completed));
    }

    return {
        todos,
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
    };
}