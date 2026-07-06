import type { Todo, TodoFormData } from "../types/todo";
import { TODO_DESCRIPTION_MAX_LENGTH, TODO_TITLE_MAX_LENGTH } from "./constants";

// Chuẩn hóa title để so sánh không phân biệt hoa/thường và khoảng trắng đầu/cuối.
export function normalizeTodoTitle(title: string): string {
    return title.trim().toLowerCase();
}

// ignoredTodoId dùng khi chỉnh sửa để không tự so sánh với chính todo hiện tại.
export function isDuplicateTodoTitle(
    title: string,
    todos: Todo[],
    ignoredTodoId?: string,
): boolean {
    const normalizedTitle = normalizeTodoTitle(title);

    return todos.some(todo => {
        if (todo.id === ignoredTodoId) {
            return false;
        }

        return normalizeTodoTitle(todo.title) === normalizedTitle;
    });
}

export function validateTodoForm(data: TodoFormData): string | null {
    const title = data.title.trim();
    const description = data.description?.trim() || '';

    if (!title) {
        return 'Vui lòng nhập tiêu đề công việc.';
    }

    if (title.length > TODO_TITLE_MAX_LENGTH) {
        return `Tiêu đề công việc không được vượt quá ${TODO_TITLE_MAX_LENGTH} ký tự.`;
    }

    if (description.length > TODO_DESCRIPTION_MAX_LENGTH) {
        return `Mô tả không được vượt quá ${TODO_DESCRIPTION_MAX_LENGTH} ký tự.`;
    }

    return null;
}

