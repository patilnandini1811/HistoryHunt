import axios from "axios";

const API_KEY = "AIzaSyAmFwni2OOgPqMo0LZxEVcC6vtqjqsJonY";
const url = `https://historyhuntapp-64249-default-rtdb.europe-west1.firebasedatabase.app/`;

const authenticate = async (mode, email, password) => {
  const res = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );
  return res.data.idToken;
};

export const signupUser = async (email, password) => {
  return await authenticate("signUp", email, password);
};

export const signinUser = (email, password) => {
  return authenticate("signInWithPassword", email, password);
};

export const updateUser = async (displayName, idToken) => {
  const resp = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
    {
      idToken,
      displayName,
      returnSecureToken: true,
    }
  );

  /*   console.log('http name', resp.data.localId) */
  return resp.data.localId;
};

export const getUser = async (idToken) => {
  const payload = {
    idToken: idToken,
  };
  try {
    const resp = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
      payload
    );
    return resp.data.users;
  } catch (error) {
    console.error("user data at http", error.message);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${url}/users.json`);
    return res.data;
  } catch (error) {
    console.error("Error during getAllUsers", error.message);
    throw error;
  }
};

export const getHunts = async () => {
  try {
    const res = await axios.get(`${url}/hunts.json`);
    return res.data;
  } catch (error) {
    console.error("Error during getHunts", error.message);
    throw error;
  }
};

export const saveUsers = async (user) => {
  try {
    await axios.post(`${url}/users.json`, user);
  } catch (error) {
    console.error("Error during saveUsers", error.message);
    throw error;
  }
};

export const saveHunt = async (hunt) => {
  try {
    await axios.post(`${url}/hunts.json`, hunt);
  } catch (error) {
    console.error(
      "Error during saveHunts",
      error.response?.data || error.message
    );
    throw error;
  }
};
