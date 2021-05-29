import Cookies from "universal-cookie";

const cookies = new Cookies();
const AUTH_COOKIES = "token";

const setAuthCookies = (token) => {
  cookies.set(AUTH_COOKIES, token, { path: "/", maxAge: 1000000 });
};

const getAuthCookies = () => {
  return cookies.get(AUTH_COOKIES);
};

export const cookiesUtil = {
  setAuthCookies,
  getAuthCookies,
};