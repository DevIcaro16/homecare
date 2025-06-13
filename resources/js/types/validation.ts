export interface BaseValidationRule {
    required: boolean;
    pattern: RegExp;
    message: string;
}

export interface NameValidationRule extends BaseValidationRule {
    min: number;
    max: number;
}

export interface EmailValidationRule extends BaseValidationRule {
    max: number;
}

export interface PasswordValidationRule extends BaseValidationRule {
    min: number;
}

export type ValidationRules = {
    name: NameValidationRule;
    email: EmailValidationRule;
    password: PasswordValidationRule;
};

export const validationRules: ValidationRules = {
    name: {
        required: true,
        min: 3,
        max: 200,
        pattern: /^[a-zA-ZÀ-ÿ\s\-]+$/,
        message: 'O nome deve conter apenas letras, espaços e hífens'
    },
    email: {
        required: true,
        max: 100,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'Digite um e-mail válido'
    },
    password: {
        required: true,
        min: 8,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        message: 'A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial'
    }
}; 