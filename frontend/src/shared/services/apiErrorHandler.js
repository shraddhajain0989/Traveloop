export function normalizeApiError(error) {
  if (error?.response?.data?.message) {
    return { message: error.response.data.message, status: error.response.status };
  }

  if (error?.request) {
    return { message: "Network request failed. Please check your connection.", status: 0 };
  }

  return { message: error?.message || "Something went wrong.", status: 500 };
}

