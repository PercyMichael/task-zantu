import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const headersList = {
      Accept: "*/*",
      "Access-Control-Allow-Origin": "*",
    };

    const reqOptions = {
      url: "http://localhost/api/",
      method: "GET",
      headers: headersList,
      withCredentials: false,
    };

    try {
      const response = await axios.request(reqOptions);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Hello {error}</div>;

  return (
    <div>
      <h1>Hello</h1>
      <h1>Fetched Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default App;
