import { memo, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";

import "./ManagementSeller.scss";
import "../DataTable/DataTable.scss";
import "./ModalSellerDetail.scss";

import { useSellerApis } from "../../../apis/seller/seller-admin.api";
import { LoadingSpinner } from "../../../shared/components";
import { userColumns } from "../../pages/ManagementSellerPage/data/data_sellers";
import { ButtonFields } from "../../../shared/FormElement";
import ModalSellerDetail from "./ModalSellerDetail";

const ManagementSeller = () => {
  const { getAllSellers } = useSellerApis();

  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [selectRowId, setSelectedRowId] = useState(null);

  const actionColumns = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <ButtonFields
              onClick={() => {
                setShowModal(true);
                setSelectedRowId(params.id);
              }}
              subPrimary
              className="management-seller__btn"
            >
              View Detail
            </ButtonFields>
          </>
        );
      },
    },
  ];

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
      {isLoading && <LoadingSpinner option1 />}

      {!isLoading && (
        <div className="data-table">
          <DataGrid
            rows={sellers}
            columns={userColumns.concat(actionColumns)}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
      )}

      {!!selectRowId && (
        <ModalSellerDetail
          sellerId={selectRowId}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default memo(ManagementSeller);
