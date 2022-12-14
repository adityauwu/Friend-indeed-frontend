import axios from "axios"
import { stringify } from "qs"
import { notification } from "antd"

import {
  PROD_URL,
  STAGING_URL,
  ENV,
  STORAGE_KEY_CONSTANT,
  STORAGE_USER_CONSTANT,
} from "./constants"

export const Logout = () => {
  localStorage.removeItem(STORAGE_KEY_CONSTANT)
  localStorage.removeItem(STORAGE_USER_CONSTANT)
  window.location.href = "/login"
}

export const greeter = () => {
  const now = new Date().getHours()

  if (now < 12) return "Good Morning"
  else if (now >= 12 && now <= 17) return "Good Afternoon"
  else if (now >= 17 && now <= 24) return "Good Evening"
}

const token = localStorage.getItem(STORAGE_KEY_CONSTANT)
export const API = axios.create({
  baseURL: ENV == "staging" ? STAGING_URL : PROD_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "access-control-allow-origin": "https://friendin-deed.herokuapp.com",
  },
  paramsSerializer: (params) => stringify(params, { arrayFormat: "brackets" }),
})

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const statusCode = error.response.status
    const message = error.response.data.message

    switch (statusCode) {
      case 400:
        notification.error({
          message: "Invalid details submitted in form",
          description: message,
        })
        break
      case 401:
        notification.error({
          message: "Authentication Failure",
          description: "Seems session was offline for long. Please login again",
        })
        Logout()
        break
      case 403:
        notification.error({
          message: "Authorization Failure",
          description: message,
        })
        break
      case statusCode > 403 && statusCode < 500:
        notification.error({
          message: message,
        })
        break
      default:
        notification.error({
          message: "Internal Server Error",
          description: message,
        })
        break
    }
  }
)
