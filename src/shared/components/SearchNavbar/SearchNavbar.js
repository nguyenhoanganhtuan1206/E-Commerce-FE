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
        <select
          id="categories"
          className="search-navbar__input"
          defaultValue="Vehicle"
        >
          <option value="Electronics">Electronics</option>
          <option value="Vehicle">Vehicle</option>
          <option value="Mobiles">Mobiles</option>
          <option value="Furniture">Furniture</option>
          <option value="Fashion">Fashion</option>
        </select>
      </div>

      <div className="search-navbar__group">
        <label htmlFor="location" className="search-navbar__label">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="search-navbar__icon"
          />
        </label>
        <select
          id="categories"
          className="search-navbar__input"
          defaultValue="Vehicle"
        >
          <option value="Electronics">Electronics</option>
          <option value="Vehicle">Vehicle</option>
          <option value="Mobiles">Mobiles</option>
          <option value="Furniture">Furniture</option>
          <option value="Fashion">Fashion</option>
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
