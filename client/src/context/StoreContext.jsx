import { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [selectedStore, setSelectedStore] = useState(null);

  return (
    <StoreContext.Provider value={{ selectedStore, setSelectedStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
