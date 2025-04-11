import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create an axios instance with base configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true, // Sending header credentails
  headers: {
    'Content-Type': 'application/json',
  },
})

// original request type with retry flag
interface RetryConfig extends AxiosRequestConfig {
  _retry?: boolean
}

// interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig

    // If error is 401 and we haven't tried refreshing the session yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        await axios.post(
          `${baseURL}/auth/refresh`,
          {},
          {
            withCredentials: true,
          }
        )

        // retry the original request
        if (originalRequest) {
          return axiosInstance(originalRequest)
        }
      } catch (refreshError) {
        // redirect to login
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
