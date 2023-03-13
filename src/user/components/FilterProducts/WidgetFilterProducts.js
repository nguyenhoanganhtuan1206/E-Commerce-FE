import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./WidgetFilterProducts.scss";

const WidgetFilterProducts = () => {
  return (
    <div className="widget-filters">
      <div className="widget-filters__components">
        <h3 className="widget-filters__heading">Search Ads</h3>

        <form className="widget-filters__form">
          <input
            className="widget-filters__input"
            placeholder="Search Here..."
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
          <li className="widget-filters__item widget-filters__item--active">
            All items
          </li>

          <li className="widget-filters__item">Hotels & Travels</li>

          <li className="widget-filters__item">Hotels & Travels</li>

          <li className="widget-filters__item">Hotels & Travels</li>
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
  );
};

export default WidgetFilterProducts;
