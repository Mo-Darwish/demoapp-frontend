const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL 

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    // Add authentication token if available
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken")
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Token ${token}`,
        }
      }
    }

    try {
      console.log('Making request to:', url) // Debug log
      console.log('Request config:', config) // Debug log
      
      const response = await fetch(url, config)
      
      console.log('Response status:', response.status) // Debug log
      console.log('Response headers:', response.headers) // Debug log
      
      if (!response.ok) {
        const errorText = await response.text()
        console.log('Error response body:', errorText) // Debug log
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
      }
      
      const data = await response.json()
      console.log('Response data:', data) // Debug log
      return data
    } catch (error) {
      console.error("API request failed:", error)
      console.error("Full error details:", {
        message: error.message,
        name: error.name,
        stack: error.stack
      })
      throw error
    }
  }

  // ... rest of your methods remain the same
}

export const apiClient = new ApiClient()
