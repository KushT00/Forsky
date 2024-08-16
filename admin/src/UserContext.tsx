import React, { createContext, useContext, useEffect, useState } from 'react';
// import jwt_decode from 'jwt-decode';
import { jwtDecode } from "jwt-decode";

interface UserContextType {
  username: string | null;
  fetchUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);

  const fetchUserData = async () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken=  jwtDecode(token);
      const user_id = decodedToken.user_id;

      try {
        const response = await fetch(`http://localhost:3000/api/users/${user_id}`);
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
        } else {
          console.error("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      console.log("No token found in local storage.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ username, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
