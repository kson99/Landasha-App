import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { createTable, getCollection } from "../database/sqlite.service";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../database/firebase.service";

export const appContext = createContext();
export const url = "https://perfect-cuff-links-lamb.cyclic.cloud/landasha/";

const Context = ({ children }) => {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userUid, setUserUid] = useState("");
  const [collection, setCollection] = useState([]);
  const [reflesh, setReflesh] = useState(0);

  const { data, isLoading, error } = useFetch("Items", "");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
      setUserUid(user.uid);

      let _user = users.find(({ userUid }) => userUid === user.uid);
      if (_user) {
        setUser(_user);
      }
    } else {
      setLoggedIn(false);
    }
  });

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
        user,
        loggedIn,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default Context;
