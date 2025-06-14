import { UseFormRegisterReturn } from 'react-hook-form';

interface InputDateProps {
    labelMessage: string;
    register: UseFormRegisterReturn;
    placeholder?: string;
}

const InputDate = ({ labelMessage, register, placeholder }: InputDateProps) => {
    const defaultPlaceholder = `Selecione ${labelMessage.toLowerCase()}`;

    return (
        <div>
            <label htmlFor={register.name} className="block text-sm font-medium text-gray-700">
                {labelMessage}
            </label>
            <input
                type="date"
                id={register.name}
                placeholder={placeholder || defaultPlaceholder}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...register}
            />
        </div>
    );
}

export default InputDate;