import React, { createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(Number(localStorage.getItem('role')));
  const [account, setAccount] = useState(localStorage.getItem('account') || "");
  const [accountid, setAccountId] = useState(Number(localStorage.getItem('accountid')) || "");
  const [selectedDepid, setSelectedDepid] = React.useState();
  const [keep, setKeep] = useState(localStorage.getItem('keep') === "1");

  const login = async (jwtToken, accountid, role, account) => {
    setRole(role);
    setToken(jwtToken);
    setAccount(account);
    setAccountId(accountid);
    localStorage.setItem('keep', keep ? 1 : 0);

    if (keep) {
      localStorage.setItem('role', role);
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('account', account);
      localStorage.setItem('accountid', accountid);
    }
  };

  const logout = () => {
    setRole(null);
    setToken(null);
    setAccount(null);
    setAccountId(null);
    localStorage.clear()
  };

  const value = {
    token,
    role,
    accountid,
    account,
    login,
    logout,
    setKeep,
    selectedDepid, setSelectedDepid
  };

  return <AuthContext.Provider value={value} {...props} />;
}

export { AuthContext, AuthProvider };