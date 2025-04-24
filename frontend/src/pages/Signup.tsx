import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import userSchema from '@/lib/schema'
import { Link, useNavigate } from 'react-router'
import { Lock, Mail, User } from 'lucide-react'
import signupBg from '../assets/signupBg.png'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRegister } from '@/hooks/useAuthQuery'

interface FormData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const Signup = () => {
  const navigate = useNavigate()
  const { mutateAsync, isPending } = useRegister()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      await mutateAsync(data, {
        onSuccess: (response) => {
          toast.success(response.message)
          navigate('/login')
        },
      })
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('An unknown error occured')
      }
    }
  }

  return (
    <>
      <div className="lg:block">
        <div className="min-h-screen flex items-center justify-center max-sm:flex-none">
          {/* Left div */}
          <div className="w-[60%] max-h-screen overflow-hidden max-sm:hidden">
            <img src={signupBg} alt="" className="w-full object-contain" />
          </div>
          {/* Right div */}
          <div className="w-[40%] max-h-screen !px-14 flex flex-col max-sm:!p-3 max-sm:w-full">
            <h1 className="font-medium text-2xl !mb-1">Sign up</h1>
            <p className="text-[#000000] text-base font-normal leading-full">
              If you already have an account register{' '}
            </p>
            <p className="text-[#000000] text-base font-normal leading-full !mb-0.5">
              You can
              <span className="text-[#FF432A] !ml-1.5">
                <Link to="/login">Login here !</Link>
              </span>
            </p>
            {/* Form Fields */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              {/* email field */}
              <div className="relative !mt-2 !mb-4">
                <label
                  htmlFor="email"
                  className="text-sm !mb-2 font-medium leading-full"
                >
                  Email{' '}
                </label>
                <Mail
                  className="absolute left-0 bottom-2 peer-checked:text-blue-500"
                  color="#000000"
                  size={16}
                />
                <input
                  type="email"
                  {...register('email')}
                  id="email"
                  required
                  className="text-base font-normal text-[#000000] border-b-[#000000] leading-full border-b-2 w-full !pl-6 outline-none !pb-1 peer focus:border-b-[#FF432A]"
                  placeholder="Enter your email address"
                />
                {errors.email?.message && (
                  <p className="absolute text-red-700 text-sm">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              {/* username field */}
              <div className="relative !mb-4">
                <label
                  htmlFor="username"
                  className="text-sm !mb-2 font-medium leading-full"
                >
                  Username{' '}
                </label>
                <User
                  className="absolute left-0 bottom-2 peer-checked:text-blue-500"
                  color="#000000"
                  size={16}
                />
                <input
                  type="text"
                  id="username"
                  {...register('username')}
                  required
                  className="text-base font-normal text-[#000000] border-b-[#000000] leading-full border-b-2 w-full !pl-6 outline-none !pb-1 peer focus:border-b-[#FF432A]"
                  placeholder="Enter your User name"
                />
                {errors.username?.message && (
                  <p className="absolute text-red-700 text-sm">
                    {errors.username?.message}
                  </p>
                )}
              </div>
              {/*  password field */}
              <div className="relative !mb-10">
                <label
                  htmlFor="password"
                  className="text-sm !mb-2 font-medium leading-full"
                >
                  Password{' '}
                </label>
                <Lock
                  className="absolute left-0 !bottom-2 peer-checked:text-blue-500"
                  color="#000000"
                  size={16}
                />
                <input
                  type="password"
                  {...register('password')}
                  id="password"
                  required
                  className="text-base font-normal text-[#000000] border-b-[#000000] leading-full border-b-2 w-full !pl-6 outline-none !pb-1 peer focus:border-b-[#FF432A]"
                  placeholder="Enter your Password"
                />
                {errors.password?.message && (
                  <p className="absolute text-red-700 text-sm !mb-2">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div className="text-black text-sm flex gap-1 flex-col">
                <p>Requirement</p>
                <p>Password must not be less than 6 characters long</p>
                <p>passsword must contain a uppercase and lowercase</p>
                <p>passsword must contain a special character</p>
              </div>
              {/* confirm passowrd field */}
              <div className="relative !mb-4">
                <label
                  htmlFor="confirm-password"
                  className="text-sm !mb-2 font-medium leading-full"
                >
                  Confirm password{' '}
                </label>
                <Lock
                  className="absolute left-0 bottom-2 peer-checked:text-blue-500"
                  color="#000000"
                  size={16}
                />
                <input
                  type="password"
                  {...register('confirmPassword')}
                  id="confirm-password"
                  required
                  className="text-base font-normal text-[#000000] border-b-[#000000] leading-full border-b-2 w-full !pl-6 outline-none !pb-1 peer focus:border-b-[#FF432A]"
                  placeholder="Confirm your Password"
                />
                {errors.confirmPassword?.message && (
                  <p className="!mb-4 text-sm text-red-700 absolute">
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className={`w-full cursor-pointer bg-[#FF432A] text-[#FFFFFF] !mt-1.5 shadow-lg backdrop-blur-md font-normal text-base rounded-full !py-2 ${isPending ? '!cursor-not-allowed opacity-50' : ''}`}
              >
                {isPending ? 'loading' : 'Register'}
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
