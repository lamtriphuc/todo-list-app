import type { TodoSort } from "../types/todo";

export const TODO_STORAGE_KEY = 'todo-list-app:todos';

export const TODO_CURRENT_PAGE_STORAGE_KEY = 'todo-list-app:current-page';

export const TODO_TITLE_MAX_LENGTH = 100;

export const TODO_DESCRIPTION_MAX_LENGTH = 300;

export const TODO_PAGE_SIZE = 5;

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