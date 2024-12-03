import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import { getRequest } from "../utils/services";

interface UserContextType {
  token: string | null;
  isAuthenticated: boolean;
  user: {
    userId: string;
    userName: string;
    email: string;
    image: string;
  } | null;
  login: (token: string) => void;
  logout: () => void;
}

const defaultUserContext: UserContextType = {
  token: null,
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType | undefined>(
  defaultUserContext
);

export const useUserContext = () => useContext(UserContext);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("userToken")
  );
  const [user, setUser] = useState<{
    userId: string;
    userName: string;
    email: string;
    image: string;
  } | null>(null);

  const getUserData = async (token: string) => {
    const response = await getRequest("/userdata", "GET", {
      Authorization: `Bearer ${token}`, // Pass the token in the headers
    });

    if (response.error) {
      console.error("Error fetching user data:", response.message);
      return null;
    }

    return response;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        const userData = await getUserData(token);
        if (userData) {
          setUser({
            userId: userData._id,
            userName: userData.username,
            email: userData.email,
            image: userData.image,
          });
        }
      }
    };

    fetchUserData();
  }, [token]);

  // Login function to store token in localStorage and context
  const login = (newToken: string) => {
    localStorage.setItem("userToken", newToken);
    setToken(newToken);
  };

  // Logout function to clear token from localStorage and context
  const logout = () => {
    localStorage.removeItem("userToken");
    setToken(null);
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        token,
        isAuthenticated: !!token, // If token exists, user is authenticated
        user,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
};
