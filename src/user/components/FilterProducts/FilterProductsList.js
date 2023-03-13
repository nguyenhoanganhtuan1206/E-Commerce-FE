import { CardProduct } from "../../../shared/components";

const FilterProductsList = (props) => {
  return (
    <div className="filter-products__list">
      <div className="row">
        <div className="col-4">
          <CardProduct />
        </div>

        <div className="col-4">
          <CardProduct />
        </div>

        <div className="col-4">
          <CardProduct />
        </div>

        <div className="col-4">
          <CardProduct />
        </div>

        <div className="col-4">
          <CardProduct />
        </div>

        <div className="col-4">
          <CardProduct />
        </div>
      </div>
    </div>
  );
};

export default FilterProductsList;
