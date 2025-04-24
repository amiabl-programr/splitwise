import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { toast } from 'react-toastify'
import ClipLoader from 'react-spinners/ClipLoader'
import { useNavigate } from 'react-router'
import { useLogin } from '@/hooks/useAuthQuery'

interface LoginFormData {
  email: string
  password: string
}

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const { mutateAsync } = useLogin()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    try {
      await mutateAsync(data, {
        onSuccess: (response) => {
          toast.success(response.message)
          navigate('/dashboard')
        },
      })
      setLoading(false)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error during login:', error.message)
        console.error('Stack trace:', error.stack)
      } else {
        console.error('Unknown error during login:', error)
      }

      toast.error('Something went wrong during login.')
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    console.log('waiting...')
  }

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-[#ffece3] hidden md:flex items-center justify-center">
        <img
          src="/img/loginimg.png"
          alt="Illustration"
          className="max-w-[90%]"
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-24 py-12">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold text-black mb-4">Sign in</h2>
          <p className="text-sm text-black mb-6">
            If you don’t have an account register
            <a href="/signup" className="text-[#ff432a] ml-1 font-semibold ">
              Register here !
            </a>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <div className="relative">
                <span className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-400">
                  <img src="/img/message 1.png" alt="" />
                </span>
                <input
                  type="email"
                  {...register('email')}
                  placeholder="Enter your email address"
                  className="w-full pl-8 pr-4 py-2 text-[#000000] placeholder:text-[#000000] border-b-2 border-[#000000] focus:outline-none focus:border-[#ff432a]"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Password</label>
              <div className="relative">
                <span className="absolute left-1 top-1/2 -translate-y-1/2">
                  <img src="/img/padlock 1.png" alt="" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="Enter your Password"
                  className="w-full pl-8 pr-10 py-2 text-[#000000] placeholder:text-[#000000] border-b-2 border-[#000000] focus:outline-none focus:border-[#ff432a]"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" /> Remember me
              </label>
              <a
                href="/forgot-password"
                className="text-primary hover:underline"
              >
                Forgot Password ?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ff432a] cursor-pointer text-white py-2 rounded-full shadow hover:bg-primary-dark transition"
            >
              {loading ? (
                <ClipLoader color="#ffffff" size={20} className="mx-auto" />
              ) : (
                'Login'
              )}
            </button>

            <div className="text-center text-gray-400 text-sm">
              or continue with
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-1 border py-2 rounded-full hover:bg-gray-100 transition"
            >
              <img src="/img/google.png" alt="" className="w-[20px] h-[20px]" />
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
