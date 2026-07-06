import { useEffect, useState } from "react";
import type { Todo, TodoFormData } from "../types/todo";
import { validateTodoForm } from "../utils/validation";
import { TODO_DESCRIPTION_MAX_LENGTH, TODO_TITLE_MAX_LENGTH } from "../utils/constants";

type EditTodoModalProps = {
    todo: Todo | null;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (todoId: string, data: TodoFormData) => void;
};

const EditTodoModal = ({ todo, isOpen, onClose, onSubmit }: EditTodoModalProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (todo) {
            setTitle(todo.title);
            setDescription(todo.description || '');
            setErrorMessage(null);
        }
    }, [todo]);

    if (!isOpen || !todo) {
        return null;
    }

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!todo) {
            return;
        }

        const formData: TodoFormData = {
            title,
            description
        }

        const error = validateTodoForm(formData);

        if (error) {
            setErrorMessage(error);
            return;
        }

        onSubmit(todo.id, formData);
        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-sm bg-white p-5 shadow-sm">
                <h2 className="text-lg text-center font-bold text-gray-900">Chỉnh sửa công việc</h2>
                <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                    <div className="my-4">
                        <label className="my-2 block text-sm font-medium text-gray-700">
                            Tên công việc
                        </label>

                        <input
                            value={title}
                            onChange={event => setTitle(event.target.value)}
                            maxLength={TODO_TITLE_MAX_LENGTH}
                            className="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:none"
                        />
                        <div className="mt-1 flex justify-between text-xs text-gray-400">
                            <span>Bắt buộc</span>
                            <span>
                                {title.length}/{TODO_TITLE_MAX_LENGTH}
                            </span>
                        </div>
                    </div>

                    <div className="my-4">
                        <label className="my-2 block text-sm font-medium text-gray-700">
                            Mô tả
                        </label>

                        <textarea
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            rows={3}
                            maxLength={TODO_DESCRIPTION_MAX_LENGTH}
                            className="w-full resize-none rounded-sm border border-gray-300 px-3 py-2 outline-none focus:none"
                        />
                        <div className="mt-1 flex justify-end text-xs text-gray-400">
                            <span>
                                {description.length}/{TODO_DESCRIPTION_MAX_LENGTH}
                            </span>
                        </div>
                    </div>

                    {errorMessage && (
                        <p className="text-sm text-red-600">{errorMessage}</p>
                    )}

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-sm bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                        >
                            Hủy
                        </button>

                        <button
                            type="submit"
                            className="rounded-sm bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTodoModal