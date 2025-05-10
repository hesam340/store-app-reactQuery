const setCookie = (token) => {
  document.cookie = `token=${token};max-age=${5 * 24 * 60 * 60}`;
};

const getCookie = () => {
  return document.cookie.split("=")[1];
}

const deleteCookie = () => {
  document.cookie = `token='';max-age=0`;
};

export { setCookie, getCookie };
