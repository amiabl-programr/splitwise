import { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast, ToastContainer } from 'react-toastify'
import { useForgotPassword } from '@/hooks/useForgotPassword'
import { AxiosError } from 'axios'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  //   const navigate = useNavigate();

  const forgotPasswordMutation = useForgotPassword()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      forgotPasswordMutation.mutateAsync(
        { email },
        {
          onSuccess: () => {
            setSubmitted(true)
            toast.success('✅ Password reset link sent! Check your email.')
          },
          onError: (error) => {
            const msg =
              error?.response?.data?.message || 'Something went wrong.'
            toast.error(msg)
          },
        }
      )
    } catch (error) {
      console.log(error)
      const axiosError = error as AxiosError<{ message?: string }>
      const msg =
        axiosError?.response?.data?.message ||
        'Something went wrong. Please try again.'
      toast.error(msg)
    }
  }

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
          <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
          {submitted ? (
            <div className="text-green-600">
              ✅ A password reset link has been sent to your email.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div>
                <Input
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-4 outline-none"
                />
                {forgotPasswordMutation.isError && (
                  <p className="text-red-600">
                    {forgotPasswordMutation.error?.response?.data?.message ??
                      'An error occurred'}
                  </p>
                )}

                <Button
                  disabled={forgotPasswordMutation.isPending}
                  className="cursor-pointer"
                >
                  {forgotPasswordMutation.isPending
                    ? 'Sending...'
                    : 'Send Reset Link'}
                </Button>
                <ToastContainer />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
