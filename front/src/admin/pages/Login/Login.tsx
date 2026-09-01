import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {loginSchema, LoginFormData} from '@/admin/schemas/loginSchema'
import FormField from '@/shared/components/FormField/FormField'
import ButtonPrimary from '@/shared/components/Buttons/ButtonPrimary'
import {useAuth} from '../../context/AuthContext'
import {useNavigate, useLocation} from 'react-router-dom'
import {useState} from 'react'

export default function Login() {
    const {login} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname ?? '/admin'

    const [serverError, setServerError] = useState('')

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors, isSubmitting, touchedFields},
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginFormData) => {
        setServerError('')
        try {
            await login(data.email, data.password)
            navigate(from, {replace: true})
        } catch (err: any) {
            setServerError(err.message || 'Ошибка входа')
        }
    }

    const values = watch()

    return (
        <div className="flex flex-col md:p-6 min-h-screen items-center justify-center bg-color-gray-50">
            <div
                className="bg-white rounded-3xl shadow-md w-full lg:max-w-[720px] 2xl:max-w-[800px] px-[36px] py-[40px]">
                <div className="font-serif text-xl md:text-5xl text-center text-gold mb-4">✦ RESTAURANT ADMIN</div>
                <h1 className="font-serif text-center text-2xl font-normal">
                    Вход в панель
                </h1>
                <p className="text-center text-sm mb-6 text-gray-500">
                    Введите email и пароль
                </p>

                {serverError && <div
                    className="bg-brown-100 border border-brown-200 text-base font-bold text-danger rounded-xl px-4 py-3 mb-4">
                    ⚠️ {serverError}
                </div>}

                <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <FormField
                        label="Email"
                        type="email"
                        placeholder="admin@example.com"
                        required
                        autoFocus
                        {...register('email')}
                        value={values.email}
                        error={errors.email?.message}
                        touched={touchedFields.email}
                    />
                    <FormField
                        label="Пароль"
                        type="password"
                        placeholder="••••••"
                        required
                        showPasswordToggle
                        {...register('password')}
                        value={values.password}
                        error={errors.password?.message}
                        touched={touchedFields.password}
                    />
                    <ButtonPrimary
                        isSubmitting={isSubmitting}
                        loadingText="Входим..."
                    >
                        Войти в систему
                    </ButtonPrimary>
                </form>
            </div>
        </div>
    )
}