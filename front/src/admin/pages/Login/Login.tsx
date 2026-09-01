import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {loginSchema, LoginFormData} from '@/admin/schemas/loginSchema'
import FormField from '@/shared/components/FormField/FormField'
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
        resolver: zodResolver(loginSchema),
        defaultValues: {email: 'admin@example.com', password: 'qwerty123!'},
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
            <div className="bg-white rounded-3xl shadow-md w-full lg:max-w-[720px] 2xl:max-w-[800px] px-[36px] py-[40px]">
                <div className="login-logo font-serif text-xl md:text-3xl lg:text-5xl text-center text-gold">✦ RESTAURANT ADMIN</div>
                <h1 style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 26,
                    fontWeight: 400,
                    textAlign: 'center',
                    marginBottom: 8
                }}>
                    Вход в панель
                </h1>
                <p style={{textAlign: 'center', fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28}}>
                    Введите email и пароль
                </p>

                {serverError && <div className="login-error">⚠️ {serverError}</div>}

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                    <button
                        type="submit"
                        className="btn-admin btn-admin-primary"
                        style={{width: '100%', marginTop: 8, padding: '12px 24px', fontSize: 15}}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Входим...' : 'Войти в систему'}
                    </button>
                </form>
            </div>
        </div>
    )
}