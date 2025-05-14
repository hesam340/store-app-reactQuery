const setCookie = (token) => {
  document.cookie = `token=${token};path=/`;
};

const getCookie = () => {
  return document.cookie.split("=")[1];
};

const deleteCookie = () => {
  document.cookie = `token='';max-age=0`;
};

export { setCookie, getCookie };
