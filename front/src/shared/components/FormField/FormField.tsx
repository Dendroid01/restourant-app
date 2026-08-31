import clsx from 'clsx';
import { forwardRef, useState, ChangeEvent, FocusEvent, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface SelectOption {
    value: string;
    label: string;
}

interface FormFieldProps {
    name: string;
    label?: string;
    type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'date' | 'select' | 'textarea';
    value: string | number;
    error?: string;
    touched?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    required?: boolean;
    placeholder?: string;
    options?: SelectOption[];
    rows?: number;
    inputProps?: InputHTMLAttributes<HTMLInputElement> &
        TextareaHTMLAttributes<HTMLTextAreaElement> &
        SelectHTMLAttributes<HTMLSelectElement>;
    className?: string;
    autoFocus?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    maxLength?: number;
    pattern?: string;
    min?: number | string;
    max?: number | string;
    step?: number | string;
    showPasswordToggle?: boolean;
}

const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, FormFieldProps>(
    function FormField(
        {
            name,
            label,
            type = 'text',
            value,
            error,
            touched,
            onChange,
            onBlur,
            required = false,
            placeholder,
            options = [],
            rows = 3,
            inputProps = {},
            className = '',
            autoFocus = false,
            disabled = false,
            readOnly = false,
            maxLength,
            pattern,
            min,
            max,
            step,
            showPasswordToggle = false,
        }: FormFieldProps,
        ref
    ) {
        const [showPassword, setShowPassword] = useState(false);
        const showError = !!error && touched;

        const inputClasses = clsx(
            'w-full py-2 px-3 rounded-xl text-dark-brown bg-light-gray',
            'transition-all duration-200 focus:outline-none',
            'border-1 border-light-gray hover:border-gray-400',
            'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
            {
                'border-danger ring-1 ring-danger focus:border-danger focus:ring-1 focus:ring-danger': showError,
            },
            disabled && 'opacity-50 cursor-not-allowed',
            className
        );

        const errorClasses = clsx(
            'overflow-hidden transition-all duration-200 ease-in-out',
            {
                'max-h-10 opacity-100 mt-1': showError,
                'max-h-0 opacity-0 mt-0': !showError,
            }
        );

        const { className: inputPropsClassName, ...otherInputProps } = inputProps;

        const baseProps = {
            id: name,
            name,
            value: value ?? '',
            onChange,
            onBlur,
            required,
            placeholder,
            autoFocus,
            disabled,
            readOnly,
            maxLength,
            pattern,
            min,
            max,
            step,
            'aria-invalid': showError ? ('true' as const) : undefined,
            'aria-disabled': disabled || undefined,
            'aria-describedby': showError ? `${name}-error` : undefined,
            className: clsx(inputClasses, inputPropsClassName),
            ...otherInputProps,
        };

        const renderInput = () => {
            switch (type) {
                case 'select': {
                    const hasOptions = options.length > 0;

                    return (
                        <select {...baseProps} ref={ref as React.ForwardedRef<HTMLSelectElement>}>
                            {!required && (
                                <option value="">
                                    {placeholder || 'Выберите вариант'}
                                </option>
                            )}

                            {hasOptions ? (
                                options.map((o) => (
                                    <option key={o.value} value={o.value}>
                                        {o.label}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>
                                    Нет доступных вариантов
                                </option>
                            )}
                        </select>
                    );
                }
                case 'textarea':
                    return <textarea rows={rows} {...baseProps} ref={ref as React.ForwardedRef<HTMLTextAreaElement>} />;
                default: {
                    const isPassword = type === 'password';
                    const showToggle = isPassword && showPasswordToggle;
                    const inputType = showToggle && showPassword ? 'text' : type;

                    const inputElement = (
                        <input
                            type={inputType}
                            {...baseProps}
                            ref={ref as React.ForwardedRef<HTMLInputElement>}
                            className={clsx(inputClasses, inputPropsClassName)}
                        />
                    );

                    if (showToggle) {
                        return (
                            <div className="relative">
                                {inputElement}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2
                                               text-gray-500 hover:text-gray-700
                                               transition-colors duration-200
                                               rounded-md p-1 cursor-pointer"
                                    aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                                    tabIndex={-1}
                                >
                                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </button>
                            </div>
                        );
                    }

                    return inputElement;
                }
            }
        };

        return (
            <div className="flex flex-col mb-4.5">
                {label && (
                    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                        {required && <span className="text-danger ml-1">*</span>}
                    </label>
                )}

                {renderInput()}

                <div
                    id={`${name}-error`}
                    role="alert"
                    className={errorClasses}
                >
                    <span className="flex items-center gap-1 text-xs text-danger">
                        <span>⚠</span>
                        {error}
                    </span>
                </div>
            </div>
        );
    }
);

FormField.displayName = 'FormField';

export default FormField;