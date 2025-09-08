const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    // Add authentication token if available
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Token ${token}`,
        };
      }
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // HTTP methods
  get(endpoint: string, options: RequestInit = {}) {
    return this.request(endpoint, { method: "GET", ...options });
  }

  post(endpoint: string, data: any, options: RequestInit = {}) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    });
  }

  put(endpoint: string, data: any, options: RequestInit = {}) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      ...options,
    });
  }

  patch(endpoint: string, data: any, options: RequestInit = {}) {
    return this.request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
      ...options,
    });
  }

  delete(endpoint: string, options: RequestInit = {}) {
    return this.request(endpoint, { method: "DELETE", ...options });
  }
}

export const apiClient = new ApiClient();
