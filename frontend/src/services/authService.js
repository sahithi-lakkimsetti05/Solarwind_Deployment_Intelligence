import api from "./api";

// -----------------------------
// Login User
// -----------------------------
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    const detail = error.response?.data?.detail;

    if (Array.isArray(detail)) {
      const message = detail
        .map((item) => item.msg || "Invalid input")
        .join(", ");

      throw new Error(message);
    }

    if (typeof detail === "object" && detail !== null) {
      throw new Error(
        detail.message ||
        detail.msg ||
        JSON.stringify(detail)
      );
    }

    throw new Error(
      detail ||
      error.message ||
      "Login failed. Please try again."
    );
  }
};

// -----------------------------
// Register User
// -----------------------------
export const registerUser = async (
  fullName,
  email,
  password,
  role
) => {
  try {
    const response = await api.post("/auth/register", {
      full_name: fullName,
      email: email,
      password: password,
      role: role,
    });

    return response.data;
  } catch (error) {
    const detail = error.response?.data?.detail;

    if (Array.isArray(detail)) {
      const message = detail
        .map((item) => item.msg || "Invalid input")
        .join(", ");

      throw new Error(message);
    }

    if (typeof detail === "object" && detail !== null) {
      throw new Error(
        detail.message ||
        detail.msg ||
        JSON.stringify(detail)
      );
    }

    throw new Error(
      detail ||
      error.message ||
      "Registration failed. Please try again."
    );
  }
};
