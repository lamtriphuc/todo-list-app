import type { TodoFormData } from "../types/todo";

export function validateTodoForm(data: TodoFormData): string | null {
    const title = data.title.trim();

    if (!title) {
        return 'Tên công việc không được để trống.';
    }

    if (title.length < 2) {
        return 'Tên công việc phải có ít nhất 2 ký tự.';
    }

    if (title.length > 100) {
        return 'Tên công việc không được vượt quá 100 ký tự.';
    }

    if (data.description && data.description.length > 300) {
        return 'Mô tả không được vượt quá 300 ký tự.';
    }

    return null
}