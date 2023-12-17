import "./WidgetFilterProducts.scss";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useThunk from "../../../shared/hooks/useThunk";
import { fetchCategories } from "../../../redux/thunks/categories/categoriesThunk";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import { LoadingSpinner } from "../../../shared/components";
import {
  updateSearchCategory,
  updateSearchInput,
} from "../../../redux/slices/user/filterProduct/filterProductSlice";

const WidgetFilterProducts = () => {
  const dispatch = useDispatch();
  const [doFetchCategories] = useThunk(fetchCategories);

  const productsState = useSelector((state) => state.fetchAll);
  const filterProductState = useSelector((state) => state.filterProducts);

  useEffect(() => {
    doFetchCategories();
  }, [doFetchCategories]);

  const handleUpdateSearchInput = (e) => {
    dispatch(updateSearchInput(e.target.value));
  };

  const handleSelectCategory = (categoryName) => {
    dispatch(updateSearchCategory(categoryName));
  };

  return (
    <>
      {productsState.categories.isLoading && <LoadingSpinner option1 />}

      {!productsState.categories.isLoading && (
        <div className="widget-filters">
          <div className="widget-filters__components">
            <h3 className="widget-filters__heading">Search Ads</h3>

            <form className="widget-filters__form">
              <input
                className="widget-filters__input"
                placeholder="Search Here..."
                onChange={(e) => handleUpdateSearchInput(e)}
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="widget-filters__icon"
              />
            </form>
          </div>

          <div className="widget-filters__components">
            <h3 className="widget-filters__heading">All Categories</h3>

            <ul className="widget-filters__list">
              <li
                className={`widget-filters__item ${
                  !filterProductState.searchCategory &&
                  "widget-filters__item--active"
                }`}
                onClick={() => handleSelectCategory("")}
              >
                All items
              </li>

              {productsState.categories.data.map((categoryItem, index) => (
                <Fragment key={index}>
                  <li
                    className={`widget-filters__item ${
                      categoryItem.categoryName ===
                        filterProductState.searchCategory &&
                      "widget-filters__item--active"
                    }`}
                    key={index}
                    onClick={() =>
                      handleSelectCategory(categoryItem.categoryName)
                    }
                  >
                    {categoryItem.categoryName}
                  </li>
                </Fragment>
              ))}
            </ul>
          </div>

          <div className="widget-filters__components">
            <h3 className="widget-filters__heading">Price Range</h3>

            <ul className="widget-filters__list">
              <li className="widget-filters__item widget-filters__item--active">
                All Prices
              </li>

              <li className="widget-filters__item">$10 - $50</li>

              <li className="widget-filters__item">$10 - $50</li>

              <li className="widget-filters__item">$10 - $50</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default WidgetFilterProducts;
