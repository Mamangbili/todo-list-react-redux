/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const filterContext = createContext();

const FilterProvider = ({ children }) => {
  const [filterState, setFilterState] = useState("ALL");

  return (
    <>
      <filterContext.Provider value={{ filterState, setFilterState }}>
        {children}
      </filterContext.Provider>
    </>
  );
};

const useFilter = () => {
  const context = useContext(filterContext);
  return context;
};

export { FilterProvider, useFilter };
