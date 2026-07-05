type TodoSearchProps = {
    value: string,
    onChange: (value: string) => void
}

const TodoSearch = ({ value, onChange }: TodoSearchProps) => {
    return (
        <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Tìm kiếm công việc..."
            className="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none"
        />
    )
}

export default TodoSearch