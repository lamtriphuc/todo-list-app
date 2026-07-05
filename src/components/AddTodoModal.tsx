import { useState } from "react";
import type { TodoFormData } from "../types/todo";
import { validateTodoForm } from "../utils/validation";

type AddTodoModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: TodoFormData) => void;
};

const AddTodoModal = ({ isOpen, onClose, onSubmit }: AddTodoModalProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    if (!isOpen) {
        return null;
    }

    function handleClose() {
        setTitle('');
        setDescription('');
        setErrorMessage(null);
        onClose();
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData: TodoFormData = {
            title,
            description,
        };

        const error = validateTodoForm(formData);

        if (error) {
            setErrorMessage(error);
            return;
        }

        onSubmit(formData);
        handleClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-sm bg-white p-5 shadow-lg">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">
                            Thêm công việc
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Tạo công việc mới để theo dõi tiến độ.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        className="rounded-lg px-2 py-1 text-gray-500 hover:bg-gray-100"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Tên công việc
                        </label>

                        <input
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Ví dụ: Hoàn thành bài test intern"
                            className="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Mô tả
                        </label>

                        <textarea
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            placeholder="Ghi chú thêm nếu cần..."
                            rows={3}
                            className="w-full resize-none rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                        />
                    </div>

                    {errorMessage && (
                        <p className="text-sm text-red-600">{errorMessage}</p>
                    )}

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="rounded-sm bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                        >
                            Hủy
                        </button>

                        <button
                            type="submit"
                            className="rounded-sm bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            Thêm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTodoModal