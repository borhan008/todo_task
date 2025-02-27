import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../service/api";

const AuthContext = createContext();

export const AuthProvider =  ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    setLoading(true);

    const fetchUser = async () => {
      if ( localStorage.getItem("token") == null) {
        setLoading(false);
        return;
      }
      try {
      const token =  localStorage.getItem("token");
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
       // localStorage.removeItem("token");
        console.log(error);
        setLoading(false);

      }
    };

    fetchUser();
 
  }, [localStorage.getItem("token")]);



  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading ? "Loading" : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
