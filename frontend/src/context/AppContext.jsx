import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(localStorage.getItem("user"));

  async function getUser() {
    try {
      const res = await axios.get("http://127.0.0.1:80/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      });

      setUser(res.data);
    } catch (error) {
      console.error(
        "Error fetching user:",
        error.response ? error.response.data : error
      );
    }
  }

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  return (
    <AppContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
