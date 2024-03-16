const TOKEN_KEY = 'xinmiaotoken';

const isLogin = () => {
  console.log('ahhahah');

  return localStorage.getItem(TOKEN_KEY);
};

const getToken = () => {
  console.log('拿token');
  return localStorage.getItem(TOKEN_KEY);
};

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const clearToken = () => {
  console.log('清除');
  localStorage.removeItem(TOKEN_KEY);
};

export { isLogin, getToken, setToken, clearToken };
