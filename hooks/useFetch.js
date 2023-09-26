import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (endpoint, userUid) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [count, setCount] = useState();

  const options = {
    method: "GET",
    url: `https://perfect-cuff-links-lamb.cyclic.cloud/landasha/${endpoint}${userUid}`,
  };

  const getData = async () => {
    setIsLoading(true);
    var count;

    try {
      const response = await axios.request(options);
      setData(response.data);
      setCount(response.data.length);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      // alert("An error occured");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, isLoading, error, count };
};

export default useFetch;
