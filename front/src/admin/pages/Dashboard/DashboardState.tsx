export function DashboardLoading() {
    return (
        <div className="text-center px-15 py-5">
            <div className="text-lg text-gray-200">
                Загрузка данных дашборда...
            </div>
        </div>
    )
}

interface ErrorProps {
    message: string
    onRetry: () => void
}

export function DashboardError({ message, onRetry }: ErrorProps) {
    return (
        <div className="flex flex-col items-center justify-center px-15 py-5">
            <div className="text-danger mb-4 text-sm">⚠️ {message}</div>
            <button
                onClick={onRetry}
                className="inline-flex items-center justify-center gap-1 px-2 py-3 rounded-4xl border-0 font-sans text-sm font-medium pointer transition-all bg-red text-white hover:bg-red"
            >
                Попробовать снова
            </button>
        </div>
    )
}