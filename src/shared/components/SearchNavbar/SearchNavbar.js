import {
  faMagnifyingGlass,
  faList,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonFields } from "../../FormElement";

import "./SearchNavbar.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useThunk from "../../hooks/useThunk";
import { updateSearchInput } from "../../../redux/slices/user/filterProduct/filterProductSlice";
import { fetchCategories } from "../../../redux/thunks/categories/categoriesThunk";
import { useNavigate } from "react-router-dom";

const SearchNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [doFetchCategories] = useThunk(fetchCategories);

  const productsState = useSelector((state) => state.fetchAll);

  useEffect(() => {
    doFetchCategories();
  }, [doFetchCategories]);

  const handleUpdateSearchInput = (e) => {
    dispatch(updateSearchInput(e.target.value));
  };

  const handleOnClickSearch = () => {
    navigate("/search");
  };

  return (
    <form className="search-navbar">
      <div className="search-navbar__group">
        <input
          id="name"
          className="search-navbar__input"
          onChange={(e) => handleUpdateSearchInput(e)}
          placeholder="Product Keyword"
        />
        <label htmlFor="name" className="search-navbar__label">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="search-navbar__icon"
          />
        </label>
      </div>

      <div className="search-navbar__group">
        <label htmlFor="categories" className="search-navbar__label">
          <FontAwesomeIcon icon={faList} className="search-navbar__icon" />
        </label>
        <select
          id="categories"
          className="search-navbar__input"
          defaultValue="Vehicle"
        >
          {productsState.categories.data.map((categoryItem, index) => {
            return (
              <option key={index} value={categoryItem.categoryName}>
                {categoryItem.categoryName}
              </option>
            );
          })}
        </select>
      </div>

      <div className="search-navbar__group">
        <ButtonFields
          onClick={handleOnClickSearch}
          primary
          className="search-navbar__btn"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span>Search</span>
        </ButtonFields>
      </div>
    </form>
  );
};

export default SearchNavbar;
