import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in by looking for the authToken in localStorage
    const token = localStorage.getItem("authToken");
    if (!token) {
      // If no token found, redirect to login page
      navigate("/login");
    } else {
      // Fetch user data (for example, from an API) if logged in
      fetchUserData(token);
    }
  }, [navigate]);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/api/user", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <div className="w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        {user ? (
          <>
            <h2 className="text-center text-2xl font-bold">Welcome, {user.username}</h2>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Your Shipments</h3>
              {/* You can display tracking information here */}
              <div className="mt-3">
                <p>Your current shipments will be shown here.</p>
                {/* Add dynamic shipment data here */}
              </div>
            </div>
            <div className="mt-6 text-center">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <p>Welcome to the DashBoard</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;












