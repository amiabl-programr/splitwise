import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'
import { toast } from 'react-toastify'
import ClipLoader from 'react-spinners/ClipLoader'

type LoginFormData = {
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
      const { email, password } = data
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      const response = await fetch(
        'https://behance-builders-lrx5.onrender.com/api/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid: user.uid,
          }),
        }
      )

      const result = await response.json()

      if (result.success) {
        toast.success('Login successfully! Redirecting...')
      } else {
        toast.error('User not found in database: ' + result.message)
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Email login failed:', error)
        toast.error(error.message)
      } else {
        toast.error('Unexpected error during login')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      console.log('Google User:', user)
      toast.success('Login successfully! Redirecting...')
    } catch (error) {
      console.error('Google sign-in error:', error)
      toast.error('Google sign-in failed. Please try again.')
    }
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
              <a href="/forgot" className="text-primary hover:underline">
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
