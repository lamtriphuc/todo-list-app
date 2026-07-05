import type { TodoStatus } from "../types/todo";

type TodoFilterProps = {
    value: TodoStatus;
    total: number;
    active: number;
    completed: number;
    onChange: (value: TodoStatus) => void;
};

const TodoFilter = ({ value, total, active, completed, onChange, }: TodoFilterProps) => {
    const filters: {
        label: string;
        value: TodoStatus;
        count: number;
    }[] = [
            {
                label: 'Tất cả',
                value: 'all',
                count: total,
            },
            {
                label: 'Chưa xong',
                value: 'active',
                count: active,
            },
            {
                label: 'Đã xong',
                value: 'completed',
                count: completed,
            },
        ];

    return (
        <div className="flex w-full gap-2 overflow-x-auto md:w-auto md:overflow-visible">
            {filters.map((filter) => {
                const isActive = filter.value === value;

                return (
                    <button
                        key={filter.value}
                        type="button"
                        onClick={() => onChange(filter.value)}
                        className={`shrink-0 rounded-full px-3 py-2 text-sm font-medium transition ${isActive
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {filter.label}
                        <span
                            className={`ml-1 rounded-full px-1.5 py-0.5 text-xs ${isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-white text-gray-500'
                                }`}
                        >
                            {filter.count}
                        </span>
                    </button>
                );
            })}
        </div>
    )
}

export default TodoFilter