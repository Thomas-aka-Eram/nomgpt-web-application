import React, { createContext, useState, useContext, ReactNode } from "react";

interface UserContextType {
  user: { username: string; email: string } | null;
  isAuthenticated: boolean;
  login: (userData: { username: string; email: string }) => void;
  logout: () => void;
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const defaultUserContext: UserContextType = {
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  showModal: false,
  openModal: () => {},
  closeModal: () => {},
};

interface MyComponentProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType | undefined>(
  defaultUserContext
);

export const useUserContext = () => useContext(UserContext);

export const UserProvider: React.FC<MyComponentProps> = ({ children }) => {
  const [user, setUser] = useState<{ username: string; email: string } | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  const login = (userData: { username: string; email: string }) => {
    setUser(userData);
    setShowModal(false); // Close modal after login
  };

  const logout = () => setUser(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        showModal,
        openModal,
        closeModal,
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
