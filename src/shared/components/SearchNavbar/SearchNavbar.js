import {
  faMagnifyingGlass,
  faList,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonFields } from "../../FormElement";

import "./SearchNavbar.scss";

const SearchNavbar = () => {
  return (
    <form className="search-navbar">
      <div className="search-navbar__group">
        <input
          id="name"
          className="search-navbar__input"
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
        <select id="categories" className="search-navbar__input">
          <option selected disabled>
            Categories
          </option>

          <option value="none">Electronics</option>
          <option value="none">Vehicle</option>
          <option value="none">Mobiles</option>
          <option value="none">Furniture</option>
          <option value="none">Fashion</option>
        </select>
      </div>

      <div className="search-navbar__group">
        <label htmlFor="location" className="search-navbar__label">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="search-navbar__icon"
          />
        </label>
        <select id="location" className="search-navbar__input">
          <option selected disabled>
            Location
          </option>
          <option value="none">New York</option>
          <option value="none">California</option>
          <option value="none">Washington</option>
          <option value="none">Birmingham</option>
        </select>
      </div>

      <div className="search-navbar__group">
        <ButtonFields primary className="search-navbar__btn">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span>Search</span>
        </ButtonFields>
      </div>
    </form>
  );
};

export default SearchNavbar;
