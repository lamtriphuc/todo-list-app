import { TODO_DESCRIPTION_MAX_LENGTH, TODO_TITLE_MAX_LENGTH } from "../utils/constants";

type TodoFormFieldsProps = {
    title: string;
    description: string;
    errorMessage: string | null;
    submitText: string;
    titleInputId: string;
    descriptionInputId: string;
    onTitleChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onCancel: () => void;
};

const TodoFormFields = ({
    title,
    description,
    errorMessage,
    submitText,
    titleInputId,
    descriptionInputId,
    onTitleChange,
    onDescriptionChange,
    onCancel,
}: TodoFormFieldsProps) => {
    return (
        <>
            <div>
                <label
                    htmlFor={titleInputId}
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Tên công việc
                </label>

                <input
                    id={titleInputId}
                    value={title}
                    onChange={(event) => onTitleChange(event.target.value)}
                    placeholder="Ví dụ: Hoàn thành bài test intern"
                    maxLength={TODO_TITLE_MAX_LENGTH}
                    className="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                />

                <div className="mt-1 flex justify-between text-xs text-gray-400">
                    <span>Bắt buộc</span>
                    <span>
                        {title.length}/{TODO_TITLE_MAX_LENGTH}
                    </span>
                </div>
            </div>

            <div>
                <label
                    htmlFor={descriptionInputId}
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Mô tả
                </label>

                <textarea
                    id={descriptionInputId}
                    value={description}
                    onChange={(event) => onDescriptionChange(event.target.value)}
                    placeholder="Ghi chú thêm nếu cần..."
                    rows={3}
                    maxLength={TODO_DESCRIPTION_MAX_LENGTH}
                    className="w-full resize-none rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
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

            <div className="flex justify-end gap-2 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-sm bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                    Hủy
                </button>

                <button
                    type="submit"
                    className="rounded-sm bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    {submitText}
                </button>
            </div>
        </>
    )
}

export default TodoFormFields