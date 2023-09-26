import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export const appContext = createContext();

const Context = ({ children }) => {
  const [items, setItems] = useState([]);
  const { data, isLoading, error } = useFetch("Items", "");

  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <appContext.Provider value={{ items, isLoading, error }}>
      {children}
    </appContext.Provider>
  );
};

export default Context;
