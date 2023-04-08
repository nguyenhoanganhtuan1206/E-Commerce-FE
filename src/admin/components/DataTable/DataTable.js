import { memo } from "react";
import "./DataTable.scss";

import { userColumns, userRows } from "../../../data/dummmy_data_admin";
import { DataGrid } from "@mui/x-data-grid";
import { ButtonFields } from "../../../shared/FormElement/";

const DataTable = () => {
  const actionColum = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: () => {
        return (
          <>
            <ButtonFields primary className="mr-3">
              View
            </ButtonFields>
            <ButtonFields borderOnly>Delete</ButtonFields>
          </>
        );
      },
    },
  ];

  return (
    <div className="data-table">
      <DataGrid
        rows={userRows}
        columns={userColumns.concat(actionColum)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default memo(DataTable);
