import Cookies from 'universal-cookie/es6';

const cookies = new Cookies();

const setToken = () => {
  const token = window.location.href;
  const splitedToken1 = token.split('=');
  if (!!splitedToken1[2]) {
    const splitedToken2 = splitedToken1[2].split(',');
    const TOKEN = splitedToken2[0];
    cookies.set('TOKEN', TOKEN, { path: '/' });
  }
};

const getToken = () => {
  const TOKEN = cookies.get('TOKEN');

  if (!!TOKEN) return true;
  else return false;
};

const getEmail = () => {
  const TOKEN = cookies.get('TOKEN');

  if (!!TOKEN) {
    const objectToken = ParseJwt(TOKEN);
    const email = objectToken.sub;
    return email;
  }
};

const getId = () => {
  const TOKEN = cookies.get('TOKEN');

  if (!!TOKEN) {
    const objectToken = ParseJwt(TOKEN);
    const id = objectToken.userID;
    return id;
  }
};
const deleteToken = () => {
  cookies.set('TOKEN', '', -1);
};

function ParseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}

export { ParseJwt, getToken, getEmail, setToken, deleteToken, getId };
