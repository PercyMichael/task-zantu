import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/", {
          withCredentials: true, // Ensure cookies are sent for Sanctum authentication
        });
        setUserData(response.data); // Store the data in state
      } catch (error) {
        // Check for error responses and set a more detailed error message
        console.error(error); // Log the error to the console for debugging
        if (error.response) {
          // If there's a response error (e.g., 400 or 500)
          setError(error.response?.data?.message || "Server error occurred");
        } else if (error.request) {
          // If no response was received
          setError("No response from server");
        } else {
          // If the error was triggered while setting up the request
          setError(error.message || "An unknown error occurred");
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="App">
      <h1>Laravel Sanctum Authentication</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {userData ? (
        <div>
          <h2>{userData.message}</h2>
          <p>
            <strong>Status:</strong> {userData.status}
          </p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default App;
