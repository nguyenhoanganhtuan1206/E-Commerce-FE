import { memo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import "./ManagementSeller.scss";
import "../DataTable/DataTable.scss";
import "./ModalSellerDetail.scss";

import ModalSellerDetail from "./ModalSellerDetail";
import { Skeleton } from "../../../shared/components";
import { userColumns } from "../../pages/ManagementSellerPage/data/data_sellers";
import { ButtonFields } from "../../../shared/FormElement";
import { useFetchListSellersQuery } from "../../../redux/apis/user/seller/seller-register.api";

const ManagementSeller = () => {
  const listSellers = useFetchListSellersQuery();

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

  let displayContent;

  if (listSellers.isFetching) {
    displayContent = (
      <>
        <div className="container">
          <Skeleton times={6} style={{ height: "7rem", width: "100%" }} />
        </div>
      </>
    );
  } else if (listSellers.isError) {
    displayContent = <div>Something went wrong</div>;
  } else {
    displayContent = (
      <div className="management-seller">
        <div className="data-table">
          <DataGrid
            rows={listSellers.data}
            columns={userColumns.concat(actionColumns)}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>

        {!!selectRowId && (
          <ModalSellerDetail
            sellerId={selectRowId}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>
    );
  }

  return <>{displayContent}</>;
};

export default memo(ManagementSeller);
