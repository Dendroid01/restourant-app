type Variant = 'success' | 'neutral' | 'info' | 'warning' | 'error'

interface StatusConfig {
    variant: Variant
    label: string
}

const STATUS_MAP: Record<string, StatusConfig> = {
    published:  { variant: 'success', label: 'Опубликовано' },
    draft:      { variant: 'neutral', label: 'Черновик' },
    active:     { variant: 'success', label: 'Активен' },
    inactive:   { variant: 'neutral', label: 'Скрыт' },
    new:        { variant: 'info',    label: 'Новая' },
    processing: { variant: 'warning', label: 'В обработке' },
    confirmed:  { variant: 'success', label: 'Подтверждена' },
    cancelled:  { variant: 'error',   label: 'Отменена' },
    approved:   { variant: 'success', label: 'Одобрен' },
    pending:    { variant: 'info',    label: 'На проверке' },
    rejected:   { variant: 'error',   label: 'Отклонён' },
    blocked:    { variant: 'error',   label: 'Заблокирован' },
    read:       { variant: 'success', label: 'Прочитано' },
    unread:     { variant: 'info',    label: 'Новое' },
}

const VARIANT_CLASS: Record<Variant, string> = {
    success: 'bg-success/10 text-success',
    neutral: 'bg-gray-200/10 text-gray-200',
    info:    'bg-info/10    text-info',
    warning: 'bg-gold/10    text-gold',
    error:   'bg-danger/10  text-danger',
}

interface StatusBadgeProps {
    status: string
    customLabel?: string
}

export default function StatusBadge({ status, customLabel }: StatusBadgeProps) {
    const cfg = STATUS_MAP[status] ?? { variant: 'neutral' as const, label: status }
    return (
        <span
            className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${VARIANT_CLASS[cfg.variant]}`}
        >
            {customLabel ?? cfg.label}
        </span>
    )
}