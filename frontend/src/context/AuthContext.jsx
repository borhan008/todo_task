import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../service/api";
import Loading from "../pages/Loading";
const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const fetchUser = async () => {
    if (localStorage.getItem("token") == null) {
      setLoading(false);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await setUser({
        name: res.data.name,
        email: res.data.email,
        connectedWithGoogle: res.data.connectedWithGoogle,
        _id: res.data._id,
      });
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      localStorage.removeItem("token");
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);

    fetchUser();
  }, [localStorage.getItem("token")]);

  const signOut = () => {
    localStorage.removeItem("token");
    setUser({});
  };

  const signIn = (token) => {
    localStorage.setItem("token", token);
    fetchUser();
  };

  return (
    <AuthContext.Provider
      value={{ user, setLoading, loading, signOut, signIn }}
    >
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
// Dummy comment for updating in github