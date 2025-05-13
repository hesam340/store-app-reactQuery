const setCookie = (token) => {
  document.cookie = `token=${token};max-age=${1 * 24 * 60 * 60};path=/`;
};

const getCookie = () => {
  return document.cookie.split("=")[1];
}

const deleteCookie = () => {
  document.cookie = `token='';max-age=0`;
};

export { setCookie, getCookie };
