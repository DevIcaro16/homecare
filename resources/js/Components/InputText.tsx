import InputMask from 'react-input-mask';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputTextProps {
    labelMessage: string;
    type?: string;
    required?: boolean;
    register: UseFormRegisterReturn;
    placeholder?: string;
}

const InputText = ({ labelMessage, type = "text", required = true, register, placeholder }: InputTextProps) => {
    const inputId = register.name;
    const defaultPlaceholder = `Digite ${labelMessage.toLowerCase()}`;

    return (
        <div>
            <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
                {labelMessage}
            </label>

            {type === 'tel' ? (
                <InputMask
                    mask="(99) 99999-9999"
                    id={inputId}
                    placeholder={placeholder || defaultPlaceholder}
                    {...register}
                >
                    {(inputProps: any) => (
                        <input
                            {...inputProps}
                            type="tel"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    )}
                </InputMask>
            ) : (
                <input
                    type={type}
                    id={inputId}
                    placeholder={placeholder || defaultPlaceholder}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    {...register}
                />
            )}
        </div>
    );
};

export default InputText;
