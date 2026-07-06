import type { TodoSort as TodoSortValue } from "../types/todo";
import { TODO_SORT } from "../utils/constants";

type TodoSortProps = {
    value: TodoSortValue;
    onChange: (value: TodoSortValue) => void;
};

const TodoSort = ({ value, onChange }: TodoSortProps) => {
    return (
        <select
            value={value}
            onChange={(event) => onChange(event.target.value as TodoSortValue)}
            className="w-full rounded-sm border border-gray-300 bg-white py-2 text-sm outline-none sm:w-auto"
        >
            {TODO_SORT.map((option) => (
                <option key={option.value} value={option.value}>
                    Sắp xếp: {option.label}
                </option>
            ))}
        </select>
    )
}

export default TodoSort