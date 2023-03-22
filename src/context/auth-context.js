import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext();

/* To store timeout expiration time */
let logoutTimer;

const AuthProvider = (props) => {
  const { children } = props;

  const [user, setUser] = useState({});
  const [roles, setRoles] = useState([]);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const handleLogin = useCallback((user, expirationDate) => {
    setUser(user);

    /* If we already stored expiration time ,
    => expiration date will not be create new time  */
    const tokenExpirationTime =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        token: user.token,
        userId: user.userId,
        username: user.username,
        roles: user.roles,
        expiration: tokenExpirationTime.toISOString(),
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = useCallback(() => {
    setUser({});
    /* Because we have old expiration date -> we need to clear it */
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  /* Check expire time and auto logout */
  useEffect(() => {
    if (user.token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();

      logoutTimer = setTimeout(handleLogout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [user.token, handleLogout, tokenExpirationDate]);

  /* Handle auto login when reload page */
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      handleLogin(storedData, new Date(storedData.expiration));
    }
  });
  /* Handle auto login when reload page */

  /*  Check roles */
  useEffect(() => {
    if (!!user.roles && user.token) {
      setRoles([]);
      user.roles.map((role) => setRoles((prev) => [...prev, role.name]));
    }
  }, [user.token, user.roles]);

  /* To send context */
  const containsValue = {
    isLoggedIn: !!user.token,
    token: user.token,
    userId: user.userId,
    username: user.username,
    roles: roles,
    login: handleLogin,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={containsValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
