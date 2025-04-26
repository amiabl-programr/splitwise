import axiosInstance from '@/api/axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

type ForgotPasswordForm = {
  email: string
}

type ForgotPasswordResponse = {
  message: string
}

type ApiError = {
  message: string
}

export const useForgotPassword = () => {
  return useMutation<
    ForgotPasswordResponse,
    AxiosError<ApiError>,
    ForgotPasswordForm
  >({
    mutationFn: async (formData) => {
      const response = await axiosInstance.post<ForgotPasswordResponse>(
        '/api/forgot-password',
        formData
      )
      return response.data
    },
  })
}
