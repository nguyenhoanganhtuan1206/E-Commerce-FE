import "./FilterProducts.scss";

import { Breadcrumbs } from "../../../shared/components";
import { Header } from "../../../shared/Layouts";
import { FilterProductsList, WidgetFilterProducts } from "../../components";
import { memo } from "react";

const FilterProducts = (props) => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Header */}

      {/* BreadCrumbs */}
      <Breadcrumbs title="Categories" nextPages={["Home"]} />
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

export default memo(FilterProducts);
