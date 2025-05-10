import { createContext, useContext, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => {
  const { user, setUser } = useContext(UserContext);
  return { user, setUser };
};

export default UserProvider;
export { useUser };
