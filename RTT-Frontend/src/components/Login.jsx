
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./ui/Input"; // Assuming you have a custom Input component
import Button from "./ui/Button"; // Assuming you have a custom Button component

const API_URL = "http://localhost:5000/api/login"; // Backend API endpoint

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false); // Track the loading state

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true); // Indicate loading state

    // Validate if username and password are provided
    if (!data.username || !data.password) {
      alert("Username and password are required");
      setLoading(false);
      return;
    }

    try {
      // Send a POST request to the backend for login
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Login successful:", result);

        // Optionally save the token in local storage
        if (result.token) {
          localStorage.setItem("authToken", result.token);

          // Redirect to backend homepage on port 5000
          window.location.href = "http://localhost:5000";
        } else {
          alert("Login successful, but no token received.");
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-200">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username Field */}
          <Input
            label="Username"
            placeholder="Enter your username"
            type="text"
            {...register("username", { required: "Username is required" })}
            error={errors.username && errors.username.message}
          />

          {/* Password Field */}
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            {...register("password", { required: "Password is required" })}
            error={errors.password && errors.password.message}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
