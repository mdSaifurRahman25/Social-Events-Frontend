export type PasswordRule = {
    id: string;
    label: string;
    test: (value: string) => boolean;
};

export const PASSWORD_RULES: PasswordRule[] = [
    { id: "length", label: "At least 8 characters", test: (v) => v.length >= 8 },
    { id: "uppercase", label: "One uppercase letter", test: (v) => /[A-Z]/.test(v) },
    { id: "lowercase", label: "One lowercase letter", test: (v) => /[a-z]/.test(v) },
];

export const PASSWORD_ERROR_MESSAGE =
    "Password must be at least 8 characters and include one uppercase and one lowercase letter.";

export const isPasswordValid = (value: string) =>
    PASSWORD_RULES.every((rule) => rule.test(value));
