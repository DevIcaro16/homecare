interface InputDateProps {
    labelMessage: string;
    request_date: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputDate = ({ labelMessage, request_date, handleChange }: InputDateProps) => {
    return (
        <div>
            <label htmlFor="request_date" className="block text-sm font-medium text-gray-700">
                {labelMessage}
            </label>
            <input
                type="date"
                id="request_date"
                name="request_date"
                value={request_date}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
            />
        </div>
    );
}

export default InputDate;