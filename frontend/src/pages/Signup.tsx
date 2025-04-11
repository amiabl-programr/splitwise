import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import userSchema from '@/lib/schema'
import { Link, useNavigate } from 'react-router'
import { Lock, Mail, User } from 'lucide-react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase.ts'
import signupBg from '../assets/signupBg.png'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface FormData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const Signup = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      const userDetails = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      const user = userDetails.user
      const response = await fetch(
        'https://behance-builders-lrx5.onrender.com/api/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            uid: user.uid,
            username: data.username,
          }),
        }
      )

      const result = await response.json()
      if (result.success) {
        toast.success('Sign up successful!')
        navigate('/signin')
      } else {
        toast.error('Error during sign-up')
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error('Error during sign-up')
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
          <div className="w-[40%] !py-10 !px-14 flex flex-col max-sm:!p-3 max-sm:w-full">
            <h1 className="font-medium text-2xl !mb-5">Sign up</h1>
            <p className="text-[#000000] text-base font-normal leading-full">
              If you already have an account register{' '}
            </p>
            <p className="text-[#000000] text-base font-normal leading-full !mb-7">
              You can
              <span className="text-[#FF432A] !ml-1.5">
                <Link to="/login">Login here !</Link>
              </span>
            </p>
            {/* Form Fields */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              {/* email field */}
              <div className="relative !mt-3 !mb-5">
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
              <div className="relative !mb-6">
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
                  className="absolute left-0 bottom-2 peer-checked:text-blue-500"
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
                  <p className="absolute text-red-700 text-sm">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              {/* confirm passowrd field */}
              <div className="relative !mb-6">
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
                  <p className="!mb-4 text-sm font-red-700 absolute">
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer bg-[#FF432A] text-[#FFFFFF] shadow-lg backdrop-blur-md font-normal text-base rounded-full !py-2"
              >
                Register
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
