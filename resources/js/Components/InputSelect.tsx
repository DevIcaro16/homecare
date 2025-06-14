import { UseFormRegisterReturn } from 'react-hook-form';

interface Option {
    value: string;
    label: string;
}

interface InputSelectProps {
    labelMessage: string;
    options: Option[];
    required?: boolean;
    register: UseFormRegisterReturn;
    placeholder?: string;
}

const InputSelect = ({ labelMessage, options, register, placeholder }: InputSelectProps) => {
    const defaultPlaceholder = `Selecione ${labelMessage.toLowerCase()}`;

    return (
        <div>
            <label htmlFor={register.name} className="block text-sm font-medium text-gray-700">
                {labelMessage}
            </label>
            <select
                id={register.name}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...register}
            >
                <option value="" disabled>{placeholder || defaultPlaceholder}</option>
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