import { createContext, useEffect, useState } from "react";
import { createTable, getCollection } from "../database/sqlite.service";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../database/firebase.service";

export const appContext = createContext();
export const url = "https://perfect-cuff-links-lamb.cyclic.cloud/landasha/";
export const subCategories = [
  "Accessories",
  "Clothing",
  "Housing",
  "Computers",
  "Phones",
  "Gaming",
  "Electronics",
  "Vehicles",
  "Others",
];

const Context = ({ children }) => {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [collection, setCollection] = useState([]);
  const [reflesh, setReflesh] = useState(0);
  const [dbReflesh, setDbReflesh] = useState(0);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
      let _user = users.find(({ userUid }) => userUid === user.uid);
      if (_user) {
        setUser(_user);
      }
    } else {
      setLoggedIn(false);
    }
  });

  const getData = async () => {
    setIsLoading(true);

    try {
      await axios.get(url + "/Items").then((res) => {
        setItems(res.data);
      });

      await axios.get(url + "/Users").then((res) => {
        setUsers(res.data);
      });
    } catch (error) {
      setError(true);
    }

    setIsLoading(false);
  };

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
    getData();
  }, [reflesh]);

  useEffect(() => {
    getCollectionItems();
  }, [dbReflesh]);

  return (
    <appContext.Provider
      value={{
        items,
        isLoading,
        error,
        collection,
        reflesh,
        dbReflesh,
        setReflesh,
        setDbReflesh,
        users,
        user,
        loggedIn,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default Context;
