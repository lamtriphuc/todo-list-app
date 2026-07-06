import type { TodoSort, TodoStatus } from "../types/todo";

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

export const TODO_SORT: {
    label: string;
    value: TodoSort;
}[] = [
        {
            label: 'Mới nhất',
            value: 'newest',
        },
        {
            label: 'Cũ nhất',
            value: 'oldest',
        },
        {
            label: 'A-Z',
            value: 'title-asc',
        },
        {
            label: 'Z-A',
            value: 'title-desc',
        },
    ];