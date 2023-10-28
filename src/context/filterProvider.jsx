/* eslint-disable react/prop-types */
import PropTypes from 'prop-types'
import {  useState } from "react";
import { filterContext } from "./constant";

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

export default FilterProvider

FilterProvider.propTypes= {
children : PropTypes.arrayOf(PropTypes.element).isRequired
}