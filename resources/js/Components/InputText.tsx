interface InputTextProps {
    labelMessage: string;
    name: string;
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    required?: boolean;
}

const InputText = ({ labelMessage, name, value, handleChange, type = "text", required = true }: InputTextProps) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {labelMessage}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required={required}
            />
        </div>
    );
}

export default InputText; 