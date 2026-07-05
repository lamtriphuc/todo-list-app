export type TodoStatus = 'all' | 'active' | 'completed';

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