import "./FilterProducts.scss";

import { useState, useEffect } from "react";
import { Breadcrumbs } from "../../../shared/components";
import { Header } from "../../../shared/Layouts";
import { FilterProductsList, WidgetFilterProducts } from "../../components";
import { useSelector } from "react-redux";
import { useFilterProductApis } from "../../../apis/products/filterProducts.api";

const FilterProducts = () => {
  const filterProductState = useSelector((state) => state.filterProducts);
  const [products, setProducts] = useState([]);
  const { fetchProducts } = useFilterProductApis();

  useEffect(() => {
    const fetchProductsByTemp = async () => {
      try {
        if (filterProductState.searchTempInput) {
          const response = await fetchProducts({
            productName: filterProductState.searchTempInput,
            categoryName: filterProductState.searchCategory,
          });

          setProducts(response);
          console.log("response", response);
        }
      } catch (error) {}
    };
    fetchProductsByTemp();
  }, [filterProductState.searchTempInput, filterProductState.searchCategory]);

  return (
    <>
      <>
        {/* Header */}
        <Header />
        {/* Header */}

        {/* BreadCrumbs */}
        <Breadcrumbs
          currentPage="Product Filter"
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
                <FilterProductsList products={products} />
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default FilterProducts;
