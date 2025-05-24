import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./ui/Input"; // Assuming you have a custom Input component
import Button from "./ui/Button"; // Assuming you have a custom Button component

const API_URL = "http://localhost:5000/api/signup"; // Change API URL accordingly

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false); // State to track the loading status
  const navigate = useNavigate();

  // Handles the form submission
  const onSubmit = async (data) => {
    setLoading(true); // Start loading when the form is submitted

    // Basic validation for empty fields
    if (!data.username || !data.email || !data.password) {
      alert("Username, email, and password are required");
      setLoading(false); // Stop loading if validation fails
      return;
    }

    try {
      // Sending signup request to the backend with username, email, and password
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,  // Including username in the request
          email: data.email,
          password: data.password,
        }),
      });

      // If the signup request is successful
      if (response.ok) {
        const result = await response.json();
        console.log("Signup successful:", result);

        // Optionally handle token storage (if returned by backend)
        if (result.token) {
          localStorage.setItem("authToken", result.token); // Store token
          navigate("/dashboard"); // Redirect to the dashboard after successful signup
        } else {
          alert("Signup successful but no token received. Please try logging in.");
        }
      } else {
        // Handling errors from the server
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create an account");
      }
    } catch (error) {
      setLoading(false); // Stop loading after error
      console.error("Signup failed:", error);
      alert("Signup failed: " + error.message); // Show error message to the user
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]"><img src="data:image/png;base64,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"/></span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Create an Account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {/* Form to handle user input */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="space-y-5">
            {/* Username input field */}
            <Input
              label="Username: "
              placeholder="Enter your username"
              type="text"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters long",
                },
              })}
            />
            {errors.username && <span className="text-red-500">{errors.username.message}</span>}

            {/* Email input field */}
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}

            {/* Password input field */}
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
                  message: "Password must include one letter, one number, and one special character.",
                },
              })}
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}

            {/* Submit button */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
