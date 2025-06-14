import { UseFormRegisterReturn } from 'react-hook-form';

interface InputTextProps {
    labelMessage: string;
    type?: string;
    required?: boolean;
    register: UseFormRegisterReturn;
}

const InputText = ({ labelMessage, type = "text", required = true, register }: InputTextProps) => {
    return (
        <div>
            <label htmlFor={register.name} className="block text-sm font-medium text-gray-700">
                {labelMessage}
            </label>
            <input
                type={type}
                id={register.name}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...register}
            />
        </div>
    );
}

export default InputText; 