import { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast, ToastContainer } from 'react-toastify'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  //   const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      //   navigate('/reset-password');
    } catch (error) {
      console.error('Failed to send reset email', error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('An unknown error occured')
      }
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
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 outline-none"
          />
          <Button onClick={handleSubmit} className="cursor-pointer">
            Send Reset Link
          </Button>
          <ToastContainer />
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
