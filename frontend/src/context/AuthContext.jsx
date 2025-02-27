import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../service/api";

const AuthContext = createContext();

export const AuthProvider =  ({ children }) => {
  const [loading, setLoading] = useState();
  const [user, setUser] = useState({});

  useEffect(() => {
    setLoading(true);

    const fetchUser = async () => {
      if (localStorage.getItem("token") == null) {
        return;
      }
      try {
      const token = localStorage.getItem("token");
       const res = await api.get("/auth/user", {
          headers: {
           Authorization: `Bearer ${token}`,
          },
         });
   
         setUser({
          name: res.data.name,
          email: res.data.email,
          connectedWithGoogle: res.data.connectedWithGoogle,
        _id: res.data._id,
         });
      } catch (error) {
       // localStorage.removeItem("token");
        console.log(error);

      }
    };

    fetchUser();
    setLoading(false);
  }, [localStorage.getItem("token")]);

  const signOut = () => {
    localStorage.removeItem("token");
    setUser({});
  };

  return (
    <AuthContext.Provider value={{ user, signOut, loading }}>
      {loading ? "Loading" : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
