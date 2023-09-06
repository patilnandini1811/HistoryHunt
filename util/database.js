import * as SQLite from "expo-sqlite";

import Place from "../models/Place";



const db = SQLite.openDatabase("places.db");

export const initializeDBAsync = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places(
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }

      )

    })
  })
  return promise;
}

export const insertPlaceAsync = (place) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          console.log(result)
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }

      )

    })
  })
  return promise;
}

export const getAllPlacesAsync = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          const allPlaces = result.rows._array.map((dp) => {

            return new Place(
              dp.title,
              dp.imageUri,
              {
                address: dp.address,
                lat: dp.lat,
                lng: dp.lng,
              },
              dp.id
            );
          })
          resolve(allPlaces);
        },
        (_, error) => {
          reject(error);
        }

      )

    })
  })
  return promise;
}

export const deleteAllPlacesAsync = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM places`,
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
  console.log('Inserting image:', profileImage); // Log the image being inserted
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO images (imageUri) VALUES (?)`,
        [profileImage.imageUri],
        (_, result) => {
          console.log("result from insert", result);
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
        `SELECT imageUri FROM images ORDER BY id DESC LIMIT 1`, // Get the latest inserted image
        [],
        (_, result) => {
          if (result.rows.length > 0) {
            resolve(result.rows.item(0).imageUri);
          }/*  else {
            reject('No image found for the given user.', );
          } */
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
