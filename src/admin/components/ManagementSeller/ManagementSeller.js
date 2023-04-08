import { memo, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";

import "./ManagementSeller.scss";
import "../DataTable/DataTable.scss";

import { Navbar } from "../";
import { useSellerApis } from "../../../apis/seller/seller-admin.api";
import { LoadingSpinner } from "../../../shared/components";
import { userColumns } from "../../pages/ManagementSellerPage/data/data_sellers";

const ManagementSeller = () => {
  const { getAllSellers } = useSellerApis();

  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    const fetchSeller = async () => {
      setIsLoading(true);
      try {
        const response = await getAllSellers();

        setSellers(response);
      } catch (err) {
        toast.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSeller();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="management-seller">
      <Navbar />

      {isLoading && <LoadingSpinner option1 />}

      {!isLoading && (
        <div className="data-table">
          <DataGrid
            rows={sellers}
            columns={userColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      )}
    </div>
  );
};

export default memo(ManagementSeller);
