import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("landasha.db");

const createTable = () => {
  db.transaction((txn) => {
    txn.executeSql("CREATE TABLE IF NOT EXISTS Collection (itemId TEXT)");
  });
};

const getCollection = () => {
  return new Promise((resolve, reject) => {
    db.transaction((trns) => {
      trns.executeSql(
        "SELECT * FROM Collection",
        null,
        (txObj, { rows: { _array } }) => {
          resolve(_array);
        },
        (err) => {
          console.log("getting collection failed: ");
          reject(err);
        }
      );
    });
  });
};

const addToCollection = (itemId) => {
  db.transaction((trns) => {
    trns.executeSql(
      "INSERT INTO Collection (itemId) VALUES (?)",
      [itemId],
      (res) => console.log("Added item"),
      (err) => console.log("Failed")
    );
  });
};

const removeItem = (itemId) => {
  db.transaction((trans) => {
    trans.executeSql(
      "DELETE FROM Collection WHERE itemId = ?",
      [itemId],
      (res) => console.log("Removed item"),
      (err) => console.log("Failed")
    );
  });
};

export { createTable, getCollection, addToCollection, removeItem };
