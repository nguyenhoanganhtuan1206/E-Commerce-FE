import { ButtonFields } from "../../../../shared/FormElement";

export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "sellerName",
    headerName: "Seller Name",
    width: 150,
  },
  {
    field: "emailSeller",
    headerName: "Email",
    width: 230,
  },
  {
    field: "address",
    headerName: "Address",
    width: 150,
  },
  {
    field: "location",
    headerName: "Location Detail",
    width: 300,
    renderCell: (params) => {
      return (
        <>
          <span>
            {params.row.city}, {params.row.district}, {params.row.commune}
          </span>
        </>
      );
    },
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div
          className={`cell__status ${params.row.sellerApproval.toLowerCase()}`}
        >
          {params.row.sellerApproval}
        </div>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: () => {
      return (
        <>
          <ButtonFields primary className="management-seller__btn">
            View
          </ButtonFields>
          <ButtonFields borderOnly className="management-seller__btn">
            Delete
          </ButtonFields>
        </>
      );
    },
  },
];
