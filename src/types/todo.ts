export type TodoStatus = 'all' | 'active' | 'completed';

export type TodoSort = 'newest' | 'oldest' | 'title-asc' | 'title-desc';

export type Todo = {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
};

export type TodoFormData = {
    title: string;
    description?: string;
};