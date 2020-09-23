import { instance } from "./instance";
import { getCookieaccountinfo } from "../jscookies";

// login
export const loginAccounts = async (email, password, address) => {
  let acc;

  await instance
    .post("login", {
      accessToken: null,
      address: address || null,
      email: email || null,
      name: null,
      password: password || null,
      phone: null,
      provider: null,
    })
    .then((data) => {
      acc = data.data;
      console.log(acc);
    })
    .catch((err) => {
      alert(err);
    });

  return acc;
};

// Register
export const registerAccounts = async (email, password, phone, name) => {
  let acc;

  await instance
    .post("register", {
      email: email || null,
      name: name,
      password: password,
      phone: phone,
    })
    .then((data) => {
      acc = data.data;
    })
    .catch((err) => {
      alert(err);
    });

  return acc;
};

// getUserInfo
export const getUserInfo = async () => {
  let getAccounts = getCookieaccountinfo();
  let user;

  if (getAccounts && getAccounts.success) {
    await instance
      .post("update-user-info", {
        token: getAccounts.data.auth_token,
        user_id: getAccounts.data.id,
      })
      .then((data) => {
        user = data.data;
      })
      .catch((err) => {
        alert(
          "Error: Sorry cannot get your user info. Please contact our technical support!"
        );
      });
  }

  return user;
};
