import "./FilterProducts.scss";

import { Breadcrumbs } from "../../../shared/components";
import { Header } from "../../../shared/Layouts";
import { FilterProductsList, WidgetFilterProducts } from "../../components";

const FilterProducts = (props) => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Header */}

      {/* BreadCrumbs */}
      <Breadcrumbs
        currentPage="Categories"
        nextPages={[{ title: "Home", link: "/" }]}
      />
      {/* BreadCrumbs */}

      <div className="filter-products">
        <div className="container">
          <div className="row">
            {/* Widgets */}
            <div className="col-3">
              <WidgetFilterProducts />
            </div>
            {/* Widgets */}

            <div className="col-9">
              <FilterProductsList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterProducts;
