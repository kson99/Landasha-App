import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { createTable, getCollection } from "../database/sqlite.service";
import axios from "axios";

export const appContext = createContext();
export const url = "https://perfect-cuff-links-lamb.cyclic.cloud/landasha/";

const Context = ({ children }) => {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
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

  const getUsers = async () => {
    await axios.get(url + "/Users").then((res) => {
      setUsers(res.data);
    });
  };

  useEffect(() => {
    createTable();
  }, []);

  useEffect(() => {
    setItems(data);
    getUsers();
    getCollectionItems();
  }, [reflesh, data]);

  return (
    <appContext.Provider
      value={{
        items,
        isLoading,
        error,
        collection,
        reflesh,
        setReflesh,
        users,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default Context;
