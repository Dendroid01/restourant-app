import {ReactNode} from 'react'

interface ButtonPrimaryProps {
    isSubmitting: boolean
    children?: ReactNode
    loadingText?: string
    disabled?: boolean
    className?: string
}

export default function ButtonPrimary({
                                         isSubmitting,
                                         children = 'Отправить',
                                         loadingText = 'Загрузка...',
                                         className = 'w-full text-center py-4 rounded-4xl ' +
                                         'border-0 cursor-pointer text-base font-medium bg-danger text-white',
                                         disabled,
                                     }: ButtonPrimaryProps) {
    return (
        <button
            type="submit"
            className={className}
            disabled={isSubmitting || disabled}
        >
            {isSubmitting ? loadingText : children}
        </button>
    )
}