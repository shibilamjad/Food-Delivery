import { createContext, useContext, useState } from "react";

export const MenuUpdateContext = createContext();

function MenuUpdateProvider({ children }) {
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  return (
    <MenuUpdateContext.Provider
      value={{
        // onEditMovie,
        isEditing,
        selectedMenuId,
        setIsEditing,
        setSelectedMenuId,
        selectedMenu,
        setSelectedMenu,
      }}
    >
      {children}
    </MenuUpdateContext.Provider>
  );
}
function useMenuUpdateContext() {
  const context = useContext(MenuUpdateContext);
  if (!context) {
    throw new Error("useMenuUpdae must be used with a MenuUpdateProvider");
  }
  return context;
}
export { MenuUpdateProvider, useMenuUpdateContext };
