/**
 * Node modules
 */
import axios from "axios"

/**
 * Types
 */
import type { AxiosError } from "axios"

/**
 * Create axios instance with base configuration
 */
export const devJourneyAPI = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
})

/**
 * Add response interceptor to handle token refresh
 * When a 401 error is received, attempt to refresh the token and retry the request
 */
devJourneyAPI.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any

    // Prevent infinite loops by checking if we've already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retried) {
      originalRequest._retried = true

      try {
        // Attempt to refresh the token
        const { data } = await axios.post(
          "http://localhost:3000/api/v1/auth/refresh-token",
          {},
          { withCredentials: true },
        )

        // Store the new access token
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken)
        }

        // Retry the original request with the new token
        return devJourneyAPI(originalRequest)
      } catch (refreshError) {
        // If token refresh fails, redirect to login
        localStorage.removeItem("user")
        localStorage.removeItem("accessToken")
        window.location.href = "/login"
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

/**
 * Add request interceptor to attach access token to headers
 * Adds the stored access token to every request automatically
 */
devJourneyAPI.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)
