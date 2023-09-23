import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db");

export const initializeImagesDBAsync = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY NOT NULL, imageUri TEXT);`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

export const insertImageAsync = (profileImage) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO images (imageUri) VALUES (?)`,
        [profileImage.imageUri],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

export const getImageUriFromDatabase = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT imageUri FROM images ORDER BY id DESC LIMIT 1`,
        [],
        (_, result) => {
          if (result.rows.length > 0) {
            resolve(result.rows.item(0).imageUri);
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};
// save image 
export const updateImageAsync = (id, newImageUri) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE images SET imageUri = ? WHERE id = ?`,
        [newImageUri, id],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

export const deleteAllImagesAsync = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM images`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};