import { useFetchProductsQuery } from "../../../redux/apis/admin/product/product.api";
import { DataGrid } from "@mui/x-data-grid";

import { Skeleton } from "../../../shared/components";
import { userColumns } from "../../pages/ManagementProductPage/data/column_data_product";

const ManagementProduct = () => {
  const listProducts = useFetchProductsQuery();

  if (listProducts.isFetching) {
    return (
      <div className="container">
        <Skeleton times={6} style={{ height: "7rem", width: "100%" }} />
      </div>
    );
  } else if (listProducts.isError) {
    return <div>Something went wrong</div>;
  } else {
    return (
      <div className="management-product">
        <div className="data-table">
          <DataGrid
            rows={listProducts.data}
            columns={userColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
      </div>
    );
  }
};

export default ManagementProduct;
