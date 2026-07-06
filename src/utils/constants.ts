import type { TodoStatus } from "../types/todo";

export const TODO_STORAGE_KEY = 'todo-list-app:todos';

export const TODO_TITLE_MAX_LENGTH = 100;

export const TODO_DESCRIPTION_MAX_LENGTH = 300;

export const TODO_FILTERS: {
    label: string,
    value: TodoStatus
}[] = [
        {
            label: 'Tất cả',
            value: 'all',
        },
        {
            label: 'Chưa hoàn thành',
            value: 'active',
        },
        {
            label: 'Đã hoàn thành',
            value: 'completed',
        }
    ];