import { useEffect, useMemo, useRef, useState } from "react";
import type { Todo, TodoFormData, TodoSort, TodoStatus } from "../types/todo";
import { getStorageItem, setStorageItem } from "../utils/storage";
import { TODO_CURRENT_PAGE_STORAGE_KEY, TODO_PAGE_SIZE, TODO_STORAGE_KEY } from "../utils/constants";
import { isDuplicateTodoTitle } from "../utils/validation";

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>(() => {
        return getStorageItem<Todo[]>(TODO_STORAGE_KEY, []);
    });

    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState<TodoStatus>('all');
    const [sortBy, setSortBy] = useState<TodoSort>('newest');

    const [currentPage, setCurrentPage] = useState(getInitialCurrentPage);

    const isFirstRender = useRef(true);

    useEffect(() => {
        setStorageItem(TODO_STORAGE_KEY, todos);
    }, [todos]);

    useEffect(() => {
        setStorageItem(TODO_CURRENT_PAGE_STORAGE_KEY, currentPage);
    }, [currentPage]);

    // Bỏ qua lần render đầu để khi F5 vẫn giữ được trang hiện tại từ localStorage.
    // Sau đó, mỗi khi search/filter/sort thay đổi thì quay về trang 1.
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        setCurrentPage(1);
    }, [searchText, filterStatus, sortBy]);

    // Tách riêng bước search để số lượng trên filter tabs phản ánh đúng kết quả tìm kiếm.
    const searchedTodos = useMemo(() => {
        const keyword = searchText.trim().toLowerCase();

        if (!keyword) {
            return todos;
        }

        return todos.filter(todo => {
            return (
                todo.title.toLowerCase().includes(keyword) ||
                todo.description?.toLowerCase().includes(keyword)
            );
        });
    }, [todos, searchText]);

    // Thống kê dựa trên danh sách sau khi search, nhưng trước khi lọc trạng thái.
    const todoStats = useMemo(() => {
        const total = searchedTodos.length;
        const completed = searchedTodos.filter(todo => todo.completed).length;
        const active = total - completed;

        return {
            total,
            completed,
            active,
        };
    }, [searchedTodos]);

    // Sau khi search, tiếp tục lọc theo trạng thái rồi sắp xếp danh sách.
    const filteredTodos = useMemo(() => {
        const result = searchedTodos.filter(todo => {
            return (
                filterStatus === 'all' ||
                (filterStatus === 'active' && !todo.completed) ||
                (filterStatus === 'completed' && todo.completed)
            );
        });

        return [...result].sort((a, b) => {
            if (sortBy === 'newest') {
                return (
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
            }

            if (sortBy === 'oldest') {
                return (
                    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                );
            }

            if (sortBy === 'title-asc') {
                return a.title.localeCompare(b.title, 'vi');
            }

            if (sortBy === 'title-desc') {
                return b.title.localeCompare(a.title, 'vi');
            }

            return 0;
        });
    }, [searchedTodos, filterStatus, sortBy]);

    const totalPages = Math.max(1, Math.ceil(filteredTodos.length / TODO_PAGE_SIZE));

    // Chỉ lấy các công việc thuộc trang hiện tại để hiển thị.
    const paginatedTodos = useMemo(() => {
        const startIndex = (currentPage - 1) * TODO_PAGE_SIZE;
        const endIndex = startIndex + TODO_PAGE_SIZE;

        return filteredTodos.slice(startIndex, endIndex);
    }, [filteredTodos, currentPage]);

    // Khi xóa/lọc làm giảm số trang, đưa currentPage về trang hợp lệ gần nhất.
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    function getInitialCurrentPage() {
        const savedPage = getStorageItem<number>(TODO_CURRENT_PAGE_STORAGE_KEY, 1);

        if (!Number.isInteger(savedPage) || savedPage < 1) {
            return 1;
        }

        return savedPage;
    }

    function addTodo(data: TodoFormData): string | null {
        if (isDuplicateTodoTitle(data.title, todos)) {
            return 'Tiêu đề công việc đã tồn tại.';
        }

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
        return null;
    }

    function updateTodo(todoId: string, data: TodoFormData): string | null {
        if (isDuplicateTodoTitle(data.title, todos, todoId)) {
            return 'Tiêu đề công việc đã tồn tại.';
        }

        setTodos(prevTodos =>
            prevTodos.map(todo => {
                if (todo.id !== todoId) {
                    return todo;
                }

                return {
                    ...todo,
                    title: data.title.trim(),
                    description: data.description?.trim() || '',
                    updatedAt: new Date().toISOString()
                };
            })
        );

        return null;
    }

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
        sortBy,
        todoStats,
        paginatedTodos,
        currentPage,
        totalPages,
        pageSize: TODO_PAGE_SIZE,
        setCurrentPage,
        setSearchText,
        setFilterStatus,
        setSortBy,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
        clearCompletedTodos,
    };
}