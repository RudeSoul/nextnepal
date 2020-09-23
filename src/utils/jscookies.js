import Cookies from "js-cookie";

/**
 * Location Info
 * It consist of latitude, longitude and address
 */

//  set locantion info
export const setCookieLocationInfo = (locationInfo) => {
  let value = JSON.stringify(locationInfo);
  Cookies.set("locationInfo", value, { expires: 30 });
};

//  get locantion info
export const getCookieLocationInfo = () => {
  let value = Cookies.get("locationInfo");
  if (value) return JSON.parse(value);
  return value;
};

//  remove locantion info
export const removeCookieLocationInfo = () => {
  Cookies.remove("locationInfo");
};

/**
 * Account User
 */

//  set account info
export const setCookieaccountinfo = (accountinfo) => {
  let value = JSON.stringify(accountinfo);
  Cookies.set("accountinfo", value, { expires: 30 });

  console.log("jsCookie:->", Cookies.get());
};

//  get account info
export const getCookieaccountinfo = () => {
  let value = Cookies.get("accountinfo");

  if (value) return JSON.parse(value);
  return value;
};

//  remove account info
export const removeCookieaccountinfo = () => {
  Cookies.remove("accountinfo");
};

/**
 * Account User
 */

//  set account info
export const setCookieCart = (cart) => {
  let value = JSON.stringify(cart);
  Cookies.set("cart", value, { expires: 30 });
};

//  get account info
export const getCookieCart = () => {
  let value = Cookies.get("cart");
  if (value) return JSON.parse(value);
  return value;
};

//  remove account info
export const removeCookieCart = () => {
  Cookies.remove("cart");
};
