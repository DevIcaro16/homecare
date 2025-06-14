interface Option {
    value: string;
    label: string;
}

interface InputSelectProps {
    labelMessage: string;
    name: string;
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Option[];
    required?: boolean;
}

const InputSelect = ({ labelMessage, name, value, handleChange, options, required = true }: InputSelectProps) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {labelMessage}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required={required}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default InputSelect; 