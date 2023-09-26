import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { createTable, getCollection } from "../database/sqlite.service";

export const appContext = createContext();

const Context = ({ children }) => {
  const [items, setItems] = useState([]);
  const [collection, setCollection] = useState([]);
  const [reflesh, setReflesh] = useState(0);
  const { data, isLoading, error } = useFetch("Items", "");

  const getCollectionItems = async () => {
    let col = await getCollection();
    let _col = [];
    col.map((id) => {
      _col.push(id.itemId);
    });

    setCollection(_col);
  };

  useEffect(() => {
    createTable();
  }, []);

  useEffect(() => {
    setItems(data);
    getCollectionItems();
  }, [reflesh, data]);

  return (
    <appContext.Provider
      value={{ items, isLoading, error, collection, reflesh, setReflesh }}
    >
      {children}
    </appContext.Provider>
  );
};

export default Context;
